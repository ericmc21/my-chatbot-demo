import { defineStore } from "pinia";
import useApiStore from "./api.store";

export const useFlowStore = defineStore("flow-store", {
  state: () => ({
    show_input: false,
    disable_input: false,
    input_value: "",
    flow: [],
    flowPushTimeout: 300,
  }),

  actions: {
    push(component, properties = {}, noTimeout = false) {
      const store = useApiStore();

      noTimeout || (store.isLoading = true);

      return new Promise((resolve) => {
        setTimeout(
          () => {
            console.log(component);
            this.flow.push({
              component: component,
              properties: properties,
            });
            store.isLoading = false;
            resolve();
          },
          noTimeout ? 0 : this.flowPushTimeout
        );
      });
    },

    async insertDiagnosisQuestionToflow() {
      const store = useApiStore();

      if (store.question.type === "group_multiple") {
        store.question.items.shift();
        if (store.question.items.length >= 1) {
          await this.push("QuestionSingle", {
            question: {
              text: store.question.items[0].name,
              items: [store.question.items[0]],
            },
          });

          return;
        }
      }

      await store.getDiagnosis();

      if (store.should_stop) return;

      if (store.question.type === "single") {
        await this.push("QuestionSingle", { question: store.question }, true);
      } else if (store.question.type === "group_single") {
        await this.push(
          "QuestionGroupSingle",
          { question: store.question },
          true
        );
      } else if (store.question.type === "group_multiple") {
        await this.push("PlainMessage", { message: store.question.text }, true);
        await this.push("QuestionSingle", {
          question: {
            text: store.question.items[0].name,
            items: [store.question.items[0]],
          },
        });
      }
    },

    async insertResultsToFlow() {
      const store = useApiStore();

      console.log("hello!");
      await this.push("TriageRecommendation", {
        triageLevel: store.triageLevel,
      });

      store.alarmingSymptoms.length &&
        (await this.push("TriageAlarmingSymptoms", {
          symptoms: store.alarmingSymptoms,
        }));

      await this.push("Results", { conditions: store.conditions });
    },

    async iterateNotObviousAnswer() {
      const store = useApiStore();

      store.mentions.shift();

      if (store.mentions.length >= 1) {
        await this.push("NotObviousAnswer", {
          mention: store.mentions[0],
        });
      } else {
        await this.push("ObviousAnswer");
      }
    },
  },
});
