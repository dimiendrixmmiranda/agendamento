interface Props {
    local: string;
    nomeDoLaboratorio: string
}

export default function UltrassonografiaDaArticulacao({ local, nomeDoLaboratorio }: Props) {
    return (
        <div
            style={{
                width: "180mm",
                height: "60mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "6mm",
            }}
            className="relative flex flex-col gap-3 text-black"
        >
            <h4>{nomeDoLaboratorio}</h4>
            <h3 className="text-xl font-bold">Local: {local}</h3>
            <p>
                COMUNICAMOS QUE O PACIENTE QUE NÃO PUDER COMPARECER NA DATA AGENDADA DEVERÁ AVISAR O AGENDAMENTO DO POSTO DE SAÚDE COM ANTECEDÊNCIA, POIS A FALTA INJUSTIFICADA <b className="underline">ACARRETARÁ O BLOQUEIO DO PACIENTE NO SISTEMA, FICANDO IMPEDIDO DE REALIZAR NOVOS AGENDAMENTOS DURANTE 30 DIAS.</b>
            </p>
        </div>
    );
}