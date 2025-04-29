import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductPage from "./pages/productPage";
import { useThemeStore } from "./store/useThemeStore";
import {Toaster} from "react-hot-toast"

function App(){
  const {theme} = useThemeStore()
  return ( 
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
