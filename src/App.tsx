import "./App.css";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar.tsx";
import { About } from "./pages/About.tsx";
import Skills from "./pages/Skills.tsx";
import { Projects } from "./pages/Projects.js";

function App() {
  return (
    <>
      <main className="bg-[#f9fafb]">
        <Navbar></Navbar>
        <Home></Home>
        <About></About>
        <Skills></Skills>
        <Projects></Projects>
      </main>
    </>
  );
}

export default App;
