import { createBrowserRouter } from "react-router";

import Home from "../pages/home/Home";
import User from "../pages/user/User";
import MainLayout from "../layouts/MainLayout";
import UserCreate from "../pages/user/UserCreate";
import UserEdit from "../pages/user/UserEdit";

export const APP_PATHS = {
  HOME: "/",
  USER: "/user",
  USER_CREATE: "/user/create",
  USER_EDIT: "/user/edit/:userId",
  // Add more paths here as needed
};

export const APP_ROUTES = createBrowserRouter([
  {
    path: APP_PATHS.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: APP_PATHS.USER,
        element: <User />,
        // children: [
        //   // {
        //   //   index: true,
        //   //   element: <User />,
        //   // },
        //   {
        //     path: "create",
        //     element: <UserCreate />,
        //   },
        //   {
        //     path: "/user/edit",
        //     element: <UserEdit />,
        //   },
        // ],
      },
      {
        path: APP_PATHS.USER_CREATE,
        element: <UserCreate />,
      },
      {
        path: APP_PATHS.USER_EDIT,
        element: <UserEdit />,
      },
    ],
  },
]);
