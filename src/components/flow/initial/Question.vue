<template>
  <message-box
    >Are there any other symptoms bothering you? Please type in any other
    symptoms."</message-box
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
