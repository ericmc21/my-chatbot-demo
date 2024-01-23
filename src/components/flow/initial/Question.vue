<template>
  <message-box
    >I'm sorry you're not feeling well. Please type in the symptoms that are
    bothering you the most. It will help me if you add more than 1 symptom, for
    example, "I have a sore throat and a cough."</message-box
  >
</template>

<script setup>
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore();

flow.show_input = true;
</script>

<style scoped>
.btn-container {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
</style>
