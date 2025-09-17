import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import Contact from "../../features/contact/Contact";
import About from "../../features/about/About";
import ProductDetails from "../../features/merchandise/ProductDetails";
import Basket from "../../features/basket/Basket";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RegistrationSuccess from "../../features/account/RegistrationSuccess";
import UserAuth from "./UserAuth";
import Checkout from "../../features/checkout/Checkout";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/orders/OrdersPage";
import OrderDetails from "../../features/orders/OrderDetails";
import Inventory from "../../features/admin/Inventory";
import Merchandise from "../../features/merchandise/Merchandise";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element: <UserAuth/>, children: [
        {path: "checkout", element: <Checkout/>},
        {path: "checkout/success", element: <CheckoutSuccess/>},
        {path: "orders", element: <OrdersPage/>},
        {path: "orders/:id", element: <OrderDetails/>},
        {path: "inventory", element: <Inventory/>}
      ]},
      { path: "", element: <Home /> },
      { path: "merchandise", element: <Merchandise /> },
      { path: "merchandise/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <Navigate to="not-found" replace /> },
      { path: "basket", element: <Basket /> },
      { path: "registrationsuccess", element: <RegistrationSuccess /> },
    ],
  },
]);
