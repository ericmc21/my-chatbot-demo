<template>
  <message-box>
    I'm sorry you're not feeling well. Now that we know your reason for visit,
    we are going to gather some additional information about you.
    <div style="margin-top: 16px">
      <message-button :disabled="btnDisabled" @click="next">
        finish my interview!
      </message-button>
    </div>
  </message-box>
</template>

<script setup>
import { ref } from "vue";
import { useFlowStore } from "@/stores/flow.store";
const btnDisabled = ref(false),
  flow = useFlowStore();

const next = async () => {
  btnDisabled.value = true;
  await flow.push("PlainMessage", { type: "grey", message: "Let's go!" }, true);

  //
  await flow.push("GenderQuestion", {});
};
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
