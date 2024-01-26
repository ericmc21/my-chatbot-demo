<template>
  <message-box>
    I'm powered by Infermedica API! Read more about it.
    <a href="https://developer.infermedica.com">here</a>
    <div style="margin-top: 16px">
      <message-button :disabled="btnDisabled" @click="next">
        Let's go!
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
  await flow.push("ConditionSpecificSuggestions", {
    conditions: [
      { id: "c_111", name: "Acne", common_name: "Acne" },
      {
        id: "c_184",
        name: "Acute cystitis",
        common_name: "UTI",
      },

      { id: "c_172", name: "Conjunctivitis", common_name: "Pink eye" },
      { id: "c_1105", name: "COVID-19", common_name: "COVID-19" },
      { id: "c_33", name: "Influenza", common_name: "Flu" },
    ],
  });
};
</script>
