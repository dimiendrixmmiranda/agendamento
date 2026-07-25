'use client'

import { useState } from "react";
import Psiquiatria from "@/preparos/Psiquiatria";
import FolhaA4 from "../pdf/FolhaA4";
import Ortopedia from "@/preparos/Ortopedia";
import Mapa from "@/preparos/Mapa";

type TipoPreparo = "PSIQUIATRIA" | "ORTOPEDIA" | "MAPA";

export default function AdicionarPreparoView() {

    const [preparoSelecionado, setPreparoSelecionado] =
        useState<TipoPreparo | null>(null);


    const [local, setLocal] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");

    function gerarPDF() {
        window.print();
    }

    const PREPAROS: Record<
        TipoPreparo,
        {
            componente: React.ComponentType<any>;
            porFolha: number;
        }
    > = {
        PSIQUIATRIA: {
            componente: Psiquiatria,
            porFolha: 3,
        },
        ORTOPEDIA: {
            componente: Ortopedia,
            porFolha: 3,
        },
        MAPA: {
            componente: Mapa,
            porFolha: 2,
        },
    }

    const preparo = preparoSelecionado
        ? PREPAROS[preparoSelecionado]
        : null;

    const paginas = preparo
        ? Array.from(
            {
                length: Math.ceil(quantidade / preparo.porFolha),
            },
            (_, pagina) => {
                const inicio = pagina * preparo.porFolha;
                const fim = Math.min(inicio + preparo.porFolha, quantidade);

                return Array.from({ length: fim - inicio });
            }
        )
        : [];

    return (
        <div className="flex flex-col gap-6 p-6 font-oswald text-black">
            {/* ================= FORMULÁRIO ================= */}
            <div className="nao-imprimir border rounded-xl p-5 flex flex-col gap-5">
                <div>
                    <h2 className="text-2xl font-bold">
                        Gerar preparo
                    </h2>
                    <p>
                        Selecione o preparo e configure a impressão.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setPreparoSelecionado("PSIQUIATRIA")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "PSIQUIATRIA"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Psiquiatria - Dra. Jéssika
                    </button>
                    <button
                        onClick={() => setPreparoSelecionado("ORTOPEDIA")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "ORTOPEDIA"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Ortopedia
                    </button>
                    <button
                        onClick={() => setPreparoSelecionado("MAPA")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "MAPA"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Mapa
                    </button>
                </div>
                {preparoSelecionado && preparoSelecionado === 'PSIQUIATRIA' && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label>
                                Local
                            </label>
                            <input
                                className="border rounded-lg h-10 px-3"
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={quantidade}
                                onChange={(e) =>
                                    setQuantidade(Number(e.target.value))
                                }
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12"
                        >
                            Gerar PDF
                        </button>
                    </>
                )}
                {preparoSelecionado && preparoSelecionado === 'ORTOPEDIA' && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label>
                                Local
                            </label>
                            <input
                                className="border rounded-lg h-10 px-3"
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={quantidade}
                                onChange={(e) =>
                                    setQuantidade(Number(e.target.value))
                                }
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="data">Data:</label>
                            <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="data">Hora:</label>
                            <input type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12"
                        >
                            Gerar PDF
                        </button>
                    </>
                )}
                {preparoSelecionado && preparoSelecionado === 'MAPA' && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label>
                                Local
                            </label>
                            <input
                                className="border rounded-lg h-10 px-3"
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={quantidade}
                                onChange={(e) =>
                                    setQuantidade(Number(e.target.value))
                                }
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="data">Data:</label>
                            <input type="date" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="data">Hora:</label>
                            <input type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12"
                        >
                            Gerar PDF
                        </button>
                    </>
                )}
            </div>
            <div className="max-h-[300mm] overflow-scroll">
                {/* ================= PREVIEW ================= */}
                <div
                    id="preview"
                    className="bg-zinc-300 rounded-xl p-8 overflow-auto flex flex-col gap-8"
                >
                    {preparoSelecionado === "PSIQUIATRIA" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina}>
                                {pagina.map((_, indice) => (
                                    <Psiquiatria
                                        key={indice}
                                        local={local}
                                    />
                                ))}
                            </FolhaA4>
                        ))
                    }
                    {preparoSelecionado === "ORTOPEDIA" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina}>
                                {pagina.map((_, indice) => (
                                    <Ortopedia
                                        key={indice}
                                        local={local}
                                        data={data}
                                        hora={hora}
                                    />
                                ))}
                            </FolhaA4>
                        ))
                    }
                    {preparoSelecionado === "MAPA" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina}>
                                {pagina.map((_, indice) => (
                                    <Mapa
                                        key={indice}
                                        local={local}
                                        data={data}
                                        hora={hora}
                                    />
                                ))}
                            </FolhaA4>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}