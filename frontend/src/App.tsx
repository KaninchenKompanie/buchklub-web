import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shelf from "./pages/Shelf";
import Statistics from "./pages/Statistics";
import "../app/globals.css";
import "./lib/axios";
import Layout from "@/components/layout/Layout.tsx";
import LoginView from "./modules/auth/components/LoginView";
import PrivateElement from "./modules/common/components/PrivateElement";
import AuthProvider from "./modules/auth/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <PrivateElement>
                    <Home />
                  </PrivateElement>
                </Layout>
              }
            />
            <Route
              path="/shelf"
              element={
                <Layout>
                  <PrivateElement>
                    <Shelf />
                  </PrivateElement>
                </Layout>
              }
            />
            <Route
              path="/statistics"
              element={
                <Layout>
                  <PrivateElement>
                    <Statistics />
                  </PrivateElement>
                </Layout>
              }
            />
          </>
        </Routes>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
