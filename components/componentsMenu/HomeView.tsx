'use client'

import Calendario from "../calendario/Calendario";
import { Profiler, useEffect, useState } from "react";
import { FaRegClock, FaRegUser, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineScience, MdScience } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { PiHeartbeatBold, PiListMagnifyingGlassBold } from "react-icons/pi";
import { IoCalendarNumberOutline, IoCalendarOutline, IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import CarrosselProfissionais from "../carrossel/Carrossel";
import { Agendamento, useAgendamento } from "@/hooks/useAgendamentos";
import { TipoProfissional } from "@prisma/client";
import Image from "next/image";

export default function HomeView() {
    const [pagina, setPagina] = useState<"home" | "adicionar">("home");
    const {
        agendamento,
        loading,
        error,
        atualizar
    } = useAgendamento()

    const [tipo, setTipo] = useState<TipoProfissional>(
        TipoProfissional.MEDICO
    )

    const meses = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ"
    ]

    const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
    const [buscarAgendamento, setBuscarAgendamento] = useState('')

    const [menuAtivo, setMenuAtivo] = useState<'home' | 'adicionar'>('home')
    const [visible, setVisible] = useState(false);
    const [agora, setAgora] = useState<Date | null>(null);
    const [busca, setBusca] = useState('')
    const [dataSelecionada, setDataSelecionada] = useState(new Date())
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null)

    const anoAtual = agora?.getFullYear() ?? new Date().getFullYear();

    const agendamentosDoMes = agendamento
        .map((prof) => ({
            ...prof,
            disponibilidades: prof.disponibilidades.filter((disp) => {
                const data = new Date(disp.data);

                return (
                    data.getMonth() === mesSelecionado &&
                    data.getFullYear() === anoAtual
                );
            }),
        }))
        .filter((prof) => prof.disponibilidades.length > 0);

    const agendamentosFiltrados = agendamentosDoMes.filter((ag) => {
        // filtro por tipo
        if (ag.tipo !== tipo) return false;

        // se não digitou nada
        if (!buscarAgendamento.trim()) return true;

        const busca = buscarAgendamento.toLowerCase();

        return (
            ag.nome.toLowerCase().includes(busca) ||

            ag.especialidades.some((esp) =>
                esp.replaceAll("_", " ").toLowerCase().includes(busca)
            )
        );
    });


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
        ? agendamento.filter((profissional) =>
            profissional.disponibilidades.some((disp) => {
                const data = new Date(disp.data);

                return (
                    data.getDate() === dataSelecionada.getDate() &&
                    data.getMonth() === dataSelecionada.getMonth() &&
                    data.getFullYear() === dataSelecionada.getFullYear()
                );
            })
        )
        : [];





    return (
        <>
            <div className="bg-zinc-100 w-full h-full p-8 text-black font-oswald flex flex-col gap-5">
                {/* cabecalho */}
                <div className="flex justify-between">
                    {agora && (
                        <>
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
                        </>
                    )}
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div>
                        <Calendario
                            eventos={eventos}
                            onSelecionarData={setDataSelecionada}
                            dataSelecionada={dataSelecionada}
                        />
                    </div>
                    <div className="border border-zinc-400 bg-white rounded-xl p-4 text-black w-full flex flex-col gap-4">
                        <h2>Profissionais e Laboratórios do Dia</h2>
                        <div>
                            {
                                agendamentosDoDia.length <= 0 ? (
                                    <div className="text-cinza flex flex-col justify-center items-center gap-4">
                                        <div className="relative w-[270px] h-[250px] flex justify-center items-center mx-auto">
                                            <Image alt="img" src={'/assets/calendario.png'} fill className="object-cover" unoptimized />
                                        </div>
                                        <h3 className="text-xl text-center">Nenhum profissional encontrado</h3>
                                        <span className="text-center leading-4 -mt-2">
                                            Não há profissionais ou laboratórios agendados para a data selecionada.
                                        </span>
                                    </div>
                                ) : (
                                    <div>
                                        <ul className="flex flex-col gap-4">
                                            {
                                                agendamentosDoDia.map((prof, i) => {
                                                    const dias = prof.disponibilidades.map((disp) =>
                                                        new Date(disp.data).getDate()
                                                    )

                                                    return (
                                                        <li onClick={() => {
                                                            setAgendamentoSelecionado(prof)
                                                            setVisible(true)
                                                        }} key={i} className="grid grid-cols-[auto_1fr_auto_60px] gap-2 border-b border-zinc-400 pb-2 cursor-pointer">
                                                            <div className="rounded-full p-2 text-2xl w-fit h-fit my-auto text-white shadow-[0px_0px_2px_1px_black]" style={{ backgroundColor: `${prof.corCalendario}` }}>
                                                                {identificarTipo(prof.tipo)}
                                                            </div>
                                                            <div className="flex flex-col justify-center gap-1">
                                                                <h3 className="capitalize font-bold text-xl leading-5 line-clamp-1">{prof.nome}</h3>
                                                                <span className="capitalize text-xs leading-3.5 line-clamp-2">{prof.especialidades?.map(esp => `${esp.replaceAll('_', ' ')}, `)}</span>
                                                            </div>
                                                            <div className="flex flex-col justify-center px-4">
                                                                <h4 className="leading-5">Dias:</h4>
                                                                <span className="leading-5">{dias.map(((dia, i) => `${dia}${i < dias.length - 1 ? ', ' : ''}`))}</span>
                                                            </div>
                                                            <div className="flex w-full h-full">
                                                                <button className="bg-blue-200 text-blue-700 rounded-full w-[40px] h-[40px] mx-auto my-auto flex justify-center items-center text-xl">
                                                                    <PiListMagnifyingGlassBold />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <Dialog className="w-full max-w-[900px] border border-zinc-800 teste" header={agendamentoSelecionado && (
                                            <div className="p-4">
                                                <h2 className="font-bold text-xl">{agendamentoSelecionado.nome}</h2>
                                            </div>
                                        )} visible={visible} onHide={() => setVisible(false)}>
                                            <div className="p-4 bg-zinc-100 text-blue-950 flex flex-col gap-4">
                                                <div className="grid grid-cols-3 pb-4 border-b border-zinc-400">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 text-2xl bg-blue-300 rounded-full my-auto">
                                                            <FaRegUser />
                                                        </div>
                                                        <div className="flex flex-col justify-center gap-1">
                                                            <h4 className="font-bold text-xl leading-4">Nome:</h4>
                                                            <span className="text-sm leading-5 capitalize">{agendamentoSelecionado?.nome}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 text-2xl bg-blue-300 rounded-full my-auto">
                                                            <PiHeartbeatBold />
                                                        </div>
                                                        <div className="flex flex-col justify-center gap-1">
                                                            <h4 className="font-bold text-xl leading-4">Especialidade:</h4>
                                                            <span className="text-sm leading-5 capitalize">{agendamentoSelecionado?.especialidades[0].replaceAll('_', ' ').split(' ')[0]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 text-2xl bg-blue-300 rounded-full my-auto">
                                                            <IoCalendarNumberOutline />
                                                        </div>
                                                        <div className="flex flex-col justify-center gap-1">
                                                            <h4 className="font-bold text-xl leading-4">Dias de Atendimento:</h4>
                                                            <span className="text-sm leading-5 capitalize">
                                                                {
                                                                    agendamentoSelecionado?.disponibilidades.map((disp) =>
                                                                        new Date(disp.data).getDate()
                                                                    ).map((d) => `${d},`)
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 pb-4 border-b border-zinc-400">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-2 text-2xl bg-blue-300 rounded-full">
                                                            <IoLocationOutline />
                                                        </div>
                                                        <h2 className="text-xl font-bold">Locais de Atendimento</h2>
                                                    </div>
                                                    <div>
                                                        <ul className="flex flex-col gap-2">
                                                            {
                                                                agendamentoSelecionado?.disponibilidades.map((dia, i) => {
                                                                    return (
                                                                        <li key={i} className="ml-10 rounded-xl p-2 border border-zinc-400 relative overflow-hidden grid grid-cols-2">
                                                                            <div className="w-1 h-full absolute top-0 left-0 bg-blue-700" />
                                                                            <div>
                                                                                <h3>{dia.local.nome}</h3>
                                                                                <span>Rua das flores, 123 - Centro</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="text-2xl font-bold p-2 rounded-full bg-blue-300">
                                                                                    <FaRegClock />
                                                                                </div>
                                                                                <div className="flex flex-col justify-center my-auto">
                                                                                    <h3 className="text-lg font-bold leading-5">Horários</h3>
                                                                                    {
                                                                                        dia.horarios.map((hrr, i) => {
                                                                                            if (dia.horarios.length <= i) {
                                                                                                return (
                                                                                                    <p key={i} className="">{hrr.inicio} - {hrr.fim} |</p>
                                                                                                )
                                                                                            } else {
                                                                                                return (
                                                                                                    <p key={i} className="">{hrr.inicio} - {hrr.fim}</p>
                                                                                                )
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 border-b border-zinc-400 pb-4">
                                                    <div className="text-2xl font-bold rounded-full bg-blue-300 p-2">
                                                        <IoDocumentTextOutline />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg leading-5">Descrição</h3>
                                                        <span>{agendamentoSelecionado?.descricao}</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr] gap-2">
                                                    <div className="p-2 text-2xl bg-blue-300 rounded-full my-auto row-span-2">
                                                        <PiHeartbeatBold />
                                                    </div>
                                                    <div className="row-span-2">
                                                        <h3 className="font-bold text-lg leading-5">Lista de Especialidades</h3>
                                                    </div>
                                                    <ul className="col-start-2 col-end-3 -mt-7 flex flex-wrap">
                                                        {agendamentoSelecionado?.especialidades.map((esp, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    <p>{`${esp.replaceAll('_', ' ')}, `}</p>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full border border-zinc-400 bg-white rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-200 p-2 rounded-full text-2xl text-blue-600">
                            <IoCalendarOutline />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-cinza">Lista de Agendas no Mês</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {meses.map((mes, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMesSelecionado(index)}
                                    className={`px-3 py-2 rounded-lg border cursor-pointer transition ${mesSelecionado === index
                                        ? "bg-blue-600 text-white"
                                        : "bg-white hover:bg-zinc-100"
                                        }`}
                                >
                                    {mes}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTipo("MEDICO")}
                                className={`px-3 py-2 rounded-lg border transition cursor-pointer ${tipo === "MEDICO"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-zinc-100"
                                    }`}
                            >
                                MEDICO
                            </button>
                            <button
                                onClick={() => setTipo("LABORATORIO")}
                                className={`px-3 py-2 rounded-lg border transition cursor-pointer ${tipo === "LABORATORIO"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-zinc-100"
                                    }`}
                            >
                                LABORATORIO
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_400px] gap-4 2xl:gap-8 3xl:grid-cols-[1fr_550px]">
                        <div className="flex flex-col gap-1 col-span-2">
                            <label htmlFor="buscarAgendamento">BuscarAgendamento</label>
                            <input
                                className="border border-zinc-400 rounded-xl h-[35px] p-2"
                                type="text"
                                value={buscarAgendamento}
                                onChange={(e) => setBuscarAgendamento(e.target.value)}
                                placeholder="Buscar por nome ou especialidade..."
                            />
                        </div>
                        {
                            agendamentosFiltrados.length > 0 ? (
                                <CarrosselProfissionais
                                    agendamentos={agendamentosFiltrados}
                                />
                            ) : (
                                <div className="text-cinza flex flex-col justify-center items-center gap-4 row-start-1 row-end-3 col-span-2 col-end-3">
                                    <div className="relative w-[220px] h-[180px] flex justify-center items-center mx-auto">
                                        <Image alt="img" src={'/assets/calendario.png'} fill className="object-cover" unoptimized />
                                    </div>
                                    <h3 className="text-xl text-center">Nenhum profissional ou laboratório encontrado</h3>
                                    <span className="text-center leading-4 -mt-2">
                                        Não há profissionais ou laboratórios agendados para este mês!
                                    </span>
                                </div>
                            )
                        }
                        {
                            agendamentosFiltrados.length > 0 && (
                                <div className="w-full h-full rounded-xl grid grid-cols-2 gap-4 font-oswald">
                                    <div className="w-full h-ful rounded-xl border border-zinc-400 flex flex-col justify-center items-center gap-4 text-cinza p-4">
                                        <div className="w-24 h-24 flex justify-center items-center text-5xl rounded-full bg-blue-200 text-blue-700">
                                            <FaUserDoctor />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-center">Médicos do Mês</h3>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <h4 className="text-5xl font-bold">12</h4>
                                            <span>Profissionais Ativos</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-ful rounded-xl border border-zinc-400 flex flex-col justify-center items-center gap-4 text-cinza p-4">
                                        <div className="w-24 h-24 flex justify-center items-center text-5xl rounded-full bg-blue-200 text-blue-700">
                                            <MdScience />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-center line-clamp-1 max-w-[90%] 3xl:max-w-full">Laboratórios do Mês</h3>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <h4 className="text-5xl font-bold">12</h4>
                                            <span>Laboratórios Ativos</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}