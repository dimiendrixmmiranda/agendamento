import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

    try {

        const body = await req.json();

        console.log("BODY RECEBIDO:", body);

        const {
            tipo,
            nome,
            especialidades,
            descricao,
            corCalendario,
            disponibilidades
        } = body;


        const agendamento = await prisma.agendamento.create({

            data: {

                tipo,
                nome,
                especialidades,
                descricao,
                corCalendario,

                disponibilidades: {
                    create: disponibilidades.map((item: any) => ({

                        data: new Date(item.data),

                        localId: item.localId,

                        horarios: {
                            create: item.horario.map((hora: any) => ({
                                inicio: hora.inicio,
                                fim: hora.fim
                            }))
                        }

                    }))
                }

            },

            include: {
                disponibilidades: {
                    include: {
                        local: true,
                        horarios: true
                    }
                }
            }

        });


        return NextResponse.json(agendamento);


    } catch (error) {

        console.error("ERRO AGENDAMENTO:", error);

        return NextResponse.json(
            {
                erro: error instanceof Error ? error.message : error
            },
            {
                status: 500
            }
        );
    }
}


export async function GET() {

    try {

        const agendamentos = await prisma.agendamento.findMany({

            orderBy: {
                createdAt: "desc"
            },

            include: {

                disponibilidades: {

                    include: {

                        local: true,

                        horarios: true

                    }

                }

            }

        });


        return NextResponse.json(agendamentos);


    } catch (error) {

        console.error("ERRO AO BUSCAR AGENDAMENTOS:", error);

        return NextResponse.json(
            {
                erro: "Erro ao buscar agendamentos"
            },
            {
                status: 500
            }
        );

    }

}