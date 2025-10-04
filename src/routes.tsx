import { createBrowserRouter, Outlet } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Wrapper } from "./layout/wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Wrapper>
        <Outlet />
      </Wrapper>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export { router };
