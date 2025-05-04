import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
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
            <div className="md:w-1/2 p-12">
              <RegisterForm />
            </div>
            <div className="md:w-1/2 bg-wood-texture bg-cover bg-center p-12 text-white">
              <div className="bg-accent bg-opacity-80 p-6 rounded-lg">
                <h1 className="text-2xl font-serif mb-4">Join Our Community</h1>
                <p className="mb-4">
                  Create an account to enjoy:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="bg-white bg-opacity-20 rounded-full p-1 mr-2">✓</span>
                    Easy order tracking
                  </li>
                  <li className="flex items-center">
                    <span className="bg-white bg-opacity-20 rounded-full p-1 mr-2">✓</span>
                    Faster checkout
                  </li>
                  <li className="flex items-center">
                    <span className="bg-white bg-opacity-20 rounded-full p-1 mr-2">✓</span>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="bg-white bg-opacity-20 rounded-full p-1 mr-2">✓</span>
                    Access to exclusive offers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;