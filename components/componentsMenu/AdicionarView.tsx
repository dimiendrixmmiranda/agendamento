'use client'
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowsRotate, FaPlus, FaRegLightbulb } from "react-icons/fa6";
import { IoIosInformationCircleOutline, IoIosSave } from "react-icons/io";
import { Dialog } from 'primereact/dialog';
import Calendario from "@/components/calendario/Calendario";
import { FaRegTrashAlt } from "react-icons/fa";
import { setDate } from "date-fns";
import { IoCalendarNumberOutline } from "react-icons/io5";
import formatarData from "@/utils/formatarData";
import { useLocais } from "@/hooks/useLocais";
import Locais from "@/types/Locais";
import { useProfissionais } from "@/hooks/useProfissionais";
import { Profissional, TipoProfissional } from "@prisma/client";
import { listaDeCores } from "@/utils/ListaDeCores";
import { TbCancel } from "react-icons/tb";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useDialog } from "@/hooks/useDialog";

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
    const { confirm } = useDialog();

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
    const [profissionalId, setProfissionalId] = useState('')
    const [profissional, setProfissional] = useState<Profissional | null>(null)

    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
    const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState<string[]>([]);

    useEffect(() => {
        const encontrarProfissional = filtroTipo.find(
            p => p.id === profissionalId
        );
        setProfissional(encontrarProfissional)
    }, [profissionalId, filtroTipo, profissionais])


    useEffect(() => {
        if (tipo === "MEDICO") {
            setFiltroTipo(profissionais.filter(prof => prof.tipo === 'MEDICO'))
        } else if (tipo === "LABORATORIO") {
            setFiltroTipo(profissionais.filter(prof => prof.tipo === 'LABORATORIO'))
        } else {
            setFiltroTipo([])
        }
    }, [tipo, profissionais])

    async function salvar() {
        console.log("ENTROU NO SALVAR");

        const dados = {
            tipo,
            nome: profissional?.nome || '',
            especialidades: especialidadesSelecionadas,
            descricao,
            corCalendario: cor,
            disponibilidades: atendimentos.map((atendimento) => ({
                data: atendimento.data,
                localId: atendimento.local.id,
                horario: atendimento.horario
            }))
        };

        console.log(dados);

        const response = await fetch("/api/agendamento", {
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
        console.log("Agendamento criado:", result);

    }

    function stringParaData(data: string) {
        const [ano, mes, dia] = data.split("-").map(Number);
        return new Date(ano, mes - 1, dia);
    }

    const listaOpcoes = profissional
        ? tipo === "MEDICO"
            ? profissional.especialidades
            : profissional.exames
        : [];

    function removerDia(index: number) {
        setAtendimentos((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }
    function removerHorario(index: number) {
        setHorarios((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }

    function removerEspecialidade(index: number) {
        setEspecialidadesSelecionadas(
            especialidadesSelecionadas.filter((_, i) => i !== index)
        )
    }

    function limparFormulario() {
        setTipo(TipoProfissional.MEDICO)

        setDescricao("")
        setCor("")

        setProfissionalId("")
        setProfissional(null)

        setEspecialidadeSelecionada("")
        setEspecialidadesSelecionadas([])

        setAtendimentos([])

        setData("")
        setLocalDeAtendimento(null)

        setHorarioInicio("")
        setHorarioFim("")
        setHorarios([])

        setFiltroTipo([])
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
            <div className="flex w-full">
                <div className="grid grid-cols-[500px_1fr] gap-4 w-full">
                    {/* Informações gerais */}
                    <div className="border border-zinc-400 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                            <FaArrowsRotate className="text-xl" />
                            <h3 className="font-bold text-2xl">Informções Gerais</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
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

                        {/* VAO CARREGAR DOIS SELECTS: NOMES DISPONIVEIS*/}
                        {
                            filtroTipo.length > 0 ? (
                                <div className="flex flex-col">
                                    <span>Nome: <b className="text-red-600">*</b></span>
                                    <select className="h-[35px] border border-zinc-500 rounded-xl px-2" name="filtroTipo" id="filtroTipo" value={profissionalId} onChange={(e) => setProfissionalId(e.target.value)}>
                                        <option value="">Selecione</option>
                                        {
                                            filtroTipo.map((filtro, i) => {
                                                return (
                                                    <option key={i} value={filtro.id}>{filtro.nome}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            ) : ''
                        }

                        {
                            profissional ? (
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-2">
                                        <span>
                                            {tipo === "MEDICO" ? "Especialidades" : "Exames"}:
                                            <b className="text-red-600">*</b>
                                        </span>

                                        <div className="flex items-center">
                                            <select
                                                className="h-[35px] border border-zinc-500 rounded-l-xl px-2 w-full"
                                                value={especialidadeSelecionada}
                                                onChange={(e) =>
                                                    setEspecialidadeSelecionada(e.target.value)
                                                }
                                            >
                                                <option value="">Selecione</option>

                                                {listaOpcoes.map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                className="bg-green-600 h-[35px] px-2 rounded-r-xl text-white text-shadow-[1px_1px_2px_black]"
                                                onClick={() => {
                                                    if (!especialidadeSelecionada) return;
                                                    setEspecialidadesSelecionadas([
                                                        ...especialidadesSelecionadas,
                                                        especialidadeSelecionada
                                                    ]);
                                                    setEspecialidadeSelecionada("");
                                                }}
                                            >
                                                Adicionar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 mt-2">
                                        {especialidadesSelecionadas.map((item, i) => (
                                            <div key={i} className="flex justify-between border border-zinc-400 p-1 rounded-xl">
                                                <p>{item}</p>
                                                <button onClick={() => removerEspecialidade(i)}><FaRegTrashAlt /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Selecione o profissional para ver as opções disponíveis.
                                </div>
                            )
                        }

                        {/* Descrição */}
                        <div className="flex flex-col">
                            <span>Descrição / Observações</span>
                            <textarea className="p-2 border border-zinc-400 rounded-lg h-[180px]" name="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>

                        {/* Cor */}
                        <div className="flex flex-col gap-1">
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
                    <div className="border border-zinc-400 rounded-xl p-4 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <FaArrowsRotate className="text-xl" />
                            <h3 className="font-bold text-2xl">Dias, Locais e Horários de Atendimento</h3>
                        </div>
                        <div className="bg-blue-600/20 p-2 border border-blue-600 text-blue-600 rounded-xl flex items-center gap-1">
                            <IoIosInformationCircleOutline className="text-2xl" />
                            <span>Configure os dias da semana em que o profissional atende, os locais e horarios disponíveis.</span>
                        </div>
                        <div className="flex flex-col gap-4 h-full">
                            <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center 2xl:justify-between">
                                <h3 className="text-lg font-bold">Disponibilidade:</h3>
                                <button className="bg-blue-600 flex justify-center items-center gap-2 text-white p-2 rounded-xl" onClick={() => setVisible(true)}>
                                    <FaPlus />
                                    <p>Adicionar dia de Atendimento</p>
                                </button>
                            </div>
                            {/* dia horario e local de atendimento renderizados */}
                            <div className="w-full h-full">
                                {
                                    atendimentos.length <= 0 ? (
                                        <div className="flex items-center justify-center h-full text-2xl">
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
                                                                    <div className="flex items-center gap-2 text-lg font-bold">
                                                                        <IoCalendarNumberOutline />
                                                                        <h3 className="capitalize line-clamp-1 min-w-0">{formatarData(at.data)}</h3>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => {
                                                                            confirm({
                                                                                title: "Remover dia",
                                                                                message: "Deseja realmente remover este dia de atendimento?",
                                                                                confirmText: "Remover",
                                                                                cancelText: "Cancelar",
                                                                                onConfirm: () => {
                                                                                    removerDia(i);
                                                                                }
                                                                            })
                                                                        }}
                                                                        className="flex items-center gap-2 p-2 border border-red-500 text-red-500 rounded-lg"
                                                                    >
                                                                        <FaRegTrashAlt />
                                                                        <span className="hidden 2xl:block whitespace-nowrap">
                                                                            Remover dia
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                <div className="grid grid-cols-[1fr_150px] gap-4 2xl:grid-cols-2">
                                                                    <div>
                                                                        <h4 className="text-lg font-bold">Local de Atendimento:</h4>
                                                                        <span className="leading-5 flex">{at.local.nome}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Horarios</h4>
                                                                        <ul className="flex flex-col gap-2">
                                                                            {
                                                                                at.horario.map((hrr, i) => {
                                                                                    return (
                                                                                        <li key={i} className="grid grid-cols-2 border border-zinc-400 p-1 rounded-lg">
                                                                                            <div className="flex items-center justify-center gap-2 text-sm">
                                                                                                <span>Início:</span>
                                                                                                <span>{hrr.inicio}</span>
                                                                                            </div>
                                                                                            <div className="flex items-center justify-center gap-2 text-sm">
                                                                                                <span>Fim:</span>
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
                                className="bg-cinza p-4 rounded-xl w-full max-w-[1000px] border borde-white"
                                onHide={() => setVisible(false)}
                            >
                                <div className="mt-4 font-oswald">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <h2>Selecione o dia: <b className="text-red-600">*</b></h2>
                                                <span className="text-sm">Clique em um dia do calendário...</span>
                                            </div>
                                            <div className="">
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
                                                        className="h-[50px] p-2 border border-zinc-400 bg-zinc-900 rounded-lg"
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
                                                                                    <button className="mx-auto" onClick={() => removerHorario(i)}><FaRegTrashAlt /></button>
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
                                                        if (!data) {
                                                            alert("Selecione uma data")
                                                            return
                                                        }
                                                        if (horarios.length <= 0) {
                                                            alert("Adicione pelo menos um horário")
                                                            return
                                                        }

                                                        const novoAtendimento: Atendimento = {
                                                            data: stringParaData(data),
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
                    <div className="grid grid-cols-2 w-fit gap-4 ml-auto col-span-2">
                        <button
                            onClick={() => {

                                if (!profissional) {
                                    alert("Selecione um profissional");
                                    return;
                                }

                                if (atendimentos.length === 0) {
                                    alert("Adicione pelo menos um dia de atendimento");
                                    return;
                                }

                                confirm({
                                    title: "Salvar agendamento",
                                    message: `Deseja realmente cadastrar a agenda de "${profissional.nome}"?`,
                                    confirmText: "Salvar",
                                    cancelText: "Cancelar",
                                    onConfirm: salvar
                                });
                                limparFormulario
                            }}
                            className="flex items-center justify-center text-center gap-2 px-4 py-2 text-xl font-bold border border-blue-600 text-blue-950 rounded-xl duration-300 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:text-shadow-[1px_1px_2px_black]">
                            <IoIosSave />
                            <p>Salvar</p>
                        </button>
                        <button className="flex items-center justify-center text-center gap-2 px-4 py-2 text-xl font-bold border border-red-600 text-red-700 rounded-xl duration-300 transition-all cursor-pointer hover:bg-red-600 hover:text-white hover:text-shadow-[1px_1px_2px_black]">
                            <TbCancel />
                            <p>Cancelar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}