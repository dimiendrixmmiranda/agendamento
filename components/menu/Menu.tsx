import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaPlus, FaRegCalendarPlus } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserAddFill } from "react-icons/ri";

interface MenuProps {
    pagina: "home" | "adicionar" | "adicionarLocal" | "adicionarProfissional" | 'adicionarPreparos';
    onChange: (pagina: "home" | "adicionar" | "adicionarLocal" | "adicionarProfissional" | "adicionarPreparos") => void;
}


export default function Menu({ pagina, onChange }: MenuProps) {
    return (
        <div className="bg-cinza w-full h-full p-4">
            <div className="flex items-center gap-2">
                <div className="text-6xl">
                    <FaRegCalendarPlus />
                </div>
                <div className="flex flex-col gap-2 justify-center font-bebas-neue mt-4.5">
                    <h2 className="text-4xl leading-5">Agenda <b className="text-blue-500">Saúde</b></h2>
                    <span className="leading-5">Dimi Endrix Martins Miranda</span>
                </div>
            </div>

            {/* Menu */}
            <div className="font-oswald mt-10">
                <ul className="flex flex-col gap-2">
                    <li>
                        <button onClick={() => onChange("home")} className={`flex items-center gap-2 text-xl p-3 rounded-xl transition-all duration-300 hover:bg-blue-600 w-full cursor-pointer ${pagina === 'home' ? 'bg-blue-600' : ''}`}>
                            <div>
                                <FaHome />
                            </div>
                            <div>
                                <h4>Home</h4>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange("adicionar")} className={`flex items-center gap-2 text-xl p-3 rounded-xl transition-all duration-300 hover:bg-blue-600 w-full cursor-pointer ${pagina === 'adicionar' ? 'bg-blue-600' : ''}`}>
                            <div>
                                <FaPlus />
                            </div>
                            <div>
                                <h4>Adicionar</h4>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange("adicionarLocal")} className={`flex items-center gap-2 text-xl p-3 rounded-xl transition-all duration-300 hover:bg-blue-600 w-full cursor-pointer ${pagina === 'adicionarLocal' ? 'bg-blue-600' : ''}`}>
                            <div>
                                <IoLocationSharp />
                            </div>
                            <div>
                                <h4>Adicionar Local</h4>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange("adicionarProfissional")} className={`flex items-center gap-2 text-xl p-3 rounded-xl transition-all duration-300 hover:bg-blue-600 w-full cursor-pointer ${pagina === 'adicionarProfissional' ? 'bg-blue-600' : ''}`}>
                            <div>
                                <RiUserAddFill />
                            </div>
                            <div>
                                <h4>Adicionar Profissional</h4>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onChange("adicionarPreparos")} className={`flex items-center gap-2 text-xl p-3 rounded-xl transition-all duration-300 hover:bg-blue-600 w-full cursor-pointer ${pagina === 'adicionarPreparos' ? 'bg-blue-600' : ''}`}>
                            <div>
                                <RiUserAddFill />
                            </div>
                            <div>
                                <h4>Preparos</h4>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}