import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from './app/store.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { postLoading } from './pages/Home.jsx';
import AllPost, { showAllPosts } from './pages/AllPost.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost, { currentPost } from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
import { Protected as AuthLayout, Login, SignUp, ForgotPwd, EmailLogin } from "./components/index.js";
import { ImgLoading } from './pages/Post.jsx';


const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [{
    path: "/",
    element: <Home />,
    loader: postLoading,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    )
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <SignUp />
      </AuthLayout>
    )
  },
  {
    path: "/forgot-password",
    element: <ForgotPwd />
  },
  {
    path: "/email-login",
    element: <EmailLogin />
  },
  {
    path: "/all-posts",
    element: (
      <AuthLayout authentication={true}>
        <AllPost />
      </AuthLayout>
    ),
    loader: showAllPosts,
  },
  {
    path: "/add-post",
    element: (
      <AuthLayout authentication={true}>
        <AddPost />
      </AuthLayout>)
  },
  {
    path: "/edit-post/:postID",
    element: (
      <AuthLayout authentication={true}>
        <EditPost />
      </AuthLayout>
    ),
    loader: currentPost,
  },

  {
    path: "/post/:postID",
    element: (
      <AuthLayout authentication={true}>

        <Post />
      </AuthLayout>),
    loader: ImgLoading
  }



  ]
}]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
