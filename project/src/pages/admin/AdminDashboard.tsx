import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, FolderTree, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" />, path: '/admin' },
    { title: 'Products', icon: <Package className="w-6 h-6" />, path: '/admin/products' },
    { title: 'Orders', icon: <ShoppingCart className="w-6 h-6" />, path: '/admin/orders' },
    { title: 'Categories', icon: <FolderTree className="w-6 h-6" />, path: '/admin/categories' },
    { title: 'Customers', icon: <Users className="w-6 h-6" />, path: '/admin/customers' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                {item.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="text-gray-500 mt-1">Manage {item.title.toLowerCase()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;