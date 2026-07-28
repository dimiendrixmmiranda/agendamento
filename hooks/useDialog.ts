'use client'

import { useContext } from "react";
import { DialogContext } from "@/contexts/DialogContext";

export function useDialog() {
    return useContext(DialogContext);
}