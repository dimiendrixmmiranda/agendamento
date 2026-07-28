'use client'

import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";

interface Props {
    nome: string,
    endereco: string
    dataDeNascimento: Date
    especialidade: string
    medico: string
    dataDaUltimaConsulta: Date
    retornarEm: string
    telefone: string
    semPreenchimento: boolean
}

export default function Retorno({ nome, endereco, dataDeNascimento, especialidade, medico, dataDaUltimaConsulta, retornarEm, telefone, semPreenchimento }: Props) {

    if (semPreenchimento) {
        return (
            <div
                style={{
                    width: "170mm",
                    height: "90mm",
                    border: "1px solid black",
                    boxSizing: "border-box",
                    padding: "8mm",
                }}
                className="relative flex flex-col gap-4 text-black font-oswald"
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-bold text-2xl">Solicitação de Retorno</h3>
                    </div>
                    <div className="text-xl flex flex-col gap-2">
                        <div className="flex items-end gap-1">
                            <span>Nome:</span>
                            <div className="w-full border-b border-black mb-1" />
                        </div>
                        <div className="flex items-end gap-1">
                            <span>Endereço:</span>
                            <div className="w-full border-b border-black mb-1" />
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-4">
                            <div className="flex items-end gap-1 relative">
                                <span className="whitespace-nowrap">Data de Nascimento:</span>
                                <div className="w-24 border-b border-black mb-1" />
                                <span className="absolute top-0 right-15">/</span>
                                <span className="absolute top-0 right-7">/</span>
                            </div>
                            <div className="flex items-end gap-1">
                                <span>Especialidade:</span>
                                <div className="w-full border-b border-black mb-1" />
                            </div>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4">
                            <div className="flex items-end gap-1">
                                <span>Médico:</span>
                                <div className="w-full border-b border-black mb-1" />
                            </div>
                            <div className="flex items-end gap-1 relative">
                                <span className="whitespace-nowrap">Data da Última Consulta:</span>
                                <div className="w-24 border-b border-black mb-1" />
                                <span className="absolute top-0 right-15">/</span>
                                <span className="absolute top-0 right-7">/</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="whitespace-nowrap">Retornar em:</span>
                            <div className="w-full border-b border-black mb-1" />
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="whitespace-nowrap">Telefone para Contato:</span>
                            <div className="w-full border-b border-black mb-1" />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                style={{
                    width: "170mm",
                    height: "90mm",
                    border: "1px solid black",
                    boxSizing: "border-box",
                    padding: "8mm",
                }}
                className="relative flex flex-col gap-4 text-black font-oswald"
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-bold text-2xl">Solicitação de Retorno</h3>
                    </div>
                    <div className="text-xl flex flex-col gap-2">
                        <div className="flex items-end gap-1 relative">
                            <span>Nome:</span>
                            <div className="w-full border-b border-black " />
                            <p className="absolute left-13">{nome}</p>
                        </div>
                        <div className="flex items-end gap-1">
                            <span>Endereço:</span>
                            <div className="w-full border-b border-black" />
                            <p className="absolute left-26">{endereco}</p>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-4">
                            <div className="flex items-end gap-1 relative">
                                <span className="whitespace-nowrap">Data de Nascimento:</span>
                                <div className="w-24 border-b border-black mb-1" />

                                <p className="absolute right-0">
                                    {dataDeNascimento.toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-end gap-1 relative">
                                <span>Especialidade:</span>
                                <div className="w-full border-b border-black" />
                                <p className="absolute left-27">{especialidade}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-4">
                            <div className="flex items-end gap-1relative">
                                <span>Médico:</span>
                                <div className="w-full border-b border-black" />
                                <p className="absolute left-23">{medico}</p>
                            </div>
                            <div className="flex items-end gap-1 relative">
                                <span className="whitespace-nowrap">Data da Última Consulta:</span>
                                <div className="w-24 border-b border-black mb-1" />

                                <p className="absolute right-0">
                                    {dataDaUltimaConsulta.toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-end gap-1 relative">
                            <span className="whitespace-nowrap">Retornar em:</span>
                            <div className="w-full border-b border-black" />
                            <p className="absolute left-26">{retornarEm}</p>
                        </div>
                        <div className="flex items-end gap-1 relative">
                            <span className="whitespace-nowrap">Telefone para Contato:</span>
                            <div className="w-full border-b border-black" />
                            <p className="absolute left-42">{telefone}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}