import "./app.css"
import {HomePage} from "./pages/HomePage.tsx";
import {ResponsiveAppBar} from "./pages/layout/ResponsiveAppBar.tsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>
  },
  {
    path: "/topics",
    element: <ResponsiveAppBar></ResponsiveAppBar>
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
