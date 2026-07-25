import { DiaCalendario } from "@/types/Calendario";
import CalendarioCelula from "./CalendarioCelula";
import { EventoCalendario } from "./Calendario";

interface Props {
	dias: DiaCalendario[];
	eventos: EventoCalendario[];
	dataSelecionada: Date | null;
	onSelecionarData: (data: Date) => void;
}

export default function CalendarioGrid({ dias, eventos, dataSelecionada, onSelecionarData }: Props) {
	return (
		<div className="grid grid-cols-7 w-fit">
			{dias.map((dia) => {
				const eventosDoDia = eventos.filter((evento) => {
					const dataEvento = new Date(evento.data);

					return (
						dataEvento.getDate() === dia.data.getDate() &&
						dataEvento.getMonth() === dia.data.getMonth() &&
						dataEvento.getFullYear() === dia.data.getFullYear()
					);
				});

				return (
					<CalendarioCelula
						key={dia.data.toISOString()}
						dia={dia}
						eventos={eventosDoDia}
						onSelecionarData={onSelecionarData}
						dataSelecionada={dataSelecionada}
					/>
				);
			})}
		</div>
	);
}