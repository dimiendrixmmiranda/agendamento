import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function DELETE(
    request: Request,
    { params }: Props
) {
    try {
        const { id } = await params;

        await prisma.profissional.delete({
            where: {
                id
            }
        });

        return NextResponse.json({
            message: "Profissional removido com sucesso."
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Erro ao remover profissional."
            },
            {
                status: 500
            }
        );
    }
}