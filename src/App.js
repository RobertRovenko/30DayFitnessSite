import { Routes, Route, Link } from "react-router-dom";
import DayFitness from "./DayFitness";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DayFitness />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
