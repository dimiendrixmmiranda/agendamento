'use client'

import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";

interface Props {
    local: string
    data: string
    hora: string
}

export default function Ortopedia({ local, data, hora }: Props) {
    return (
        <div
            style={{
                width: "170mm",
                height: "80mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "8mm",
            }}
            className="relative flex flex-col gap-4 uppercase"
        >
            <div>
                <h3 className="underline">Consulta em ortopedia</h3>
                <h4 className="underline font-bold">Profissional: Doutor Bruno</h4>
            </div>
            <div>
                <p>Data: { data && new Date(data).toLocaleDateString()}</p>
                <p>Hora: {hora && `${hora}h`}</p>
                <p className="font-bold">Local: {local}</p>
            </div>
            <div>
                <ul>
                    <li className="uppercase grid grid-cols-[auto_1fr] text-lg max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <span>Trazer Exames, se tiver!</span>
                    </li>
                    <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-lg max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <span className="col-start-2 col-end-3 row-start-1 row-end-3">Se o paciente não puder comparecer ou não estiver precisando mais da consulta, favor avisar!</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}