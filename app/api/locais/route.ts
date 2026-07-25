import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const locais = await prisma.localAtendimento.findMany({
        orderBy: {
            nome: "asc"
        }
    });

    return NextResponse.json(locais);
}

export async function POST(request: Request) {
    try {

        const body = await request.json();

        const local = await prisma.localAtendimento.create({
            data: {
                nome: body.nome,
                slug: body.slug,
                telefone: body.telefone,
                rua: body.rua,
                numero: body.numero,
                bairro: body.bairro,
                pontoDeReferencia: body.pontoDeReferencia,
                observacao: body.observacao
            }
        });

        return NextResponse.json(local);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { erro: "Erro ao cadastrar local." },
            { status: 500 }
        );
    }
}