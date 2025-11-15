import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { XIcon } from './icons';

const Toast = () => {
    const { toasts, setToasts } = useContext(ToastContext)!;
    const [hiding, setHiding] = useState<number[]>([]);

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                const toastToHide = toasts[0];
                setHiding(prev => [...prev, toastToHide.id]);
                setTimeout(() => {
                     setToasts(currentToasts => currentToasts.slice(1));
                     setHiding(prev => prev.filter(id => id !== toastToHide.id));
                }, 300);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toasts, setToasts]);

    const handleClose = (id: number) => {
        setHiding(prev => [...prev, id]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
            setHiding(prev => prev.filter(hId => hId !== id));
        }, 300);
    };

    return (
        <div className="fixed bottom-5 right-5 z-[100] space-y-2">
            {toasts.map(toast => {
                const isHiding = hiding.includes(toast.id);
                const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-green-500';
                return (
                    <div
                        key={toast.id}
                        className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-300 ease-in-out ${bgColor} ${isHiding ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`}
                    >
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-white">{toast.message}</p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        onClick={() => handleClose(toast.id)}
                                        className="inline-flex rounded-md text-white/80 hover:text-white focus:outline-none"
                                    >
                                        <XIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Toast;