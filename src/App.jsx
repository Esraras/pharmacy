import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { SharedLayout } from './components/SharedLayout/SharedLayout';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { MedicineStorePage } from './pages/MedicineStorePage';
import { MedicinePage } from './pages/MedicinePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<PublicRoute component={<RegisterPage />} redirectTo="/medicine" />} />
        <Route path="login" element={<PublicRoute component={<LoginPage />} redirectTo="/medicine" />} />
        <Route path="medicine-store" element={<MedicineStorePage />} />
        <Route path="medicine" element={<PrivateRoute component={<MedicinePage />} redirectTo="/login" />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="cart" element={<PrivateRoute component={<CartPage />} redirectTo="/login" />} />
      </Route>
    </Routes>
  );
};