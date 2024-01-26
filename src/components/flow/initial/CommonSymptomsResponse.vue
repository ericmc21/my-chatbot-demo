<template>
  <message-box
    >I'm sorry you're not feeling well. Now that we know your reason for visit,
    we are going to gather some additional important information."</message-box
  >
</template>

<script setup>
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore();

flow.show_input = false;
await flow.push("GenderQuestion", {});
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
