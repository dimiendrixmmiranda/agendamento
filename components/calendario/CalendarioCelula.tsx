import { DiaCalendario } from "@/types/Calendario";

interface Props {
	dia: DiaCalendario;
}

export default function CalendarioCelula({ dia }: Props) {
	return (
		<div
			className={`
				border
				h-20
                w-20
				p-2
				transition
				cursor-pointer
				hover:bg-zinc-50
				${!dia.isMesAtual && "bg-zinc-100 text-zinc-400"}
			`}
		>
			<div
				className={`
					w-8
					h-8
					rounded-full
					flex
					items-center
					justify-center
					font-medium
					${dia.isHoje && "bg-blue-600 text-white"}
				`}
			>
				{dia.dia}
			</div>
		</div>
	);
}