'use client'
import { useProfissionais } from "@/hooks/useProfissionais";
import { EspecialidadeMedica, TipoExame, TipoProfissional } from "@prisma/client";
import { useState } from "react";
import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import { FaArrowsRotate, FaUserDoctor } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { TiClipboard } from "react-icons/ti";


export default function AdicionarProfissionalView() {
    const {profissionais} = useProfissionais()
    const [tipo, setTipo] = useState<TipoProfissional>(
        TipoProfissional.MEDICO
    )
    const [nome, setNome] = useState('')

    const [especialidade, setespecialidade] = useState('')
    const [listaDeEspecialidades, setListaDeEspecialidades] = useState<string[]>([])

    const [exame, setExame] = useState('')
    const [listaDeExames, setListaDeExames] = useState<string[]>([])


    function removerEspecialidade(index: number) {
        setListaDeEspecialidades(
            listaDeEspecialidades.filter((_, i) => i !== index)
        )
    }
    function removerExame(index: number) {
        setListaDeExames(
            listaDeExames.filter((_, i) => i !== index)
        )
    }
    function limpar() {
        setNome('')
        setListaDeEspecialidades([])
        setListaDeExames([])
    }

    async function salvar() {
        const dados = {
            nome,
            tipo,
            especialidades: listaDeEspecialidades,
            exames: listaDeExames
        }
        console.log(dados)
        const response = await fetch("/api/profissional", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        if (!response.ok) {
            const erro = await response.json()
            console.error(erro)
            return
        }
        const result = await response.json()
        limpar()
        console.log(result);
    }

    return (
        <div className="w-full min-h-screen font-oswald bg-zinc-200 text-black p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <div className="rounded-full p-2 text-blue-500 border border-zinc-400 text-3xl">
                    <FaUserDoctor />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl">Profissionais</h2>
                    <p>Cadastre, edite ou remova médicos e laboratórios disponíveis para atendimento.</p>
                </div>
            </div>
            <div className="border border-zinc-400 p-4 rounded-xl">
                <div className="flex items-center gap-2 border-b border-zinc-400 pb-2">
                    <div className="text-6xl font-bold">
                        <TiClipboard />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">Informação do Profissional</h3>
                        <span className="text-sm">Preencha os dados abaixo para cadastrar um novo profissional.</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="grid grid-cols-2 gap-3">
                            <span className="col-span-2">Tipo: <b className="text-red-600">*</b></span>
                            <button
                                type="button"
                                onClick={() => {
                                    setTipo("MEDICO")
                                    limpar()
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
                                    limpar()
                                }}
                                className={`h-12 rounded-lg border transition ${tipo === "LABORATORIO"
                                    ? "bg-green-600 text-white border-green-600"
                                    : "bg-white hover:bg-zinc-50"
                                    }`}
                            >
                                Laboratório
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span>Nome: <b className="text-red-600">*</b></span>
                        <input className="h-[35px] p-2 border border-zinc-400 rounded-lg" placeholder="Ex: Doutor Ramiro" type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        {
                            tipo === 'MEDICO' && (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="especialidades">Especialidades (Médico): <b className="text-red-600">*</b></label>
                                    <div className="flex items-center gap-2">
                                        <select className="h-[50px] p-2 border border-zinc-400 rounded-lg w-full" value={especialidade} onChange={(e) => setespecialidade(e.target.value)}>
                                            <option value="">Selecione</option>
                                            {Object.values(EspecialidadeMedica).map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="bg-blue-600 py-2 px-6 text-2xl rounded-xl text-white"
                                            onClick={() => {
                                                if (!especialidade) return;

                                                if (listaDeEspecialidades.includes(especialidade)) return;

                                                setListaDeEspecialidades([
                                                    ...listaDeEspecialidades,
                                                    especialidade
                                                ]);

                                                setespecialidade("");
                                            }}
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <ul className="flex flex-col gap-2">
                                            {
                                                listaDeEspecialidades.map(((especialidade, i) => {
                                                    return (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <p>
                                                                {especialidade}
                                                            </p>
                                                            <button onClick={() => removerEspecialidade(i)}>
                                                                <FaRegTrashAlt />
                                                            </button>
                                                        </li>
                                                    )
                                                }))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                        {
                            tipo === 'LABORATORIO' && (
                                <div>
                                    <label htmlFor="especialidades">Tipos de exames (Laboratório): <b className="text-red-600">*</b></label>
                                    <div className="flex items-center gap-2">
                                        <select className="h-[50px] p-2 border border-zinc-400 rounded-lg w-full" value={exame} onChange={(e) => setExame(e.target.value)}>
                                            <option value="">Selecione</option>s
                                            {Object.values(TipoExame).map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="bg-blue-600 py-2 px-6 text-2xl rounded-xl text-white"
                                            onClick={() => {
                                                if (!exame) return;

                                                if (listaDeExames.includes(exame)) return;

                                                setListaDeExames([
                                                    ...listaDeExames,
                                                    exame
                                                ]);

                                                setExame("");
                                            }}
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <ul className="flex flex-col gap-2">
                                            {
                                                listaDeExames.map(((exame, i) => {
                                                    return (
                                                        <li key={i} className="flex items-center justify-between">
                                                            <p>
                                                                {exame}
                                                            </p>
                                                            <button onClick={() => removerExame(i)}>
                                                                <FaRegTrashAlt />
                                                            </button>
                                                        </li>
                                                    )
                                                }))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <button className="flex items-center gap-1 text-2xl bg-blue-600 px-4 py-2 text-white rounded-xl">
                            <FaArrowsRotate />
                            <span>Limpar</span>
                        </button>
                        <button onClick={() => salvar()} className="flex items-center gap-1 text-2xl bg-blue-600 px-4 py-2 text-white rounded-xl">
                            <IoIosSave />
                            <span>Salvar</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border border-zinc-400 p-4 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-zinc-400 pb-2">
                    <div className="text-6xl font-bold">
                        <TiClipboard />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">Profissionais Cadastrados</h3>
                        <span className="text-sm">Lista de Médicos e Laboratórios Cadastrados.</span>
                    </div>
                </div>
                <div>
                    <ul className="grid grid-cols-[100px_140px_1fr_140px_100px] gap-4 border-b border-zinc-500 p-2">
                        <li>
                            <p>Tipo</p>
                        </li>
                        <li>
                            <p>Nome</p>
                        </li>
                        <li>
                            <p>Especialidade/Exames</p>
                        </li>
                        <li>
                            <p>Cidade</p>
                        </li>
                        <li>
                            <p>Ações</p>
                        </li>
                    </ul>
                    <ul>
                        {
                            profissionais.map((profissional, i) => {
                                return (
                                    <li key={i} className="grid grid-cols-[100px_140px_1fr_140px_100px] gap-4 border-b border-zinc-500 p-2">
                                        <div>
                                            <span>{profissional.tipo}</span>
                                        </div>
                                        <div>
                                            <span>{profissional.nome}</span>
                                        </div>
                                        <div className="flex flex-wrap leading-5">
                                            {
                                                profissional.especialidades.length > 0 ? profissional.especialidades.map((esp, i) => {
                                                    return (
                                                        <p key={i}>{esp.replaceAll('_', ' ')}</p>
                                                    )
                                                }) : ('')
                                            }
                                            {
                                                profissional.exames.length > 0 ? profissional.exames.map((esp, i) => {
                                                    return (
                                                        <p key={i}>{esp.replaceAll('_', ' ')}</p>
                                                    )
                                                }) : ('')
                                            }
                                        </div>
                                        <div>
                                            <span>Joaquim Távora - PR</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 border border-zinc-800 rounded-xl"><PiPencilSimpleLineFill /></button>
                                            <button className="p-2 border border-zinc-800 rounded-xl"><FaTrashAlt /></button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}