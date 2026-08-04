import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const profissionais = await prisma.profissional.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        return NextResponse.json(profissionais);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Erro ao buscar profissionais." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {

        const body = await request.json();

        const {
            nome,
            tipo,
            especialidades,
            exames,
            restricoes
        } = body;

        const profissional = await prisma.profissional.create({
            data: {
                nome,
                tipo,
                especialidades,
                exames,
                restricoes
            }
        });

        return NextResponse.json(profissional, { status: 201 });

    } catch (error: any) {
    console.error("ERRO COMPLETO:");
    console.error(error);

    return NextResponse.json(
        {
            error: error.message,
            stack: error.stack
        },
        {
            status: 500
        }
    );
}
}