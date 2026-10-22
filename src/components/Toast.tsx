import React from 'react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#181c24]/95 border-[#4cd7f6]/40 text-[#dfe2ee]'
              : toast.type === 'error'
              ? 'bg-[#181c24]/95 border-[#ffb4ab]/40 text-[#dfe2ee]'
              : 'bg-[#181c24]/95 border-[#8083ff]/40 text-[#dfe2ee]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl shrink-0 ${
              toast.type === 'success'
                ? 'text-[#4cd7f6]'
                : toast.type === 'error'
                ? 'text-[#ffb4ab]'
                : 'text-[#8083ff]'
            }`}
          >
            {toast.type === 'success'
              ? 'check_circle'
              : toast.type === 'error'
              ? 'error'
              : 'info'}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold font-headline-sm">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-[#c7c4d7] mt-0.5 line-clamp-2">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#908fa0] hover:text-[#dfe2ee] transition-colors p-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
