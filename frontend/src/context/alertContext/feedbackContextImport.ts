import {createContext, useContext} from "react";
import {Variant} from "./FeedbackContext.tsx";

interface FeedbackContextType {
  feedback(message: string, variant: Variant): void;
}
export const FeedbackContext = createContext<FeedbackContextType>({
  feedback: () => {
  },
});

export const useFeedback = ()=> useContext(FeedbackContext);
