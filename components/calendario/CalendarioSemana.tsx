const diasSemana = [
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb",
	"Dom",
];

export default function CalendarioSemana() {
	return (
		<div className="grid grid-cols-7 border-b w-fit">
			{diasSemana.map((dia) => (
				<div
					key={dia}
					className="py-3 text-center font-semibold text-zinc-500 w-20"
				>
					{dia}
				</div>
			))}
		</div>
	);
}