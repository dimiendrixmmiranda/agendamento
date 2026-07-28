import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;
    const body = await request.json();

    const local = await prisma.localAtendimento.update({
        where: {
            id
        },
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
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.localAtendimento.delete({
            where: {
                id
            }
        });

        return NextResponse.json({
            message: "Local removido."
        });

    } catch (error: any) {
        console.error("ERRO COMPLETO:", error);

        return NextResponse.json(
            {
                error: error.message,
                code: error.code
            },
            {
                status: 500
            }
        );
    }
}