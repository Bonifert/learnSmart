import "./app.css"
import {Home} from "./pages/Home.tsx";
import MyTopics from "./pages/MyTopics.tsx";
import {ResponsiveAppBar} from "./pages/layout/ResponsiveAppBar"
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Protected from "./components/Protected.tsx";
import EditTopic from "./pages/EditTopic.tsx";
import TopicDetails from "./pages/TopicDetails.tsx";
import PlayFilteredTopic from "./pages/PlayFilteredTopic.tsx";
import PlayTopic from "./pages/PlayTopic.tsx";
import GeneratingOptions from "./pages/GeneratingOptions.tsx";
import CreateTopicWithDefinition from "./pages/CreateTopicWithDefinition.tsx";
import CreateTopicWithWords from "./pages/CreateTopicWithWords.tsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/",
    element: <Protected/>,
    children:[
      {
        path: "/",
        element: <ResponsiveAppBar/>,
        children: [
          {
            path: "/",
            element: <MyTopics/>
          },
          {
            path: "/edit/:id",
            element: <EditTopic/>
          },
          {
            path: "/info/:id",
            element: <TopicDetails/>
          },
          {
            path: "/play/:id/filtered",
            element: <PlayFilteredTopic/>
          },
          {
            path: "/play/:id/all",
            element: <PlayTopic/>
          },
          {
            path: "/ai/options",
            element: <GeneratingOptions/>
          },
          {
            path: "/ai/generate/definitions",
            element: <CreateTopicWithDefinition/>
          },
          {
            path: "ai/generate/words",
            element: <CreateTopicWithWords/>
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace/>
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
