'use client'
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowsRotate, FaPlus, FaRegLightbulb } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Dialog } from 'primereact/dialog';
import Calendario from "@/components/calendario/Calendario";
import { FaRegTrashAlt } from "react-icons/fa";
import { setDate } from "date-fns";
import { IoCalendarNumberOutline } from "react-icons/io5";
import formatarData from "@/utils/formatarData";
import { useLocais } from "@/hooks/useLocais";
import Locais from "@/types/Locais";
import { useProfissionais } from "@/hooks/useProfissionais";
import { TipoProfissional } from "@prisma/client";

interface Horario {
    inicio: string
    fim: string
}

interface Atendimento {
    data: Date
    local: Locais
    horario: Horario[]
}

export default function AdicionarView() {
    const [tipo, setTipo] = useState<TipoProfissional>(
        TipoProfissional.MEDICO
    )
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [cor, setCor] = useState('')
    const [visible, setVisible] = useState(false);

    const [data, setData] = useState("")
    const [localDeAtendimento, setLocalDeAtendimento] = useState<Locais | null>(null)
    const [horarioInicio, setHorarioInicio] = useState('')
    const [horarioFim, setHorarioFim] = useState('')
    const [horarios, setHorarios] = useState<Horario[]>([])
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])

    const { locais, loading } = useLocais()

    const { profissionais } = useProfissionais()


    const [filtroTipo, setFiltroTipo] = useState<any[]>([])
    const [profissional, setProfissional] = useState('')
    const [especialidade, setEspecialidade] = useState<string[]>([])
    const [exames, setexames] = useState<string[]>([])


    useEffect(() => {
        if (tipo === "MEDICO") {
            setFiltroTipo(profissionais.filter(prof => prof.tipo === 'MEDICO'))
        } else if (tipo === "LABORATORIO") {
            setFiltroTipo(profissionais.filter(prof => prof.tipo === 'LABORATORIO'))
        } else {
            setFiltroTipo([])
        }
    }, [tipo, profissionais])

    console.log(filtroTipo)

    const listaDeCores = [
        {
            nome: 'azul',
            cor: '#03AED2'
        },
        {
            nome: 'amarelo',
            cor: '#F8DE22'
        },
        {
            nome: 'laranja',
            cor: '#F45B26'
        },
    ]

    async function salvar() {
        const dados = {
            tipo,
            nome,
            especialidade,
            descricao,
            corCalendario: cor,
            disponibilidades: atendimentos
        };

        const response = await fetch("/api/profissionais", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            const erro = await response.json();
            console.error(erro);
            return;
        }

        const result = await response.json();

        // console.log(result)
    }

    return (
        <div className="w-full min-h-screen font-oswald bg-zinc-200 text-black p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <div className="rounded-full p-2 text-blue-500 border border-zinc-400 text-3xl">
                    <CiCalendarDate />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl">Adicionar Agendamento</h2>
                    <p>Cadastre um medico ou laboratório e defina seus atendimentos.</p>
                </div>
            </div>
            <div className="grid grid-cols-[600px_1fr] gap-4">
                {/* Informações gerais */}
                <div className="border border-zinc-400 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                        <FaArrowsRotate className="text-xl" />
                        <h3 className="font-bold text-2xl">Informções Gerais</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <span className="col-span-2">Tipo: <b className="text-red-600">*</b></span>
                        <button
                            type="button"
                            onClick={() => {
                                setTipo("MEDICO")
                            }}
                            className={`h-12 rounded-lg border transition ${tipo === "MEDICO"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white hover:bg-zinc-50"
                                }`}
                        >
                            Médico
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTipo("LABORATORIO")
                            }}
                            className={`h-12 rounded-lg border transition ${tipo === "LABORATORIO"
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white hover:bg-zinc-50"
                                }`}
                        >
                            Laboratório
                        </button>
                    </div>

                    {/* VAO CARREGAR DOIS SELECTS */}

                    <div className="flex flex-col">
                        <span>Nome: <b className="text-red-600">*</b></span>
                        <select name="filtroTipo" id="filtroTipo">
                            {
                                filtroTipo.map((filtro, i) => {
                                    return (<option key={i} value="filtro">{filtro}</option>)
                                })
                            }
                        </select>
                    </div>
                    {/* 
                     
                    {/* <div className="flex flex-col">
                        <span>Nome: <b className="text-red-600">*</b></span>
                        <input className="h-[35px] p-2 border border-zinc-400 rounded-lg" placeholder="Ex: Doutor Ramiro" type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <span>Especialidade: <b className="text-red-600">*</b></span>
                        <select name="especialidade" id="especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} className="h-[50px] p-2 border border-zinc-400 rounded-lg">
                            <option value="">Selecione</option>
                            {
                                especialidades.map((especialidade, i) => {
                                    return (
                                        <option className="capitalize" key={i} value={especialidade}>{especialidade}</option>
                                    )
                                })
                            }
                        </select>
                    </div> */}
                    <div className="flex flex-col">
                        <span>Descrição / Observações</span>
                        <textarea className="p-2 border border-zinc-400 rounded-lg h-[180px]" name="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <span>Cor para o calendário: <b className="text-red-600">*</b></span>
                        <div className="flex gap-3 flex-wrap">
                            {listaDeCores.map((item) => (
                                <button
                                    key={item.cor}
                                    type="button"
                                    onClick={() => setCor(item.cor)}
                                    title={item.nome}
                                    className={`
                                            w-8
                                            h-8
                                            rounded-md
                                            border-2
                                            transition
                                            ${cor === item.cor
                                            ? "border-black scale-110"
                                            : "border-zinc-300 hover:scale-105"
                                        }
                                    `}
                                    style={{
                                        backgroundColor: item.cor,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dias locais e horarios */}
                <div className="border border-zinc-400 rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <FaArrowsRotate className="text-xl" />
                        <h3 className="font-bold text-2xl">Dias, Locais e Horários de Atendimento</h3>
                    </div>
                    <div className="bg-blue-600/20 p-2 border border-blue-600 text-blue-600 rounded-xl flex items-center gap-1">
                        <IoIosInformationCircleOutline className="text-2xl" />
                        <span>Configure os dias da semana em que o profissional atende, os locais e horarios disponíveis.</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Disponibilidade:</h3>
                            <button className="bg-blue-600 flex items-center gap-1 text-white p-2 rounded-xl" onClick={() => setVisible(true)}>
                                <FaPlus />
                                <p>Adicionar dia de Atendimento</p>
                            </button>
                        </div>
                        {/* dia horario e local de atendimento renderizados */}
                        <div>
                            {
                                atendimentos.length <= 0 ? (
                                    <div>
                                        <h3>Nenhum atendimento adicionado!</h3>
                                    </div>
                                ) : (
                                    <div>
                                        <ul className="flex flex-col gap-4">
                                            {
                                                atendimentos.map((at, i) => {
                                                    return (
                                                        <li key={i} className="border border-zinc-400 rounded-lg p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2 text-xl font-bold">
                                                                    <IoCalendarNumberOutline />
                                                                    <h3 className="capitalize">{formatarData(at.data)}</h3>
                                                                </div>
                                                                <button className="flex items-center gap-2 p-2 border border-red-500 text-red-500 rounded-lg">
                                                                    <FaRegTrashAlt />
                                                                    <span>Remover dia</span>
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4>Local de Atendimento:</h4>
                                                                    <span>{at.local.nome}</span>
                                                                </div>
                                                                <div>
                                                                    <h4>Horarios</h4>
                                                                    <ul className="flex flex-col gap-2">
                                                                        {
                                                                            at.horario.map((hrr, i) => {
                                                                                return (
                                                                                    <li key={i} className="grid grid-cols-2 border border-zinc-400 p-1 rounded-lg">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span>Início:</span>
                                                                                            <span>{hrr.inicio}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span>Fim</span>
                                                                                            <span>{hrr.fim}</span>
                                                                                        </div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
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
                        <Dialog
                            header={
                                <div className="flex items-center gap-3">
                                    <div>
                                        <FaArrowsRotate className="text-4xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl">Adicionar Dia de Atendimento</h3>
                                        <span>Informe o dia o local e os horarios em que o profissional atenderá.</span>
                                    </div>
                                </div>
                            }
                            visible={visible}
                            className="bg-zinc-700 p-4 rounded-xl w-full max-w-[1000px]"
                            onHide={() => setVisible(false)}
                        >
                            <div className="mt-4 font-oswald">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h2>Selecione o dia: <b className="text-red-600">*</b></h2>
                                            <span className="text-sm">Clique em um dia do calendário...</span>
                                        </div>
                                        <div className="bg-red-600">
                                            <input
                                                className="p-2 border border-zinc-400 rounded-lg h-[45px]"
                                                type="date"
                                                name="data"
                                                id="data"
                                                value={data}
                                                onChange={(e) => setData(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-xl">Local de Atendimento: <b className="text-red-600">*</b></h2>
                                            <div className="grid grid-cols-[1fr_170px] gap-2">
                                                <select
                                                    className="h-[50px] p-2 border border-zinc-400 rounded-lg"
                                                    name="locaisDeAtendimento"
                                                    id="localDeAtendimento"
                                                    value={localDeAtendimento?.id ?? ""}
                                                    onChange={(e) => {
                                                        const localSelecionado = locais.find(
                                                            (local) => local.id === e.target.value
                                                        )

                                                        setLocalDeAtendimento(localSelecionado ?? null)
                                                    }}>
                                                    <option value="">Selecione</option>
                                                    {
                                                        locais.map((local, i) => {
                                                            return (
                                                                <option key={i} value={local.id}>{local.nome}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <button className="flex items-center justify-center border border-blue-600 rounded-xl">
                                                    <FaPlus />
                                                    <p>Novo Local</p>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>
                                                <h2 className="text-xl">Horários de atendimento: <b className="text-red-600">*</b></h2>
                                                <span className="text-sm">Adicione um ou mais horários disponíveis para este dia.</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="flex flex-col">
                                                    <label htmlFor="horarioInicio">Início:</label>
                                                    <input className="p-2 border border-zinc-400 rounded-lg h-[45px]" type="time" name="horarioInicio" id="horarioInicio" value={horarioInicio} onChange={(e) => setHorarioInicio(e.target.value)} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="horarioFim">Fim:</label>
                                                    <input className="p-2 border border-zinc-400 rounded-lg h-[45px]" type="time" name="horarioFim" id="horarioFim" value={horarioFim} onChange={(e) => setHorarioFim(e.target.value)} />
                                                </div>
                                                <div
                                                    className="flex flex-col justify-center items-center bg-blue-600 mt-auto h-[45px] rounded-xl"
                                                    onClick={() => {
                                                        setHorarios([...horarios, { inicio: horarioInicio, fim: horarioFim }])
                                                        setHorarioInicio('')
                                                        setHorarioFim('')
                                                    }}
                                                >
                                                    Adicionar
                                                </div>
                                                <div className="col-span-3">
                                                    {
                                                        horarios.length <= 0 ? (
                                                            <div>
                                                                <h3>Nenhum Horario Adicionado</h3>
                                                            </div>
                                                        ) : <div>
                                                            <ul className="flex flex-col gap-2">
                                                                {
                                                                    horarios.map((horario, i) => {
                                                                        return (
                                                                            <li key={i} className="grid grid-cols-[1fr_1fr_1fr_40px] border border-zinc-400 p-2 rounded-lg">
                                                                                <p className="mx-auto">{horario.inicio}</p>
                                                                                <span className="mx-auto">Até</span>
                                                                                <p className="mx-auto">{horario.fim}</p>
                                                                                <button className="mx-auto"><FaRegTrashAlt /></button>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-amber-500/20 rounded-xl border border-amber-500 p-2 col-span-3 grid grid-cols-[40px_1fr] gap-2">
                                            <div className="text-4xl flex justify-center items-center">
                                                <FaRegLightbulb className="text-amber-500" />
                                            </div>
                                            <div>
                                                <h2><b>Dica:</b> Adicione todos os períodos disponíveis neste dia.</h2>
                                                <span className="text-sm">EX: 07:00 - 11:00, 13:00 - 17:00</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="border border-zinc-400 rounded-lg p-2 text-lg">Cancelar</button>
                                            <button
                                                className="border border-zinc-400 rounded-lg p-2 text-lg bg-green-600"
                                                onClick={() => {
                                                    if (!localDeAtendimento) {
                                                        alert("Selecione um local")
                                                        return
                                                    }

                                                    const novoAtendimento: Atendimento = {
                                                        data: new Date(data),
                                                        local: localDeAtendimento,
                                                        horario: horarios
                                                    }

                                                    setAtendimentos([
                                                        ...atendimentos,
                                                        novoAtendimento
                                                    ])

                                                    setData("")
                                                    setLocalDeAtendimento(null)
                                                    setHorarios([])
                                                    setVisible(false)
                                                }}
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
                <div>
                    <button>Cancelar</button>
                    <button onClick={() => salvar()}>Salvar Agendamento</button>
                </div>
            </div>
        </div>
    )
}