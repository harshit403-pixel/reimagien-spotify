import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../../features/auth/ui/pages/Login";
import Register from "../../features/auth/ui/pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../../features/dashboard/ui/pages/HomePage";
import PremiumPage from "../../features/dashboard/ui/pages/PremuimPage";
import DownloadPage from "../../features/dashboard/ui/pages/DownloadPage";
import NotificationPage from "../../features/dashboard/ui/pages/NotificationPage";
import LikedSongsPage from "../../features/dashboard/ui/pages/LikedSongsPage";
import SongDetailes from "../../features/dashboard/ui/pages/SongDetailes";
import SongDetailsPage from "../../features/dashboard/ui/pages/SongDetailsPage";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "premium",
          element: <PremiumPage />,
        },
        {
          path: "download",
          element: <DownloadPage />,
        },
        {
          path: "notifications",
          element: <NotificationPage />,
        },
        {
          path: "liked-songs",
          element: <LikedSongsPage />,
        },
        {
          path: "songs/:songId",
          element: <SongDetailsPage />,
        },
        {
          path: "lyrics",
          element: <SongDetailes />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
