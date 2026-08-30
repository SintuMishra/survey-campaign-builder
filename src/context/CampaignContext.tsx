import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { defaultCampaign } from "../data/defaultCampaign";
import type { Campaign, Question } from "../types/campaign";

type Action =
  | { type: "SET_CAMPAIGN"; payload: Campaign }
  | { type: "UPDATE"; updater: (draft: Campaign) => Campaign }
  | { type: "RESET" };

interface CampaignContextValue {
  campaign: Campaign;
  dispatch: Dispatch<Action>;
  update: (updater: (draft: Campaign) => Campaign) => void;
  setQuestionCount: (count: number) => void;
}

const CampaignContext = createContext<CampaignContextValue | null>(null);

const clone = (state: Campaign): Campaign => structuredClone(state);

const makeQuestion = (index: number): Question => ({
  id: crypto.randomUUID(),
  title: `Question ${index + 1}`,
  subtitle: "Add your question description here.",
  options: [
    { id: crypto.randomUUID(), label: "Option 1" },
    { id: crypto.randomUUID(), label: "Option 2" },
  ],
  additionalComments: false,
  conditions: [],
  submitButtonText: "Next",
});

function reducer(state: Campaign, action: Action): Campaign {
  if (action.type === "SET_CAMPAIGN") return action.payload;
  if (action.type === "RESET") return structuredClone(defaultCampaign);
  if (action.type === "UPDATE") return action.updater(clone(state));
  return state;
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaign, dispatch] = useReducer(reducer, structuredClone(defaultCampaign));

  const update = (updater: (draft: Campaign) => Campaign) => {
    dispatch({ type: "UPDATE", updater });
  };

  const setQuestionCount = (count: number) => {
    if (!Number.isFinite(count)) return;
    const safe = Math.max(1, Math.min(20, Math.trunc(count)));
    update((draft) => {
      const current = draft.content.questions.length;
      if (safe > current) {
        for (let i = current; i < safe; i++) draft.content.questions.push(makeQuestion(i));
      } else if (safe < current) {
        draft.content.questions = draft.content.questions.slice(0, safe);
      }
      return draft;
    });
  };

  const value = useMemo(() => ({ campaign, dispatch, update, setQuestionCount }), [campaign]);

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error("useCampaign must be used inside CampaignProvider");
  return ctx;
}
