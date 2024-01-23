<template>
  <message-box>
    Got it. Is there anything else bothering you?
    <div class="btn-container">
      <message-button :disabled="btnDisabled" @click="next(true)">
        Yes
      </message-button>
      <message-button :disabled="btnDisabled" @click="next(false)">
        No
      </message-button>
    </div>
  </message-box>
</template>
<script setup>
import { ref } from "vue";
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore(),
  btnDisabled = ref(false);

async function next(more) {
  btnDisabled.value = true;

  console.log(more);
  if (more) {
    await flow.push("Question", {}, true);
    flow.disable_input = false;
  } else {
    flow.show_input = false;
    flow.insertDiagnosisQuestionToflow();
  }
}
</script>
<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
