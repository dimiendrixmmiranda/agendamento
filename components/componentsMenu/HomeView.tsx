'use client'

import Calendario from "../calendario/Calendario";
import { Profiler, useEffect, useState } from "react";
import { FaRegClock, FaRegUser, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { PiHeartbeatBold } from "react-icons/pi";
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

    const [menuAtivo, setMenuAtivo] = useState<'home' | 'adicionar'>('home')

    const [visible, setVisible] = useState(false);
    const [agora, setAgora] = useState<Date | null>(null);
    const [busca, setBusca] = useState('')
    const [dataSelecionada, setDataSelecionada] = useState(new Date())
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null)

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

    const agendamentosDoMes = agendamento.filter((prof) =>
        prof.disponibilidades.some((disp) => {
            const data = new Date(disp.data);

            return (
                data.getMonth() === agora!.getMonth() &&
                data.getFullYear() === agora!.getFullYear()
            );
        })
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

    const profissionaisDoMes = agendamento.filter((prof) =>
        prof.disponibilidades.some((disp) => {
            const data = new Date(disp.data);

            return data.getMonth() === mesSelecionado;
        })
    );

    return (
        <>
            <div className="bg-zinc-200 w-full h-full p-8 text-black font-oswald flex flex-col gap-5">
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
                                            <Image alt="img" src={'/assets/calendario.png'} fill className="object-cover" unoptimized/>
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
                                                        }} key={i} className="grid grid-cols-[auto_1fr_90px] gap-2 border-b border-zinc-400 pb-2 cursor-pointer">
                                                            <div className="rounded-full p-2 text-2xl w-fit h-fit my-auto text-white shadow-[0px_0px_2px_1px_black]" style={{ backgroundColor: `${prof.corCalendario}` }}>
                                                                {identificarTipo(prof.tipo)}
                                                            </div>
                                                            <div className="flex flex-col justify-center">
                                                                <h3 className="capitalize font-bold text-xl leading-5">{prof.nome}</h3>
                                                                <span className="capitalize text-xs leading-5">{prof.especialidades?.map(esp => `${esp}`)}</span>
                                                            </div>
                                                            <div className="flex flex-col justify-center">
                                                                <h4 className="leading-5">Dias:</h4>
                                                                <span className="leading-5">{dias.map(((dia, i) => `${dia}${i < dias.length - 1 ? ', ' : ''}`))}</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <Dialog className="w-full max-w-[900px] border border-zinc-800 teste" header={agendamentoSelecionado && (
                                            <div className="p-4">
                                                <h2 className="font-bold text-xl">Doutor {agendamentoSelecionado.nome} - <b className="capitalize">{agendamentoSelecionado.especialidades.map(esp => `${esp} -`)}</b></h2>
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
                                                            <span className="text-sm leading-5 capitalize">{agendamentoSelecionado?.especialidades.map(esp => `${esp} - `)}</span>
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
                                                <div className="flex gap-2">
                                                    <div className="text-2xl font-bold rounded-full bg-blue-300 p-2">
                                                        <IoDocumentTextOutline />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg leading-5">Descrição</h3>
                                                        <span>{agendamentoSelecionado?.descricao}</span>
                                                    </div>
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
                    <div className="grid grid-cols-[1fr_400px] gap-4">
                        <CarrosselProfissionais
                            agendamentos={profissionaisDoMes}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}