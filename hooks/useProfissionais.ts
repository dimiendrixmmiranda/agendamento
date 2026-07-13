'use client';

import { useEffect, useState } from "react";

export interface Horario {
    id: string;
    inicio: string;
    fim: string;
}

export interface LocalAtendimento {
    id: string;
    nome: string;
    endereco?: string | null;
}

export interface Disponibilidade {
    id: string;
    data: string;
    local: LocalAtendimento;
    horarios: Horario[];
}

export interface Profissional {
    id: string;
    tipo: "MEDICO" | "LABORATORIO";
    nome: string;
    especialidade: string;
    descricao?: string;
    corCalendario: string;

    disponibilidades: Disponibilidade[];
}

export function useProfissionais() {

    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function buscarProfissionais() {
        try {

            setLoading(true);

            const response = await fetch("/api/profissionais");

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

    useEffect(() => {
        buscarProfissionais();
    }, []);

    return {
        profissionais,
        loading,
        error,
        atualizar: buscarProfissionais
    };

}