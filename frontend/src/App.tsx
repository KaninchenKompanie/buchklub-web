import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import "../app/globals.css";
import Layout from "@/components/layout/Layout.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Layout>
  );
}

export default App;
