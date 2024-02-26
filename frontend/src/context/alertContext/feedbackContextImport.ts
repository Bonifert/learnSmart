import {createContext, useContext} from "react";
import {Variant} from "./FeedbackContext.tsx";

interface FeedbackContextType {
  feedbackAlert(message: string, variant: Variant): void;
}
export const FeedbackContext = createContext<FeedbackContextType>({
  feedbackAlert: () => {
  },
});

export const useFeedback = ()=> useContext(FeedbackContext);
