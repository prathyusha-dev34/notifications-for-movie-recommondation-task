import { BrowserRouter, Routes, Route } from "react-router-dom";
import CollectionsPage from "./pages/CollectionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<CollectionsPage />} />

        {/* 🔥 ADD THIS */}
        <Route path="/collections" element={<CollectionsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;