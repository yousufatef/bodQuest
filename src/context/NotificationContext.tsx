import type { NotificationType } from '@/types';
import { createContext, useContext, type ReactNode,  } from 'react';
import { toast } from 'sonner';

interface NotificationContextType {
    showNotification: (
        type: NotificationType,
        title: string,
        description?: string
    ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

interface NotificationProviderProps {
    children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
    const showNotification = (
        type: NotificationType,
        title: string,
        description?: string
    ) => {
        switch (type) {
            case 'success':
                toast.success(title, { description });
                break;
            case 'error':
                toast.error(title, { description });
                break;
            case 'info':
                toast.info(title, { description });
                break;
            case 'warning':
                toast.warning(title, { description });
                break;
        }
    };

    const value = {
        showNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}