<template>
  <message-box
    >Sorry, I didn't get that. Please enter your symptoms, for example, "My head
    hurts and I have a stuffy nose."
  </message-box>
</template>
<script setup>
import { watch } from "vue";
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore();

flow.show_input = true;
flow.disable_input = false;
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
