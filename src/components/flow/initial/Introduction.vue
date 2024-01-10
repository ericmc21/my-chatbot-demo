<template>
  <message-box>
    <p>
      Hi! I am a symptom checker bot. Enter your symptoms and get a
      recommendation for care!
    </p>
    <p>
      I'n intended to show you what's possible using Infermedica's clinical
      content!
    </p>
  </message-box>
</template>
<script setup>
import { computed, onMounted, watch } from "vue";
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore();

onMounted(async () => {
  await flow.push("InitialInteraction");

  watch(flow.flow, () => {
    setTimeout(() => {
      document.querySelector("#scroll").scrollIntoView();
    }, 200);
  });
});
</script>
