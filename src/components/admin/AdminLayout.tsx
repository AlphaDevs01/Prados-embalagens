import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Package2, LayoutDashboard, Package, FolderTree, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

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
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <Link to="/admin" className="flex items-center space-x-2">
              <Package2 size={24} className="text-primary-500" />
              <span className="font-semibold text-secondary-800">Admin Panel</span>
            </Link>
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;