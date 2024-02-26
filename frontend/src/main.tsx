import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import UserProvider from "./context/userContext/UserProvider.tsx";
import FeedbackContext from "./context/alertContext/FeedbackContext.tsx";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
      <UserProvider>
        <FeedbackContext>
          <App/>
        </FeedbackContext>
      </UserProvider>
    </React.StrictMode>,
)
