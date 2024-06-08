// src/App.jsx
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Clases from "./pages/Clases";
import PurchaseForm from "./pages/PurchaseForm";

const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/purchase" element={<PurchaseForm />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
