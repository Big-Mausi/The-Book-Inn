import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles/theme.css";

import { Provider } from "react-redux";
import store from "./store";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BooksScreen from "./screens/BooksScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import MyLibraryScreen from "./screens/MyLibraryScreen";
import RentalRequestsScreen from "./screens/RentalRequestsScreen";

import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* Public Routes */}
      <Route index element={<HomeScreen />} />
      <Route path="/books" element={<BooksScreen />} />
      <Route path="/books/:id" element={<BookDetailsScreen />} />

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>

        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/library" element={<MyLibraryScreen />} />

        <Route
          path="/requests"
          element={<RentalRequestsScreen />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboardScreen />}
        />

      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);