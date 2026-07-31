'use client'

import { Profissional } from "@prisma/client";
import { useEffect, useState } from "react";

export function useProfissionais() {

    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function buscarProfissionais() {
        try {
            setLoading(true);

            const response = await fetch("/api/profissional");

            if (!response.ok) {
                throw new Error("Erro ao buscar profissionais");
            }

            const data = await response.json();

            setProfissionais(data);

        } catch (err) {

            console.error(err);
            setError("Erro ao carregar profissionais");

        } finally {

            setLoading(false);

        }
    }

    function adicionarProfissional(profissional: Profissional) {
        setProfissionais((anteriores) => [
            profissional,
            ...anteriores
        ]);
    }

    async function removerProfissional(id: string) {
        try {
            const response = await fetch(`/api/profissional/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const erro = await response.json();
                console.error(erro);
                return;
            }

            setProfissionais(prev =>
                prev.filter(profissional => profissional.id !== id)
            );

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        buscarProfissionais();
    }, []);

    return {
        profissionais,
        loading,
        error,
        atualizar: buscarProfissionais,
        adicionarProfissional,
        removerProfissional
    };
}