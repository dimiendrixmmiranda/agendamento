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

export interface Agendamento {
    id: string;
    tipo: "MEDICO" | "LABORATORIO";
    nome: string;
    especialidades: string[];
    descricao?: string;
    corCalendario: string;
    disponibilidades: Disponibilidade[];
}

export function useAgendamento() {

    const [agendamento, setAgendamento] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function buscarAgendamento() {
        try {

            setLoading(true);

            const response = await fetch("/api/agendamento");

            if (!response.ok) {
                throw new Error("Erro ao buscar agendamento");
            }

            const data = await response.json();

            setAgendamento(data);

        } catch (err) {

            console.error(err);
            setError("Erro ao carregar agendamento");

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        buscarAgendamento();
    }, []);

    return {
        agendamento,
        loading,
        error,
        atualizar: buscarAgendamento
    };

}