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
import Results from "@/components/flow/results/Results.vue";
import TriageRecommendation from "@/components/flow/results/TriageRecommendation.vue";
import TriageAlarmingSymptoms from "@/components/flow/results/TriageAlarmingSymptoms.vue";
import { computed, onMounted } from "vue";
import PlainMessage from "@/components/flow/PlainMessage.vue";
import MessageLoading from "@/components/MessageLoading.vue";
import ConditionSpecificSuggestions from "../components/flow/initial/ConditionSpecificSuggestions.vue";
import CommonSymptoms from "../components/flow/initial/CommonSymptoms.vue";
import CommonSymptomsResponse from "../components/flow/initial/CommonSymptomsResponse.vue";

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
    Results,
    TriageRecommendation,
    TriageAlarmingSymptoms,
    PlainMessage,
    MessageLoading,
    ConditionSpecificSuggestions,
    CommonSymptoms,
    CommonSymptomsResponse,
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
