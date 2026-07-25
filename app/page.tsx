'use client'

import Calendario from "@/components/calendario/Calendario";
import { useEffect } from "react";
import { FaRegClock, FaRegUser, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import { Dialog } from 'primereact/dialog';
import { PiHeartbeatBold } from "react-icons/pi";
import { IoCalendarNumberOutline, IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import CarrosselProfissionais from "@/components/carrossel/Carrossel";
import Menu from "@/components/menu/Menu";
import { Suspense, lazy, useState } from "react";
import Loading from "@/components/loading/Loading";
import { Agendamento, useAgendamento } from "@/hooks/useAgendamentos";
import AdicionarPreparoView from "@/components/componentsMenu/AdicionarPreparoView";

const HomeView = lazy(() => import("@/components/componentsMenu/HomeView"));
const AdicionarView = lazy(() => import("@/components/componentsMenu/AdicionarView"));
const AdicionarLocalView = lazy(() => import("@/components/componentsMenu/AdicionarLocalView"));
const AdicionarProfissionalView = lazy(() => import("@/components/componentsMenu/AdicionarProfissionalView"));

export default function Home() {
	const [pagina, setPagina] = useState<"home" | "adicionar" | 'adicionarLocal' | 'adicionarProfissional' | 'adicionarPreparos'>("home");

	const {
		agendamento,
		loading,
		error,
		atualizar
	} = useAgendamento()

	const [menuAtivo, setMenuAtivo] = useState<'home' | 'adicionar'>('home')
	const [visible, setVisible] = useState(false);
	const [agora, setAgora] = useState<Date | null>(null);
	const [busca, setBusca] = useState('')
	const [dataSelecionada, setDataSelecionada] = useState(new Date())
	const [profissionalSelecionado, setProfissionalSelecionado] = useState<Agendamento | null>(null)

	useEffect(() => {
		setAgora(new Date());

		const intervalo = setInterval(() => {
			setAgora(new Date());
		}, 1000);

		return () => clearInterval(intervalo);
	}, []);

	const identificarTipo = (tipo: string) => {
		if (tipo == 'MEDICO') {
			return (
				<FaUserDoctor className="drop-shadow-[1px_1px_2px_black]" />
			)
		} else {
			return (
				<MdOutlineScience className="drop-shadow-[1px_1px_2px_black]" />
			)
		}
	}

	const eventos = agendamento.flatMap((prof) =>
		prof.disponibilidades.map((disp) => ({
			data: disp.data,
			cor: prof.corCalendario,
			profissional: prof.nome,
			tipo: prof.tipo
		}))
	)

	const agendamentosDoDia = dataSelecionada
		? agendamento.filter((agendamento) =>
			agendamento.disponibilidades.some((disp) => {
				const data = new Date(disp.data);

				return (
					data.getDate() === dataSelecionada.getDate() &&
					data.getMonth() === dataSelecionada.getMonth() &&
					data.getFullYear() === dataSelecionada.getFullYear()
				);
			})
		)
		: [];

	const agendamentosDoMes = agendamento.filter((prof) =>
		prof.disponibilidades.some((disp) => {
			const data = new Date(disp.data);

			return (
				data.getMonth() === agora!.getMonth() &&
				data.getFullYear() === agora!.getFullYear()
			);
		})
	)
	
	// console.log(agendamentosDoMes)
	
	return (
		<div className="grid grid-cols-[300px_1fr] min-h-screen">
			<Menu
				pagina={pagina}
				onChange={setPagina}
			/>
			<div className="bg-zinc-200">
				<Suspense fallback={<Loading />}>
					{pagina === "home" && <HomeView />}
					{pagina === "adicionar" && <AdicionarView />}
					{pagina === "adicionarLocal" && <AdicionarLocalView />}
					{pagina === "adicionarProfissional" && <AdicionarProfissionalView />}
					{pagina === "adicionarPreparos" && <AdicionarPreparoView />}
				</Suspense>
			</div>
		</div>
	)
}