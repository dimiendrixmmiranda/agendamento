'use client'

import { useState } from "react";
import Psiquiatria from "@/preparos/Psiquiatria";
import FolhaA4 from "../pdf/FolhaA4";
import Ortopedia from "@/preparos/Ortopedia";
import Mapa from "@/preparos/Mapa";
import Pedido from "@/preparos/Pedido";
import TesteDeEsforco from "@/preparos/TesteDeEsforco";
import Retorno from "@/preparos/Retorno";

type TipoPreparo = "PSIQUIATRIA" | "ORTOPEDIA" | "MAPA" | "PEDIDO" | 'TESTE-DE-ESFORCO' | 'RETORNO';

export default function AdicionarPreparoView() {

    const [preparoSelecionado, setPreparoSelecionado] =
        useState<TipoPreparo | null>(null);


    const [local, setLocal] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");

    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [dataDeNascimento, setDataDeNascimento] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [medico, setMedico] = useState("");
    const [dataDaUltimaConsulta, setDataDaUltimaConsulta] = useState("");
    const [retornarEm, setRetornarEm] = useState("");
    const [telefone, setTelefone] = useState("");
    const [semPreenchimento, setSemPreenchimento] = useState(true)


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
        PEDIDO: {
            componente: Pedido,
            porFolha: 6,
        },
        "TESTE-DE-ESFORCO": {
            componente: TesteDeEsforco,
            porFolha: 3,
        },
        RETORNO: {
            componente: Retorno,
            porFolha: 3,
        },
    }

    const preparo = preparoSelecionado
        ? PREPAROS[preparoSelecionado]
        : null;

    const paginas = preparo
        ? Array.from(
            {
                length: Math.ceil(Number(quantidade) / preparo.porFolha),
            },
            (_, pagina) => {
                const inicio = pagina * preparo.porFolha;
                const fim = Math.min(inicio + preparo.porFolha, Number(quantidade));

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
                <div className="grid grid-cols-4 gap-3">
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
                    <button
                        onClick={() => setPreparoSelecionado("TESTE-DE-ESFORCO")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "TESTE-DE-ESFORCO"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Teste de Esforço
                    </button>
                    <button
                        onClick={() => setPreparoSelecionado("PEDIDO")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "PEDIDO"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Pedido
                    </button>
                    <button
                        onClick={() => setPreparoSelecionado("RETORNO")}
                        className={`border rounded-lg h-12 transition ${preparoSelecionado === "RETORNO"
                            ? "bg-blue-600 text-white"
                            : ""
                            }`}
                    >
                        Retorno
                    </button>
                </div>
                {preparoSelecionado && preparoSelecionado === 'PSIQUIATRIA' && (
                    <div className="grid grid-cols-2 gap-4">
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
                                type="text"
                                inputMode="numeric"
                                value={quantidade}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12 col-span-2"
                        >
                            Gerar PDF
                        </button>
                    </div>
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
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
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
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
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
                {preparoSelecionado && preparoSelecionado === 'PEDIDO' && (
                    <>

                        <div className="flex flex-col gap-2">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={quantidade}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
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
                {preparoSelecionado && preparoSelecionado === 'TESTE-DE-ESFORCO' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 col-span-2">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={quantidade}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12 col-span-2"
                        >
                            Gerar PDF
                        </button>
                    </div>
                )}
                {preparoSelecionado && preparoSelecionado === 'RETORNO' && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="semPreenchimento"
                                checked={semPreenchimento}
                                onChange={(e) => setSemPreenchimento(e.target.checked)}
                            />

                            <label htmlFor="semPreenchimento">
                                Imprimir sem preenchimento
                            </label>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Nome:
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Endereço:
                            </label>
                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Data de nascimento:
                            </label>
                            <input
                                type="date"
                                value={dataDeNascimento}
                                onChange={(e) => setDataDeNascimento(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Especialidade:
                            </label>
                            <input
                                type="text"
                                value={especialidade}
                                onChange={(e) => setEspecialidade(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Medico:
                            </label>
                            <input
                                type="text"
                                value={medico}
                                onChange={(e) => setMedico(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Data da última consulta:
                            </label>
                            <input
                                type="date"
                                value={dataDaUltimaConsulta}
                                onChange={(e) => setDataDaUltimaConsulta(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Retornar em:
                            </label>
                            <input
                                type="text"
                                value={retornarEm}
                                onChange={(e) => setRetornarEm(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Telefone para Contato:
                            </label>
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>
                                Quantidade
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={quantidade}
                                onChange={(e) => {
                                    const valor = e.target.value.replace(/\D/g, "");
                                    setQuantidade(valor);
                                }}
                                className="border rounded-lg h-10 px-3"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={gerarPDF}
                            className="bg-green-600 text-white rounded-lg h-12 "
                        >
                            Gerar PDF
                        </button>
                    </div>
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
                    {preparoSelecionado === "PEDIDO" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina} classeEspecial="flex! flex-wrap! gap-0!">
                                {pagina.map((_, indice) => (
                                    <Pedido
                                        key={indice}
                                    />
                                ))}
                            </FolhaA4>
                        ))
                    }
                    {preparoSelecionado === "TESTE-DE-ESFORCO" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina} classeEspecial="flex! flex-wrap! gap-0!">
                                {pagina.map((_, indice) => (
                                    <TesteDeEsforco
                                        key={indice}
                                    />
                                ))}
                            </FolhaA4>
                        ))
                    }
                    {preparoSelecionado === "RETORNO" &&
                        paginas.map((pagina, indicePagina) => (
                            <FolhaA4 key={indicePagina}>
                                {pagina.map((_, indice) => (
                                    <Retorno
                                        nome={nome}
                                        endereco={endereco}
                                        dataDeNascimento={new Date(dataDeNascimento)}
                                        especialidade={especialidade}
                                        medico={medico}
                                        dataDaUltimaConsulta={new Date(dataDaUltimaConsulta)}
                                        retornarEm={retornarEm}
                                        telefone={telefone}
                                        semPreenchimento={semPreenchimento}
                                        key={indice}
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