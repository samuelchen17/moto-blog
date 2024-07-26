import { createBrowserRouter } from "react-router-dom";
// import IRoute from "../interfaces/route";
import BlogPage from "../pages/BlogPage";
import EditPage from "../pages/EditPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthWrapper from "../components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthWrapper element={<LoginPage />} auth={false} />,
  },
  {
    path: "/register",
    element: <AuthWrapper element={<LoginPage />} auth={false} />,
  },
  {
    path: "/edit",
    element: <AuthWrapper element={<EditPage />} auth={true} />,
  },
  {
    path: "/edit/:blogID",
    element: <AuthWrapper element={<EditPage />} auth={true} />,
  },
  {
    path: "/blogs/:blogID",
    element: <AuthWrapper element={<BlogPage />} auth={false} />,
  },
  {
    path: "/",
    element: <AuthWrapper element={<HomePage />} auth={false} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

// const routes: IRoute[] = [
//   {
//     name: "Login",
//     path: "/login",
//     element: <LoginPage />,
//     auth: false,
//   },
//   {
//     name: "Sign Up",
//     path: "/register",
//     element: <LoginPage />,
//     auth: false,
//   },
//   {
//     name: "Create",
//     path: "/edit",
//     element: <EditPage />,
//     auth: true,
//   },
//   {
//     name: "Edit",
//     path: "/edit/:blogID",
//     element: <EditPage />,
//     auth: true,
//   },
//   {
//     name: "Blog",
//     path: "/blogs/:blogID",
//     element: <BlogPage />,
//     auth: false,
//   },
//   {
//     name: "Home",
//     path: "/",
//     element: <HomePage/>,
//     auth: false,
//   },
// ];
