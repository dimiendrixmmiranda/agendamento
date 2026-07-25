'use client'

import { useSearchParams } from "next/navigation";

export default function ImprimirPage() {

    const params = useSearchParams();

    const tipo = params.get("tipo");
    const local = params.get("local");
    const quantidade = Number(params.get("quantidade"));
    
    return (
        <div>

            aqui monta as folhas

        </div>
    );
}