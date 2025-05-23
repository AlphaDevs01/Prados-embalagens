import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import ContatoPage from './pages/ContatoPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProdutosPage from './pages/admin/AdminProdutosPage';
import AdminCategoriasPage from './pages/admin/AdminCategoriasPage';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './components/layout/PublicLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProdutoForm from './pages/admin/AdminProdutoForm';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/contato" element={<ContatoPage />} />
      </Route>

      {/* Rota de Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Rotas Protegidas de Admin */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="produtos" element={<AdminProdutosPage />} />
        <Route path="produtos/novo" element={<AdminProdutoForm />} />
        <Route path="produtos/:id" element={<AdminProdutoForm />} />
        <Route path="categorias" element={<AdminCategoriasPage />} />
      </Route>
    </Routes>
  );
}

export default App;