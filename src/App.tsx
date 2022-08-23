import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Produtos } from "./pages/Produtos";
import { Cadastro } from "./pages/Cadastro";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { CartContextProvider } from "./context/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <CartContextProvider>
      <Navbar/>
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        <Footer/>
  
    </CartContextProvider>
  );
}

export default App;
