import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { user, isLoading } = useAuth();
  
  // If user is already logged in, redirect to account page
  if (user && !isLoading) {
    return <Navigate to="/account" replace />;
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-wood-texture bg-cover bg-center p-12 text-white">
              <div className="bg-accent bg-opacity-80 p-6 rounded-lg">
                <h1 className="text-2xl font-serif mb-4">Welcome to WoodenCrafts</h1>
                <p className="mb-4">
                  Sign in to access your account, track orders, and manage your wishlist.
                </p>
                <p className="text-sm">
                  "The creation of a thousand forests is in one acorn." - Ralph Waldo Emerson
                </p>
              </div>
            </div>
            <div className="md:w-1/2 p-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;