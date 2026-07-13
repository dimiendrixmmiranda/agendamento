import { DiaCalendario } from "@/types/Calendario";
import CalendarioCelula from "./CalendarioCelula";


interface Props {
	dias: DiaCalendario[];
}

export default function CalendarioGrid({ dias }: Props) {
	return (
		<div className="grid grid-cols-7 w-fit">
			{dias.map((dia) => (
				<CalendarioCelula
					key={dia.data.toISOString()}
					dia={dia}
				/>
			))}
		</div>
	);
}