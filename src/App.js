//* pages
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Root from "./pages/Root";
//* react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fragment } from "react";
//*actions
import { action as signUpAction } from "./pages/SignUp";
//* react toasts
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "offers",
          element: <Offers />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
          action: signUpAction,
        },
      ],
    },
  ]);

  return (
    <Fragment>
      <RouterProvider router={router} />;
      <ToastContainer />
    </Fragment>
  );
}

export default App;
