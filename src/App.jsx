import "./styles/App.css";
import "./styles/NavBar.css";
import "./styles/products.css";
import "./styles/productDetail.css";
import "./styles/globalCart.css";
import "./styles/purchases.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ProductsDetail from "./components/pages/ProductsDetail";
import Purchases from "./components/pages/Purchases";
import NavBar from "./components/NavBar";
import IsLoadingScreen from "./components/IsLoadingScreen";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedROutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <IsLoadingScreen />}
        <Container className="my-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productsdetail/:id" element={<ProductsDetail />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
            </Route>
          </Routes>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
