import "./app.css"
import {Home} from "./pages/Home.tsx";
import MyTopics from "./pages/MyTopics.tsx";
import {ResponsiveAppBar} from "./pages/layout/ResponsiveAppBar"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Protected from "./components/Protected.tsx";
import EditTopic from "./pages/EditTopic.tsx";
import TopicDetails from "./pages/TopicDetails.tsx";
import PlayFilteredTopic from "./pages/PlayFilteredTopic.tsx";
import PlayTopic from "./pages/PlayTopic.tsx";

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
          }
        ]
      }
    ]
  }

])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
