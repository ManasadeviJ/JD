import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

// Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/context-admin/AuthContext';
import { DataProvider } from './context/context-admin/DataContext';
// Theme
import theme from './theme';

// Layout & UI   lit-integrated\frontend\src\components\admin-components\ProtectedRoute.jsx
import Footer from './components/Footer/Footer';
import LandingPageNavbar from './components/Newsletter-components/Navbar/Navbar';
import Background from './components/Background/Background';
import Navbar from './components/Newsletter-components/Navbar/Navbar';
import MainLayout from './components/Newsletter-components/MainLayout/MainLayout';
import ProtectedRoute from './components/admin-components/ProtectedRoute';
import AdminLayout from './components/admin-components/AdminLayout';

// E-commerce & General Pages
import LandingPage from './components/LandingPage';
import Shop from './pages/Shop';
import ProductDetails from './components/Shop/ProductDetails';
import Cart from './components/Shop/Cart';
import GameModes from './pages/GameModes';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import SignUpPage from './pages/admin/Auth/SignUpPage';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import ContentManager from './pages/admin/ContentManager/ContentManager';
import ArticleEditor from './pages/admin/ArticleEditor/ArticleEditor';
import MailAdderPage from './pages/admin/MailAdderPage/MailAdderPage';
import MailItemEditor from './pages/admin/MailItemEditor/MailItemEditor';
import AdminArticlePage from './pages/admin/ArticlePage'; // NEW: admin article

// Newsletter Pages
import NewsletterPage from './pages/Newsletter/NewsletterPage/NewsletterPage';
import NewsletterArticlePage from './pages/Newsletter/ArticlePage/ArticlePage'; // NEW: newsletter article

// App Content Layout Handler
const AppContent = () => {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith('/admin');
  const isNewsletterPath = location.pathname.startsWith('/newsletter');
  const isNewsletterArticle = location.pathname.startsWith('/newsletter/article');
  const isArticleAdmin = location.pathname.startsWith('/admin/article');

  const showMainNavbar = !isAdminPath && !isNewsletterPath && !isNewsletterArticle;
  const showNewsletterNavbar = isNewsletterPath || isNewsletterArticle;
  const showFooter = !isAdminPath;

  return (
    <>
      <Background />
      {showMainNavbar && <LandingPageNavbar />}
      {showNewsletterNavbar && <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Landing / E-commerce */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/game-modes" element={<GameModes />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Newsletter */}
          <Route element={<MainLayout />}>
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Route>
          <Route path="/newsletter/article/:slug" element={<NewsletterArticlePage />} />

          {/* Admin Auth + Public Admin Article */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<SignUpPage />} />
          <Route path="/admin/article/:slug" element={<AdminArticlePage />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/website" element={<ContentManager section="website" />} />
            <Route path="/admin/mail" element={<ContentManager section="mail" />} />
            <Route path="/admin/mail/add" element={<MailAdderPage />} />
            <Route path="/admin/mail/edit/:id" element={<MailItemEditor />} />
            <Route path="/admin/editor/:section" element={<ArticleEditor />} />
            <Route path="/admin/editor/:section/:slug" element={<ArticleEditor />} />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </>
  );
};

// App Root with Providers
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <DataProvider>
              <Router>
                <AppContent />
              </Router>
            </DataProvider>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
