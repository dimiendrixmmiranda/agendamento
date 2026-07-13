'use client'

import Calendario from "@/components/calendario/Calendario";
import { useProfissionais } from "@/hooks/useProfissionais";
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";

export default function Home() {
	const {
		profissionais,
		loading,
		error,
		atualizar
	} = useProfissionais();

	const [agora, setAgora] = useState(new Date());
	const [busca, setBusca] = useState('')

	useEffect(() => {
		const intervalo = setInterval(() => {
			setAgora(new Date());
		}, 1000);

		return () => clearInterval(intervalo);
	}, []);

	const identificarTipo = (tipo: string) => {
		if (tipo == 'MEDICO') {
			return (
				<FaUserDoctor />
			)
		} else {
			return (
				<MdOutlineScience />
			)
		}
	}

	console.log(profissionais)

	return (
		<div className="grid grid-cols-[300px_1fr] w-full min-h-screen">
			<div className="bg-cinza w-full h-full"></div>
			<div className="bg-zinc-200 w-full h-full p-8 text-black font-oswald flex flex-col gap-5">
				{/* cabecalho */}
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Calendário</h2>
						<p>Visualize e gerencie os agendamentos de médicos e laboratórios.</p>
					</div>
					<div className="my-auto flex flex-col">
						<h3 className="text-lg font-bold">
							{agora.toLocaleDateString("pt-BR", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</h3>
						<span className="capitalize -mt-1">
							{agora.toLocaleDateString("pt-BR", {
								weekday: "long",
							})}
							{", "}
							{agora.toLocaleTimeString("pt-BR")}
						</span>
					</div>
				</div>
				<div className="grid grid-cols-[auto_1fr] gap-4">
					<div>
						<Calendario />
					</div>
					<div className="border border-zinc-400 rounded-xl p-4 text-black w-full">
						<h2>Profissionais e Laboratórios do mês</h2>
						<div>
							<input type="search" name="buscar" id="buscar" value={busca} onChange={(e) => setBusca(e.target.value)} />
						</div>
						<div>
							{
								profissionais.length <= 0 ? (
									<div>
										<h3>Nenhum profissional encontrado</h3>
									</div>
								) : (
									<div>
										<ul className="flex flex-col gap-2">
											{
												profissionais.map((prof, i) => {
													return (
														<li key={i} className="grid grid-cols-[auto_1fr_90px] gap-2 border-b border-zinc-400 pb-2">
															<div className="rounded-full p-2 text-2xl w-fit h-fit my-auto text-white" style={{ backgroundColor: `${prof.corCalendario}` }}>
																{identificarTipo(prof.tipo)}
															</div>
															<div className="flex flex-col justify-center">
																<h3 className="capitalize font-bold text-xl leading-5">{prof.nome}</h3>
																<span className="capitalize text-xs leading-5">{prof.especialidade}</span>
															</div>
															<div className="flex flex-col justify-center">
																<h4 className="leading-5">Dias:</h4>
																<span className="leading-5">12, 24, 31</span>
															</div>
														</li>
													)
												})
											}
										</ul>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
