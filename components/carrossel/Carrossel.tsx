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
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
                1600: {
                    slidesPerView: 4,
                },
            }}
        >
            {agendamentos.map((prof) => (
                <SwiperSlide key={prof.id}>
                    <div className="border border-zinc-400 rounded-xl p-5 shadow-sm hover:shadow-lg transition h-full">
                        <div className="flex gap-3 items-center">
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
                                <h2 className="font-bold text-xl capitalize">
                                    {prof.nome}
                                </h2>
                                <span className="text-zinc-500 capitalize">
                                    {prof.especialidade}
                                </span>
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
                                        className="px-3 py-1 rounded-lg bg-blue-100"
                                    >
                                        {new Date(disp.data).getDate()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-5 flex items-center gap-2 text-zinc-600">
                            <IoLocationOutline />
                            <span>
                                {prof.disponibilidades[0]?.local.nome}
                            </span>
                        </div>
                        <button
                            className="mt-6 w-full rounded-lg border border-blue-600 py-2 font-semibold text-blue-700 hover:bg-blue-700 hover:text-white transition"
                        >
                            Ver detalhes
                        </button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}