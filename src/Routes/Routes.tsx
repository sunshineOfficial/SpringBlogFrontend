import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import PostPage from "../Pages/PostPage/PostPage";
import CreatePostPage from "../Pages/CreatePostPage/CreatePostPage";
import UpdatePostPage from "../Pages/UpdatePostPage/UpdatePostPage";
import ModeratorPage from "../Pages/ModeratorPage/ModeratorPage";
import ChangeAvatarPage from "../Pages/ChangeAvatarPage/ChangeAvatarPage";
import ChangePostImagePage from "../Pages/ChangePostImagePage/ChangePostImagePage";
import AdminPage from "../Pages/AdminPage/AdminPage";

/**
 * Роутер для перемещения по страницам.
 */
export const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "", element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "profile", element: <ProfilePage /> },
    { path: "profile/avatar", element: <ChangeAvatarPage /> },
    { path: "post/:id", element: <PostPage /> },
    { path: "post/:id/image", element: <ChangePostImagePage /> },
    { path: "post/create", element: <CreatePostPage /> },
    { path: "post/update/:id", element: <UpdatePostPage /> },
    { path: "moderator", element: <ModeratorPage /> },
    { path: "admin", element: <AdminPage /> }
  ]
}]);