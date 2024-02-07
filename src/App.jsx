import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProductsPage from "./pages/productsPage/ProductsPage";
import Chat from "./pages/chat/Chat";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/products/:id",
      element: <ProductsPage />
    },
    {
      path: "/chats",
      element: <Chat />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
