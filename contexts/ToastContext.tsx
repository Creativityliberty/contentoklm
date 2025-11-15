import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { ToastMessage, ToastContextType } from '../types';

export const ToastContext = createContext<ToastContextType & { setToasts: React.Dispatch<React.SetStateAction<ToastMessage[]>> } | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: 'success' | 'error') => {
        setToasts(currentToasts => [
            ...currentToasts,
            { id: Date.now(), message, type }
        ]);
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, setToasts }}>
            {children}
        </ToastContext.Provider>
    );
};