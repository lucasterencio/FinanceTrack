import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Private } from "./routes/Private";
import { FinanceProvider } from "./contexts/FinanceContext";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <FinanceProvider> <Private> <Home /> </Private> </FinanceProvider>
      },

      {
        path: "/profile",
        element: <Private> <Profile /> </Private>
      }
    ]
  },

  {
    element: <Login />,
    path: "/"
  },

  {
    element: <Register />,
    path: "/register"
  },
])