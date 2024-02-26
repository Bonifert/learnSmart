import {
  ReactNode,
  useState,
} from "react";
import {Alert, Snackbar} from "@mui/material";
import {FeedbackContext} from "./feedbackContextImport.ts";

export type Variant = 'success' | 'error' | 'info' | 'warning';

interface AlertObj {
  readonly variant: Variant;
  readonly message: string;
}

interface Props {
  children: ReactNode;
}

const FeedbackProvider = ({children}: Props) => {
  const [alertMessage, setAlertMessage] = useState<AlertObj>({variant: "error", message: ""});

  function feedbackAlert(message: string, variant: Variant) {
    setAlertMessage({variant: variant, message: message});
  }

  return (
      <FeedbackContext.Provider value={{feedbackAlert}}>
        {children}
        <Snackbar open={alertMessage.message !== ""}
                  autoHideDuration={4000}
                  onClose={() => setAlertMessage({variant: "error", message: ""})}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
          <Alert severity={alertMessage.variant}>
            {alertMessage.message}
          </Alert>
        </Snackbar>
      </FeedbackContext.Provider>
  )
}

export default FeedbackProvider;