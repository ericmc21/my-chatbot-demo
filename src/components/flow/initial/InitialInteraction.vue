<template>
  <message-box>
    I'm powered all up by Infermedica API! Read more about it.
    <a href="https://developer.infermedica.com">All up in here</a>
    <div style="margin-top: 16px">
      <message-button :disabled="btnDisabled" @click="next">
        Let's roll!
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
  await flow.push(
    "PlainMessage",
    { type: "grey", message: "Let's roll!" },
    true
  );
  await flow.push("GenderQuestion");
};
</script>
