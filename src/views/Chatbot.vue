<template>
  <introduction></introduction>
</template>

<script>
import useApiStore from "@/stores/api.store.js";
import { useFlowStore } from "@/stores/flow.store.js";
import Introduction from "@/components/flow/initial/Introduction.vue";
import { computed, onMounted } from "vue";

export default {
  components: {
    Introduction,
  },
  setup() {
    const flowStore = useFlowStore(),
      store = useApiStore();

    async function handleMessage(e) {
      flowStore.input_value = e;

      await flowStore.push(
        "UserResponse",
        {
          message: flowStore.input_value,
        },
        true
      );
    }

    const flow = computed(() => flowStore.flow),
      messageInputDisabled = computed(() => flowStore.disable_input),
      loading = computed(() => store.isLoading);

    onMounted(async () => {
      store.generateInterviewId();
      await flowStore.push("Introduction", {}, true);
    });

    return {
      flowStore,
      flow,
      handleMessage,
      messageInputDisabled,
      loading,
    };
  },
};
</script>

<style lang="scss">
.divider {
  margin-top: 14px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, minmax(min-content, min-content));
}
.divider-grid {
  margin-top: 16px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
