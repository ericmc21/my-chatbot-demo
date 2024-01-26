<template>
  <MessageBox>
    <ConditionSpecificCheckbox
      v-model="selected"
      :conditions="conditions"
      @done="handleDone"
    />
  </MessageBox>
</template>
<script setup>
import { ref } from "vue";
import useApiStore from "@/stores/api.store";
import { useFlowStore } from "@/stores/flow.store";
import ConditionSpecificCheckbox from "../../ConditionSpecificCheckbox.vue";

const store = useApiStore(),
  flow = useFlowStore(),
  selected = ref([]),
  props = defineProps({
    conditions: {
      type: Array,
      default: () => [],
    },
  });

async function handleDone() {
  const evidence = store.apiState.evidence;
  if (selected.value.length) {
    store.apiState.evidence = [...evidence, ...selected.value];
  }
  await flow.push("CommonSymptoms", {
    common_symptoms: [
      { id: "s_13", name: "Abdominal Pain", common_name: "Stomach pain" },
      {
        id: "s_2100",
        name: "Fatigue",
        common_name: "Fatigue",
      },

      {
        id: "s_2064",
        name: "Foul-smelling urine",
        common_name: "Smelly urine",
      },
      {
        id: "s_215",
        name: "Frequent urination",
        common_name: "Urinating often",
      },
      {
        id: "s_39",
        name: "Painful urination",
        common_name: "Pain when urinating",
      },
    ],
  });
}
</script>
