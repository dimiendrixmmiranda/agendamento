"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Agendamento } from "@/hooks/useAgendamentos";

interface Props {
    agendamentos: Agendamento[];
}

export default function CarrosselProfissionais({ agendamentos }: Props) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={3}
            observer={true}
            observeParents={true}
            resizeObserver={true}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                1440: {
                    slidesPerView: 2,
                },
            }}
            className="w-full! row-start-2 row-end-3"
        >
            {agendamentos.map((prof) => (
                <SwiperSlide key={prof.id} className="w-full">
                    <div className="border border-zinc-400 rounded-xl p-5 shadow-sm hover:shadow-lg transition h-full w-full">
                        <div className="flex gap-2 items-center">
                            <div
                                className="rounded-full p-3 text-white text-2xl"
                                style={{
                                    backgroundColor: prof.corCalendario,
                                }}
                            >
                                {prof.tipo === "MEDICO"
                                    ? <FaUserDoctor />
                                    : <MdOutlineScience />}
                            </div>
                            <div>
                                <h2 className="font-bold text-xl capitalize line-clamp-1">
                                    {prof.nome}
                                </h2>
                                <p className="line-clamp-1">
                                    {
                                        prof.especialidades?.map((especialidade, i) => {
                                            return (
                                                `${especialidade.replaceAll('_', ' ')}, `
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <p className="font-semibold mb-2">
                                Dias de atendimento
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {prof.disponibilidades.map((disp) => (
                                    <span
                                        key={disp.id}
                                        className="px-3 py-1 rounded-lg bg-blue-400 text-white text-shadow-[1px_1px_2px_black]"
                                    >
                                        {new Date(disp.data).getDate()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-zinc-800">
                            <IoLocationOutline />
                            <span>
                                {prof.disponibilidades[0]?.local.nome}
                            </span>
                        </div>
                        <button
                            className="mt-6 w-full rounded-lg border border-blue-600 py-2 font-semibold bg-blue-600 text-white text-shadow-[1px_1px_2px_black]"
                        >
                            Ver detalhes
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}