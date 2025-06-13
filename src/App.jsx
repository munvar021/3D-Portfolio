import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Hero from "./components/Hero/hero";
import About from "./components/About/about";
import Projects from "./components/Projects/projects";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer/footer";
import { MouseProvider } from "./context/MouseContext";
import SmoothScroll from "./components/SmoothScroll/smoothScroll";
import "./App.css";

const App = () => {
  return (
    <MouseProvider>
      <Router>
        <div className="app">
          <SmoothScroll>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="*"
                element={
                  <>
                    <Hero />
                  </>
                }
              />
            </Routes>
            <Footer />
          </SmoothScroll>
        </div>
      </Router>
    </MouseProvider>
  );
};

export default App;
