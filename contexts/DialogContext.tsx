'use client'

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { createContext, ReactNode, useState } from "react";

export interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
}

interface DialogContextType {
    confirm: (options: ConfirmOptions) => void;
}

export const DialogContext = createContext<DialogContextType>({
    confirm: () => { }
});

interface DialogProviderProps {
    children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
    const [dialog, setDialog] = useState<ConfirmOptions | null>(null);

    function confirm(options: ConfirmOptions) {
        setDialog(options);
    }

    function closeDialog() {
        setDialog(null);
    }

    return (
        <DialogContext.Provider value={{ confirm }}>
            {children}

            <ConfirmDialog
                dialog={dialog}
                onClose={closeDialog}
            />
        </DialogContext.Provider>
    );
}