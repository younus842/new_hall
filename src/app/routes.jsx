import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import FunctionHallDetails from "./pages/FunctionHallDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/hall/:id",
    Component: FunctionHallDetails,
  },
]);
