import { DiaCalendario } from "@/types/Calendario";
import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	isSameMonth,
	isToday,
	startOfMonth,
	startOfWeek,
} from "date-fns";

export function gerarDiasCalendario(data: Date): DiaCalendario[] {
	// Primeiro dia do mês
	const inicioMes = startOfMonth(data);

	// Último dia do mês
	const fimMes = endOfMonth(data);

	// Início da grade (segunda-feira)
	const inicioCalendario = startOfWeek(inicioMes, {
		weekStartsOn: 1,
	});

	// Final da grade (domingo)
	const fimCalendario = endOfWeek(fimMes, {
		weekStartsOn: 1,
	});

	// Todos os dias da grade
	const dias = eachDayOfInterval({
		start: inicioCalendario,
		end: fimCalendario,
	});

	return dias.map((dia) => ({
		data: dia,
		dia: dia.getDate(),
		isHoje: isToday(dia),
		isMesAtual: isSameMonth(dia, data),
		eventos: [],
	}));
}