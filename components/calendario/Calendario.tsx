"use client";

import { useCalendario } from "@/hooks/useCalendario";
import CalendarioSemana from "./CalendarioSemana";
import CalendarioGrid from "./CalendarioGrid";
import CalendarioCabecalho from "./CalendarioCabecalho";

export default function Calendario() {
	const calendario = useCalendario();

	return (
		<div className="bg-zinc-200 rounded-xl shadow-sm border overflow-hidden w-fit">
			<CalendarioCabecalho {...calendario} />
			<CalendarioSemana />
			<CalendarioGrid dias={calendario.dias} />
		</div>
	);
}