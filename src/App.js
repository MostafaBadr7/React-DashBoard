import "./App.css";
import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import Layout from "../src/Components/Layout/Layout.jsx";
import DataContextProvider from "./Contexts/DataContext";

function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "Home", element: <DashBoard /> },
        { path: "", element: <Navigate to="" /> },
      ],
    },
  ]);

  return (
    <div className="App ">
      <DataContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </DataContextProvider>
    </div>
  );
}

export default App;
