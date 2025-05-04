import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

let toastCounter = 0;
const toasts: Toast[] = [];

// Singleton pattern for toast management
const toastManager = {
  addToast: (message: string, type: Toast['type'] = 'info', duration: number = 3000) => {
    const id = `toast-${toastCounter++}`;
    const toast = { id, message, type, duration };
    toasts.push(toast);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('toast-added', { detail: toast }));
    
    // Auto remove after duration
    setTimeout(() => {
      toastManager.removeToast(id);
    }, duration);
    
    return id;
  },
  
  removeToast: (id: string) => {
    const index = toasts.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
      window.dispatchEvent(new CustomEvent('toast-removed', { detail: { id } }));
    }
  }
};

// Export toast functions for use throughout the app
export const toast = {
  success: (message: string, duration?: number) => 
    toastManager.addToast(message, 'success', duration),
  error: (message: string, duration?: number) => 
    toastManager.addToast(message, 'error', duration),
  info: (message: string, duration?: number) => 
    toastManager.addToast(message, 'info', duration)
};

export const Toaster = () => {
  const [visibleToasts, setVisibleToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    const handleToastAdded = (e: Event) => {
      const toast = (e as CustomEvent<Toast>).detail;
      setVisibleToasts(prev => [...prev, toast]);
    };
    
    const handleToastRemoved = (e: Event) => {
      const { id } = (e as CustomEvent<{id: string}>).detail;
      setVisibleToasts(prev => prev.filter(t => t.id !== id));
    };
    
    window.addEventListener('toast-added', handleToastAdded);
    window.addEventListener('toast-removed', handleToastRemoved);
    
    return () => {
      window.removeEventListener('toast-added', handleToastAdded);
      window.removeEventListener('toast-removed', handleToastRemoved);
    };
  }, []);
  
  const getBackgroundColor = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-success';
      case 'error': return 'bg-error';
      default: return 'bg-primary';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {visibleToasts.map(toast => (
        <div
          key={toast.id}
          className={`${getBackgroundColor(toast.type)} text-white p-4 rounded-md shadow-lg flex items-center justify-between min-w-[280px] max-w-md animate-fade-in`}
        >
          <p>{toast.message}</p>
          <button 
            onClick={() => toastManager.removeToast(toast.id)}
            className="ml-2 text-white/80 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};