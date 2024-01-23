<template>
  <message-box>
    {{ mention.choice_id === "abssent" ? "You don't have: " : ""
    }}{{ mention.common_name.toLowerCase() }} - Is it correct?

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
import useApiStore from "@/stores/api.store";
import { useFlowStore } from "@/stores/flow.store";

const flow = useFlowStore(),
  btnDisabled = ref(false),
  props = definProps({
    mention: {
      type: Object,
      required: true,
    },
  }),
  store = useApiStore();

async function next(value) {
  btnDisabled.value = true;

  store.apiState.evidence.push({
    id: props.mention.id,
    choice_id: value ? props.mention.choice_id : "absent",
    source: "initial",
  });

  await flow.push(
    "PlainMessage",
    {
      type: "grey",
      message: `${value ? "Yes" : "No"}`,
    },
    true
  );
  await flow.iterateNotObviousAnswer();
}
</script>
