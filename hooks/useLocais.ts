'use client'

import Locais from "@/types/Locais"
import { useEffect, useState } from "react"

export function useLocais() {

    const [locais, setLocais] = useState<Locais[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    async function buscarlocais() {
        try {
            setLoading(true)
            const response = await fetch("/api/locais")
            if (!response.ok) {
                throw new Error("Erro ao buscar locais")
            }
            const data = await response.json()
            setLocais(data)
        } catch (err) {
            console.error(err)
            setError("Erro ao carregar locais")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        buscarlocais()
    }, [])

    return {
        locais,
        loading,
        error,
        atualizar: buscarlocais
    }

}