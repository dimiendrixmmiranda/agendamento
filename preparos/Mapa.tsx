'use client'

import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";

interface Props {
    local: string
    data: string
    hora: string
}

export default function Mapa({ local, data, hora }: Props) {
    return (
        <div
            style={{
                width: "170mm",
                height: "100mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "8mm",
            }}
            className="relative flex flex-col gap-4 uppercase"
        >
            <div>
                <h3 className="text-xl font-bold">MAPA - (Monitorização Ambulatorial da Pressão Arterial)</h3>
                <span className="underline font-bold">Atendimento no Município</span>
            </div>
            <div>
                <p>Data: { data && new Date(data).toLocaleDateString()}</p>
                <p>Hora: {hora && `${hora}h`}</p>
            </div>
            <h2 className="text-xl font-bold">Local: {local}</h2>
            <div>
                <ul>
                    <li className="uppercase grid grid-cols-[auto_1fr] text-lg max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <span>Paciente vir de banho tomado</span>
                    </li>
                    <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-lg max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <span className="col-start-2 col-end-3 row-start-1 row-end-3">Se o paciente não puder comparecer ou não estiver precisando mais da consulta, favor avisar!</span>
                    </li>
                    <li className="uppercase grid grid-cols-[auto_1fr] text-lg max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <span>Em caso de desistência, <b>por favor avisar antes</b>!</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}