<template>
  <h1>Do you have 1 or more of these common symptoms?</h1>
  <div class="checkbox__container">
    <div class="checkbox__row">
      <label
        v-for="symptom in common_symptoms"
        :key="symptom.id"
        class="checkbox__label"
      >
        <input
          class="checkbox__input-hidden"
          type="checkbox"
          name="checkbox__risk-factor"
          @input="handleCheckboxInput(symptom.id)"
        />
        <div class="checkbox__checkbox-border">
          <img
            v-if="computeEnabled(symptom.id)"
            draggable="false"
            src="@/assets/images/svg/done.svg"
            class="checkbox__checkbox-icon"
          />
        </div>
        <span class="checkbox__label-text">{{ symptom.name }}</span>
      </label>
    </div>
    <MessageButton :disabled="isDone" class="checkbox__done" @click="handleDone"
      >Done</MessageButton
    >
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  common_symptoms: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "done"]);
const selected = reactive([]);
const isDone = ref(false);

function computeEnabled(id) {
  return selected.some((csid) => csid === id);
}

function handleCheckboxInput(id) {
  if (isDone.value) return;
  const emitUpdate = () => {
    const emitPayload = props.common_symptoms.map((cs) => {
      return {
        id: cs.id,
        source: "initial",
        choice_id: computeEnabled(cs.id) ? "present" : "unknown",
      };
    });
    emit("update:modelValue", emitPayload);
  };

  const csindex = selected.findIndex((csid) => csid === id);
  csindex === -1 ? selected.push(id) : selected.splice(csindex, 1);

  emitUpdate();
}

function handleDone() {
  isDone.value = true;
  emit("done");
}
</script>
<style lang="scss" scoped>
.checkbox {
  &__container {
    margin: 3px 0;
  }
  &__checkbox-border {
    height: 27px;
    width: 27px;
    border: 2px solid $white;
    border-radius: 100%;
    display: grid;
    place-items: center;
  }
  &__checkbox-icon {
    width: 15px;
    height: auto;
    padding-top: 1px;
    user-select: none;
  }
  &__input-hidden {
    display: none;
  }
  &__label {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0px;
    }
  }
  &__label-text {
    user-select: none;
    margin-left: 15px;
    font-size: $font-default;
  }

  &__done {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
