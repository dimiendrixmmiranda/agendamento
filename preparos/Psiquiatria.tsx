'use client'

import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";

interface Props {
    local: string;
}

export default function Psiquiatria({ local }: Props) {
    return (
        <div
            style={{
                width: "170mm",
                height: "80mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "8mm",
            }}
            className="relative flex flex-col gap-4 text-black"
        >
            <h1 className="underline text-lg">Psiquiatria - Dra Jéssika</h1>
            <strong className="underline italic font-bold text-2xl">
                Local: {local.toUpperCase()}
            </strong>
            <ul className="flex flex-col gap-4">
                <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-2xl max-w-[80%]">
                    <BiSolidRightArrow className="mx-auto my-auto" />
                    <p className="row-start-1 row-end-3 col-start-2 col-end-3 leading-6.5">Paciente trazer acompanhante na primeira consulta.</p>
                </li>
                <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-2xl">
                    <BiSolidRightArrow className="mx-auto my-auto" />
                    <p className="row-start-1 row-end-3 col-start-2 col-end-3 leading-6.5">Se o paciente não precisar ou não puder comparecer por favor avisar</p>
                </li>
            </ul>
            <div className="absolute top-2 right-4">
                <div className="relative w-[100px] h-[140px]">
                    <Image alt="Psiquiatria" src={'/assets/psiquiatria.png'} fill className="object-contain" />
                </div>
            </div>
        </div>
    );
}