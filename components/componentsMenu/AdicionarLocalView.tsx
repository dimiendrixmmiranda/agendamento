import { useDialog } from "@/hooks/useDialog";
import { useLocais } from "@/hooks/useLocais";
import gerarSlug from "@/utils/GerarSlug";
import { useState } from "react";
import { BsDistributeVertical } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowsRotate, FaRegBuilding, FaRoad } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosSave } from "react-icons/io";
import { IoLocation, IoLocationSharp } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { PiBuildingsFill } from "react-icons/pi";
import { TbHexagonNumber8Filled } from "react-icons/tb";

export default function AdicionarLocalView() {
    const { confirm } = useDialog();

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [pontoDeReferencia, setPontoDeReferencia] = useState('')
    const [observacao, setObservacao] = useState('')

    const {
        locais,
        loading,
        atualizar
    } = useLocais();

    async function salvar() {
        const dados = {
            nome,
            slug: gerarSlug(nome),
            telefone,
            rua,
            numero,
            bairro,
            pontoDeReferencia,
            observacao
        }

        const response = await fetch("/api/locais", {
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
        limpar()
        console.log(result);
    }

    const limpar = () => {
        setNome('')
        setTelefone('')
        setRua('')
        setNumero('')
        setBairro('')
        setPontoDeReferencia('')
        setObservacao('')
    }

    async function removerLocal(id: string) {
        try {
            const response = await fetch(`/api/locais/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            atualizar();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full min-h-screen font-oswald bg-zinc-200 text-black p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
                <div className="rounded-full p-2 text-blue-500 border border-zinc-400 text-3xl">
                    <IoLocationSharp />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl">Locais de Atendimento</h2>
                    <p>Cadastre, edite ou remova os locais onde os profissionais realizam atendiementos.</p>
                </div>
            </div>
            <div className="border border-zinc-400 p-4 rounded-xl">
                <h3 className="font-bold text-xl">Adicionar Local</h3>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        window.location.reload()
                        salvar()
                    }}
                    onReset={(e) => {
                        e.preventDefault()
                        limpar()
                    }}
                >
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="nome">Nome do Local</label>
                        <div className="relative">
                            <FaRegBuilding className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                            <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="telefone">Telefone</label>
                        <div className="relative">
                            <MdOutlinePhone className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                            <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="telefone" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 w-full gap-x-4 gap-y-2">
                        <div className="col-span-3 text-xl font-bold">
                            <h4>Endereço:</h4>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="rua">Rua:</label>
                            <div className="relative">
                                <FaRoad className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                                <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="rua" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="numero">Número</label>
                            <div className="relative">
                                <TbHexagonNumber8Filled className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                                <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="numero" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="bairro">Bairro:</label>
                            <div className="relative">
                                <BsDistributeVertical className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                                <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="bairro" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full col-span-3">
                            <label htmlFor="pontoDeReferencia">Ponto de Referência:</label>
                            <div className="relative">
                                <FaRegBuilding className="absolute top-[50%] left-2 text-xl" style={{ transform: 'translate(0,-50%)' }} />
                                <input className="h-[40px] border border-zinc-400 rounded-xl pl-8 w-full" type="text" name="pontoDeReferencia" id="pontoDeReferencia" value={pontoDeReferencia} onChange={(e) => setPontoDeReferencia(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="observacao">Observação</label>
                        <div className="relative">
                            <PiBuildingsFill className="absolute top-3 left-2 text-xl" />
                            <textarea className="h-[180px] border border-zinc-400 rounded-xl pl-8 w-full py-2" name="observacao" id="observacao" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-[auto_auto] w-fit ml-auto gap-4">
                        <button type="reset" className="flex items-center gap-1 text-xl font-bold border border-zinc-400 p-2 rounded-xl w-fit bg-blue-500 text-white text-shadow-[1px_1px_2px_black]">
                            <FaArrowsRotate />
                            <span>Limpar</span>
                        </button>
                        <button type="submit" className="flex items-center gap-1 text-xl font-bold border border-zinc-400 p-2 rounded-xl w-fit bg-blue-500 text-white text-shadow-[1px_1px_2px_black]">
                            <IoIosSave />
                            <span>Salvar Local</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className="border border-zinc-400 p-4 rounded-xl flex flex-col gap-4">
                <div>
                    <h3 className="font-bold text-xl">Lista de Locais Cadastrados</h3>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <ul className="grid grid-cols-[320px_1fr_150px_100px] gap-2 w-full">
                        <li>
                            <h4>Local</h4>
                        </li>
                        <li>
                            <h4>Endereço</h4>
                        </li>
                        <li>
                            <h4>Telefone</h4>
                        </li>
                        <li className="flex items-center justify-center">
                            <h4>Ações</h4>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-2 w-full">
                        {
                            locais.map((local) => {
                                return (
                                    <li key={local.id} className="grid grid-cols-[320px_1fr_150px_100px] gap-2">
                                        {/* local */}
                                        <div className="flex items-center gap-2">
                                            <div className="rounded-full p-2 bg-blue-200 text-blue-900 text-2xl">
                                                <FaRegBuilding />
                                            </div>
                                            <div>
                                                <div className="text-lg leading-5">
                                                    <h3>{local.nome}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Endereço */}
                                        <div className="grid grid-rows-2 grid-cols-[auto_1fr] gap-1">
                                            <div className="row-span-2 flex w-full h-full justify-center items-center text-xl">
                                                <IoLocation />
                                            </div>
                                            <div className="row-span-2 flex flex-col">
                                                <h4>{local.rua}, {local.numero}</h4>
                                                <span className="text-xs">{local.bairro} - Joaquim Távora/PR</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-full flex items-center">
                                            <p>{local.telefone}</p>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="border border-amber-500 p-2 rounded-xl text-amber-500">
                                                <HiOutlinePencilSquare />
                                            </button>
                                            <button
                                                className="border border-red-500 p-2 rounded-xl text-red-500"
                                                onClick={() => {
                                                    confirm({
                                                        title: "Remover local",
                                                        message: `Deseja realmente remover o local "${local.nome}"?`,
                                                        confirmText: "Remover",
                                                        cancelText: "Cancelar",
                                                        onConfirm: () => removerLocal(local.id)
                                                    });
                                                }}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
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