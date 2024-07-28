import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import "../app/globals.css";
import "./lib/axios";
import Layout from "@/components/layout/Layout.tsx";
import LoginView from "./modules/auth/components/LoginView";
import PrivateElement from "./modules/common/components/PrivateElement";
import AuthProvider from "./modules/auth/components/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { PagePaths } from "./pages/PagePaths";
import UserPage from "./pages/UserPage";
import Shelf from "./pages/Shelf";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div>
        <AuthProvider>
          <Routes>
            <Route path={PagePaths.login} element={<LoginView />} />
            <>
              <Route
                path={PagePaths.home}
                element={
                  <Layout>
                    <PrivateElement>
                      <Home />
                    </PrivateElement>
                  </Layout>
                }
              />
              <Route
                path={PagePaths.shelf}
                element={
                  <Layout>
                    <PrivateElement>
                      <Shelf />
                    </PrivateElement>
                  </Layout>
                }
              />
              <Route
                path={PagePaths.statistics}
                element={
                  <Layout>
                    <PrivateElement>
                      <Statistics />
                    </PrivateElement>
                  </Layout>
                }
              />
              <Route
                path={PagePaths.me}
                element={
                  <Layout>
                    <PrivateElement>
                      <UserPage />
                    </PrivateElement>
                  </Layout>
                }
              />
            </>
          </Routes>
        </AuthProvider>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
