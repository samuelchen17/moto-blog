import { createBrowserRouter } from "react-router-dom";
// import IRoute from "../interfaces/route";
import BlogPage from "../pages/BlogPage";
import EditPage from "../pages/EditPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthWrapper from "../components/AuthWrapper";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
      },
    ],
  },
]);

export default router;
