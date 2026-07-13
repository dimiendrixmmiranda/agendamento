"use client";

import { useMemo, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { gerarDiasCalendario } from "@/utils/Calendario";

export function useCalendario() {
	const [dataAtual, setDataAtual] = useState(new Date());

	const dias = useMemo(() => {
		return gerarDiasCalendario(dataAtual);
	}, [dataAtual]);

	function proximoMes() {
		setDataAtual((data) => addMonths(data, 1));
	}

	function mesAnterior() {
		setDataAtual((data) => subMonths(data, 1));
	}

	function irParaHoje() {
		setDataAtual(new Date());
	}

	function irParaData(data: Date) {
		setDataAtual(data);
	}

	return {
		dataAtual,
		dias,
		proximoMes,
		mesAnterior,
		irParaHoje,
		irParaData,
	};
}