"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaArrowLeftLong, FaArrowRightLong, FaFilter } from "react-icons/fa6";

interface CalendarioCabecalhoProps {
    dataAtual: Date;
    proximoMes: () => void;
    mesAnterior: () => void;
    irParaHoje: () => void;
}

export default function CalendarioCabecalho({
    dataAtual,
    proximoMes,
    mesAnterior,
    irParaHoje,
}: CalendarioCabecalhoProps) {
    return (
        <div className="grid grid-cols-[auto_1fr_40px] gap-4 border-b px-6 py-4 bg-cinza text-white text-shadow-[1px_1px_2px_black]">
            <div className="flex items-center gap-3">
                <button
                    onClick={mesAnterior}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border transition hover:bg-zinc-100"
                >
                    <FaArrowLeftLong />
                </button>

                <button
                    onClick={proximoMes}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border transition hover:bg-zinc-100"
                >
                    <FaArrowRightLong />
                </button>

                <button
                    onClick={irParaHoje}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-zinc-100"
                >
                    Hoje
                </button>
            </div>

            <h2 className="text-2xl font-bold capitalize flex items-center">
                {format(dataAtual, "MMMM yyyy", {
                    locale: ptBR,
                })}
            </h2>
            <div className="flex justify-center items-center text-2xl">
                <button>
                    <FaFilter />
                </button>
            </div>
        </div>
    );
}