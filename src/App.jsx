import './styles/App.css'
import './styles/NavBar.css'
import './styles/products.css'
import './styles/home.css'
import './styles/productDetail.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import ProductsDetail from './components/pages/ProductsDetail'
import Purchases from './components/pages/Purchases'
import NavBar from './components/NavBar'
import IsLoadingScreen from './components/IsLoadingScreen'
import { useSelector } from 'react-redux'
import GlobalCart from './components/GlobalCart'
import { Container } from 'react-bootstrap'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <IsLoadingScreen />}
        <Container className='my-3'>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/purchases' element={<Purchases />}/>
              <Route path='/productsdetail/:id' element={<ProductsDetail />}/>
              <Route path='/globalCart' element={<GlobalCart />}/>
          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
