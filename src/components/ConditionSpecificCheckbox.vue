<template>
  <h1>What condition can we help with?</h1>
  <div class="checkbox__container">
    <div class="checkbox__row">
      <label
        v-for="condition in conditions"
        :key="condition.id"
        class="checkbox__label"
      >
        <input
          class="checkbox__input-hidden"
          type="checkbox"
          name="checkbox__risk-factor"
          @input="handleCheckboxInput(condition.id)"
        />
        <div class="checkbox__checkbox-border">
          <img
            v-if="computeEnabled(condition.id)"
            draggable="false"
            src="@/assets/images/svg/done.svg"
            class="checkbox__checkbox-icon"
          />
        </div>
        <span class="checkbox__label-text">{{ condition.common_name }}</span>
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
  conditions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "done"]);
const selected = reactive([]);
const isDone = ref(false);

function computeEnabled(id) {
  return selected.some((rfid) => rfid === id);
}

function handleCheckboxInput(id) {
  if (isDone.value) return;
  const emitUpdate = () => {
    const emitPayload = props.conditions.map((rf) => {
      return {
        id: rf.id,
        source: "suggest",
        choice_id: computeEnabled(rf.id) ? "present" : "unknown",
      };
    });
    emit("update:modelValue", emitPayload);
  };

  const rfindex = selected.findIndex((rfid) => rfid === id);
  rfindex === -1 ? selected.push(id) : selected.splice(rfindex, 1);

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
