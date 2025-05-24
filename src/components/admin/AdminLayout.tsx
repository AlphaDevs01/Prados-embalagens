import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Package2, LayoutDashboard, Package, FolderTree, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: '/admin/produtos',
      label: 'Produtos',
      icon: <Package size={20} />,
    },
    {
      path: '/admin/categorias',
      label: 'Categorias',
      icon: <FolderTree size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Botão de menu mobile */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menu"
      >
        <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar responsivo */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-sm transform
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-64
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2">
              <Package2 size={24} className="text-primary-500" />
              <span className="font-semibold text-secondary-800">Admin Panel</span>
            </Link>
            {/* Botão fechar no mobile */}
            <button
              className="md:hidden ml-2"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            >
              <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setSidebarOpen(false)} // Fecha menu ao navegar
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 transition-colors w-full px-4 py-2"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay para fechar o menu no mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;