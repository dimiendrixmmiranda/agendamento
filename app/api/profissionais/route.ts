import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            tipo,
            nome,
            especialidade,
            descricao,
            corCalendario,
            disponibilidades
        } = body;

        const profissional = await prisma.$transaction(async (tx) => {

            const novoProfissional = await tx.profissional.create({
                data: {
                    tipo: tipo.toUpperCase(), // MEDICO | LABORATORIO
                    nome,
                    especialidade,
                    descricao,
                    corCalendario
                }
            });

            for (const disponibilidade of disponibilidades) {

                const local = await tx.localAtendimento.upsert({
                    where: {
                        nome: disponibilidade.local
                    },
                    update: {},
                    create: {
                        nome: disponibilidade.local
                    }
                });

                await tx.disponibilidade.create({

                    data: {
                        profissionalId: novoProfissional.id,
                        data: new Date(disponibilidade.data),
                        localId: local.id,
                        horarios: {

                            create: disponibilidade.horario.map(
                                (horario: { inicio: string; fim: string }) => ({
                                    inicio: horario.inicio,
                                    fim: horario.fim
                                })
                            )

                        }

                    }

                });

            }

            return novoProfissional;

        });

        return NextResponse.json(
            {
                message: "Profissional cadastrado com sucesso",
                profissional
            },
            {
                status: 201
            }
        );

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Erro ao cadastrar profissional"
            },
            {
                status: 500
            }
        );

    }
}

export async function GET() {
    try {
        const profissionais = await prisma.profissional.findMany({
            include: {
                disponibilidades: {
                    include: {
                        local: true,
                        horarios: true
                    }
                }
            },
            orderBy: {
                nome: "asc"
            }
        });

        return NextResponse.json(profissionais);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Erro ao buscar profissionais" },
            { status: 500 }
        );
    }
}