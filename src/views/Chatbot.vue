<template>
  <template v-for="(elem, index) in flow" :key="index">
    <component :is="elem.component" v-bind="elem.properties" />
  </template>
  <MessageLoading :loading="loading" />
  <MessageInput
    :shown="flowStore.$state.show_input"
    :disabled="messageInputDisabled"
    @message="handleMessage"
  />
</template>

<script>
import useApiStore from "@/stores/api.store.js";
import { useFlowStore } from "@/stores/flow.store.js";
import Introduction from "@/components/flow/initial/Introduction.vue";
import InitialInteraction from "@/components/flow/initial/InitialInteraction.vue";
import GenderQuestion from "@/components/flow/initial/GenderQuestion.vue";
import AgeQuestion from "@/components/flow/initial/AgeQuestion.vue";
import RiskfactorRegion from "@/components/flow/initial/RiskfactorRegion.vue";
import RiskfactorSuggestions from "@/components/flow/initial/RiskfactorSuggestions.vue";
import Question from "@/components/flow/initial/Question.vue";
import UserResponse from "@/components/flow/parse/UserResponse.vue";
import ObviousAnswer from "@/components/flow/parse/ObviousAnswer.vue";
import QuestionSingle from "@/components/flow/questions/QuestionSingle.vue";
import QuestionGroupSingle from "@/components/flow/questions/QuestionGroupSingle.vue";
import { computed, onMounted } from "vue";
import PlainMessage from "@/components/flow/PlainMessage.vue";
import MessageLoading from "@/components/MessageLoading.vue";

export default {
  components: {
    Introduction,
    InitialInteraction,
    GenderQuestion,
    AgeQuestion,
    RiskfactorRegion,
    RiskfactorSuggestions,
    Question,
    UserResponse,
    ObviousAnswer,
    QuestionSingle,
    QuestionGroupSingle,
    PlainMessage,
    MessageLoading,
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
