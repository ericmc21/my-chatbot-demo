<template>
  <message-box :type="type">
    <div class="recommendation">
      <h2 class="recommendation__heading">{{ heading }}</h2>
      <p class="recommendation__paragraph">{{ paragraph }}</p>
    </div>
    <div style="margin-top: 16px" v-bind:style="buttonVisibility">
      <message-button
        :disabled="btnDisabled"
        @click="() => TogglePopup('buttonTrigger')"
      >
        {{ buttonText }}
      </message-button>
    </div>
  </message-box>
  <Transition name="fade">
    <Popup
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
    </Popup>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import Popup from "./Popup.vue";

const popupTriggers = ref({
  buttonTrigger: false,
  timedTrigger: false,
});

const TogglePopup = (trigger) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger];
};
setTimeout(() => {
  popupTriggers.value.timedTrigger = true;
}, 3000);

const props = defineProps({
    triageLevel: {
      type: String,
      required: true,
    },
  }),
  paragraph = ref(""),
  heading = ref(""),
  type = ref(""),
  buttonVisibility = ref(""),
  buttonText = ref("");

console.log(props.triageLevel);
switch (props.triageLevel) {
  case "emergency_ambulance":
    paragraph.value =
      "Your symptoms are very serious, and you may require emergency care.";
    heading.value = "Call an ambulance";
    type.value = "danger";
    buttonVisibility.value = "display:none";
    break;
  case "emergency":
    paragraph.value =
      "Your symptoms are worrisome and you may require urgent care. If you can’t get to an emergency department, please call an ambulance.";
    heading.value = "Go to the nearest emergency department";
    type.value = "danger-light";
    buttonVisibility.value = "display:none";
    break;
  case "consultation_24":
    paragraph.value =
      "Your symptoms may require prompt medical evaluation. If your symptoms suddenly get worse, go to the nearest emergency department.";
    heading.value = "See a doctor within 24 hours";
    type.value = "warning";
    buttonText.value = "Schedule appointment";
    break;
  case "consultation":
    paragraph.value =
      "Your symptoms may require medical evaluation. Schedule an appointment with your doctor. If your symptoms get worse, see a doctor immediately.";
    heading.value = "Consult a doctor";
    type.value = "success-light";
    buttonText.value = "Schedule appointment";
    break;
  case "self_care":
    paragraph.value =
      "Usually, your symptoms don’t require medical care and they resolve on their own. You can try to manage your condition with home methods. If your symptoms get worse or new symptoms appear, consult a doctor.";
    heading.value = "Self-treatment may be enough";
    type.value = "success";
    buttonText.value = "View Patient Education";
    break;
}
</script>

<style scoped lang="scss">
.recommendation {
  &__heading {
    font-weight: 600;
    font-size: $font-line-small;
    line-height: $font-line-medium;
    margin-bottom: 8px;
  }

  &__paragraph {
    font-weight: normal;
    font-size: $font-extra-small;
    line-height: $font-line-default;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
