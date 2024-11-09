import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Signup from "./Components/Singup/Signup";
import Signin from "./Components/Signin/Signin";
import Home from "./Components/Home/Home";
import RootLayout from "./Components/RootLayout";
import UserProfile from "./Components/UserProfile/UserProfile";
import AuthorProfile from "./Components/AuthorProfile/AuthorProfile";
import AddArticle from "./Components/AddArticle/AddArticle";
import ArticlesByAuthor from "./Components/ArticlesByAuthor/ArticlesByAuthor";
import Articles from "./Components/Articles/Articles";
import Article from "./Components/Article/Article";

function App() {
  const { currentUser } = useSelector((state) => state.userLogin);
  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          //what must in the outlet place (in Rootlayout(home))
          path: "",
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
          children: [
            {
              path: "articles",
              element: <Articles />,
            },
            {
              path: "article/:articleId",
              element: <Article />,
            },
            {
              path: "",
              element: <Navigate to="articles" />,
            },
          ],
        },
        {
          path: "/author-profile",
          element: <AuthorProfile />,
          children: [
            {
              path: "new-article",
              element: <AddArticle />,
            },
            {
              path: "articles-by-author/:author",
              element: <ArticlesByAuthor />,
            },
            {
              path: "article/:articleId",
              element: <Article />,
            },
            {
              path: "",
              element: (
                <Navigate to={`articles-by-author/${currentUser.username}`} />
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
