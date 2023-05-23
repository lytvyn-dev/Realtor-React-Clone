//* pages
import ListingDetails from "./pages/ListingDetails";
import CreateListing from "./pages/CreateListing";
import Offers from "./pages/Offers";
import EditListing from "./pages/EditListing";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import ListingDynamic from "./pages/ListingDynamic";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Root from "./pages/Root";
//* react
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
//* react Context
import { AuthContextProvider } from "./store/AuthContext";
//*actions
import { action as signUpAction } from "./pages/SignUp";
import { action as singInAction } from "./pages/SignIn";
import { action as resetPassword } from "./pages/ForgotPassword";
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
          path: "offers",
          element: <Offers />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
          action: resetPassword,
        },
        {
          path: "category/:listingType",
          element: <ListingDynamic />,
        },
        {
          path: "create-listing",
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <CreateListing />,
            },
          ],
        },
        { path: "category/:categoryName/:listingId", element: <ListingDetails /> },

        {
          path: "edit-listing/:listingId",
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <EditListing />,
            },
          ],
        },
        {
          path: "profile",
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
          ],
        },

        {
          path: "sign-in",
          element: <SignIn />,
          action: singInAction,
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
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthContextProvider>
  );
}

export default App;
