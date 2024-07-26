import { createBrowserRouter } from "react-router-dom";
import IRoute from "../interfaces/route";
import BlogPage from "../pages/BlogPage";
import EditPage from "../pages/EditPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const routes: IRoute[] = [
  {
    name: "Login",
    path: "/login",
    element: <LoginPage />,
    auth: false,
  },
  {
    name: "Sign Up",
    path: "/register",
    element: <LoginPage />,
    auth: false,
  },
  {
    name: "Create",
    path: "/edit",
    element: <EditPage />,
    auth: true,
  },
  {
    name: "Edit",
    path: "/edit/:blogID",
    element: <EditPage />,
    auth: true,
  },
  {
    name: "Blog",
    path: "/blogs/:blogID",
    element: <BlogPage />,
    auth: false,
  },
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
    auth: false,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
