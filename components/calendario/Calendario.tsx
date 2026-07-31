"use client";

import { useCalendario } from "@/hooks/useCalendario";
import CalendarioSemana from "./CalendarioSemana";
import CalendarioGrid from "./CalendarioGrid";
import CalendarioCabecalho from "./CalendarioCabecalho";

export interface EventoCalendario {
	data: string;
	cor: string;
	profissional: string;
}

interface CalendarioProps {
	eventos: EventoCalendario[];
	onSelecionarData: (data: Date) => void;
	dataSelecionada: Date | null;
}

export default function Calendario({
	eventos,
	dataSelecionada,
	onSelecionarData
}: CalendarioProps) {
	const calendario = useCalendario();

	return (
		<div className="bg-white rounded-xl shadow-sm border overflow-hidden w-fit">
			<CalendarioCabecalho {...calendario} />
			<CalendarioSemana />
			<CalendarioGrid
				dias={calendario.dias}
				eventos={eventos}
				onSelecionarData={onSelecionarData}
				dataSelecionada={dataSelecionada}
			/>
		</div>
	);
}