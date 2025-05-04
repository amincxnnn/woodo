import { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Submit email to newsletter service (mock)
    setIsSubmitted(true);
    setError('');
    // In a real app, you would call an API here
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-medium text-white mb-2">Join Our Newsletter</h3>
      <p className="text-gray-200 mb-6">
        Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
      </p>
      
      {isSubmitted ? (
        <div className="bg-white bg-opacity-20 p-4 rounded-md">
          <p className="text-white">
            Thank you for subscribing! We've sent a confirmation to your email.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full h-12 px-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-sm text-red-300 mt-1 text-left">{error}</p>}
          </div>
          <button 
            type="submit"
            className="h-12 px-6 bg-white text-accent font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            Subscribe <Send size={16} className="ml-2" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;