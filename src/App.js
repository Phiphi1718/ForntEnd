import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import FeaturedProducts from './components/FeaturedProducts';
import Admin from './components/Admin';
import ProductManager from './components/ProductManager';
import ToppingManager from './components/ToppingManager';
import IceBlended from './components/IceBlended';
import NewsPromotion from './components/NewsPromotion';
import CoffeePage from "./pages/CoffeePage"; // Import trang cà phê
import TeaPage from './pages/TeaPage';
import Layout from './components/MainLayout'; // Import Layout
import StorePage from './pages/StorePage';
import RecruitmentForm from './pages/RecruitmentForm';
import JobApplication from './components/JobApplication';
import Dashboard from './components/Dashboard';
import ProductModal from './components/ProductModal';
import CheckoutForm from './components/CheckoutForm'; // Import CheckoutForm
import { CartProvider } from './CartContext';  // Import CartProvider
import FloatingButton from './components/FloatingButton';
import CartButton from './components/CartButton';
import MenuProduct from './components/MenuProduct'
import CakePage from './pages/CakePage';
import MilkTeaPage from './pages/MilkTeaPage';
import IceBlendedPage from './pages/IceBlendedPage';
import DonHangManagement from './components/DonHangManagement';
import SearchBar from './components/SearchBar';
import ProductDetail from './components/ProductDetail';
import ReviewForm from './components/ReviewForm';
import ChuyenNha from './pages/ChuyenNha';


function App() {
  return (
    <CartProvider> {/* Bọc toàn bộ ứng dụng với CartProvider */}
      <Router>
        <Routes>
          {/* Các route không cần Header và Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ProductManager" element={<ProductManager />} />
          <Route path="/ToppingManagement" element={<ToppingManager />} />
          <Route path="/jobApplication" element={<JobApplication />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DonHangManagement" element={<DonHangManagement />} />
          <Route path="/SearchBar" element={<SearchBar />} />

          {/* Các route cần Header và Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/featured-products" element={<FeaturedProducts />} />
            <Route path="/IceBlended" element={<IceBlended />} />
            <Route path="/NewsPromotion" element={<NewsPromotion />} />
            <Route path="/coffee" element={<CoffeePage />} /> {/* Trang Cà Phê */}
            <Route path="/TeaPage" element={<TeaPage />} />
            <Route path="/StorePage" element={<StorePage />} />
            <Route path="/RecruitmentForm" element={<RecruitmentForm />} />
            <Route path="/ProductModal" element={<ProductModal />} />
            <Route path="/CheckoutForm" element={<CheckoutForm />} />
            <Route path="/FloatingButton" element={<FloatingButton />} />
            <Route path="/CartButton" element={<CartButton />} />
            <Route path="/MenuProduct" element={<MenuProduct />} />
            <Route path="/CakePage" element={<CakePage />} />
            <Route path="/MilkTeaPage" element={<MilkTeaPage />} />
            <Route path="/IceBlendedPage" element={<IceBlendedPage />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/ChuyenNha" element={<ChuyenNha />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
