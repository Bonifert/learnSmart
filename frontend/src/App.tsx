import "./app.css"
import {Home} from "./pages/Home.tsx";
import MyTopics from "./pages/MyTopics.tsx";
import {ResponsiveAppBar} from "./pages/layout/ResponsiveAppBar"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import EditTopic from "./pages/EditTopic.tsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>
  },
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
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
