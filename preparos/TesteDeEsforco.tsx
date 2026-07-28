'use client'

import Image from "next/image";
import { BiSolidRightArrow } from "react-icons/bi";

export default function TesteDeEsforco() {
    return (
        <div
            style={{
                width: "170mm",
                height: "85mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "8mm",
            }}
            className="relative flex flex-col gap-4 text-black"
        >
            <div className="flex flex-col gap-2">
                <h3>PREPARO PARA O EXAME DE ESTEIRA</h3>
                <ul className="flex flex-col gap-2">
                    <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-2xl max-w-[80%]">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <p className="row-start-1 row-end-3 col-start-2 col-end-3 leading-6.5">Depilar os pelos do torax e abdomen.</p>
                    </li>
                    <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-2xl -mt-5">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <p className="row-start-1 row-end-3 col-start-2 col-end-3 leading-7">
                            PACIENTES <s className="underline">USAR TENIS</s>, calça ou bermuda confortável, para caminhar na esteira.
                        </p>
                    </li>
                    <li className="uppercase grid grid-cols-[auto_1fr] grid-rows-2 text-2xl">
                        <BiSolidRightArrow className="mx-auto my-auto" />
                        <p className="row-start-1 row-end-3 col-start-2 col-end-3 leading-6.5">
                            NÃO USAR CALÇAS JEANS, CALÇAS MUITO JUSTAS, BOTAS, SANDÁLIAS.
                        </p>
                    </li>
                </ul>
                <h4 className="italic underline text-center font-bold text-3xl">
                    Sem o preparo correto, não será realizado o exame.
                </h4>
            </div>
        </div>
    );
}