import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import PostPage from "../Pages/PostPage/PostPage";
import CreatePostPage from "../Pages/CreatePostPage/CreatePostPage";

export const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "", element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "profile", element: <ProfilePage /> },
    { path: "post/:id", element: <PostPage /> },
    { path: "post/create", element: <CreatePostPage /> }
  ]
}]);