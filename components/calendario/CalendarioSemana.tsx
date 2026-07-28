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
		<div className="grid grid-cols-7 w-fit">
			{diasSemana.map((dia) => (
				<div
					key={dia}
					className={`py-3 text-center font-semibold text-white w-20 bg-blue-600 border border-cinza ${dia == 'Sáb' ? 'bg-orange-600': ''} ${dia == 'Dom' ? 'bg-red-600': ''}`}
				>
					{dia}
				</div>
			))}
		</div>
	);
}