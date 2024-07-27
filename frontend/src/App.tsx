import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import "../app/globals.css";
import "./lib/axios";
import Layout from "@/components/layout/Layout.tsx";
import LoginView from "./modules/auth/components/LoginView";
import PrivateElement from "./modules/common/components/PrivateElement";
import AuthProvider from "./modules/auth/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { PagePaths } from "./pages/PagePaths";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelf" element={<Library />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Layout>
  );
}

export default App;
