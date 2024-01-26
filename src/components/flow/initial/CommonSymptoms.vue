<template>
  <MessageBox>
    <CommonSymptomsCheckbox
      v-model="selected"
      :common_symptoms="common_symptoms"
      @done="handleDone"
    />
  </MessageBox>
</template>
<script setup>
import { ref } from "vue";
import useApiStore from "@/stores/api.store";
import { useFlowStore } from "@/stores/flow.store";
import CommonSymptomsCheckbox from "../../CommonSymptomsCheckbox.vue";

const store = useApiStore(),
  flow = useFlowStore(),
  selected = ref([]),
  props = defineProps({
    common_symptoms: {
      type: Array,
      default: () => [],
    },
  });

async function handleDone() {
  const evidence = store.apiState.evidence;
  if (selected.value.length) {
    store.apiState.evidence = [...evidence, ...selected.value];
  }
  console.log(selected);
  await flow.push("CommonSymptomsResponse", { selected });
}
</script>
