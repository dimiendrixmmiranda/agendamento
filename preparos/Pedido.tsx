'use client'
export default function Pedido() {
    return (
        <div
            style={{
                width: "100mm",
                height: "80mm",
                border: "1px solid black",
                boxSizing: "border-box",
                padding: "8mm",
            }}
            className="relative flex flex-col gap-4 text-black"
        >
            <div className="flex flex-col gap-1">
                <h2 className="uppercase font-bold text-xl">Pedido</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-end gap-1">
                        <span>Nome:</span>
                        <div className="h-[0.5px] w-full border-b border-black mb-1" />
                    </div>
                    <div className="flex gap-8">
                        <div className="flex items-end gap-1 relative">
                            <span>DN:</span>
                            <div className="flex items-center gap-6 ml-6">
                                <p>/</p>
                                <p>/</p>
                            </div>
                            <div className="h-[1px] w-21 border-b border-black mb-1 absolute bottom-0 left-6" />
                        </div>
                        <div className="flex items-end gap-1 w-full">
                            <span>Contato:</span>
                            <div className="h-[0.5px] w-full border-b border-b mb-1" />
                        </div>
                    </div>
                    <div className="flex items-end gap-1 w-full">
                        <span>Especialidade:</span>
                        <div className="h-[0.5px] w-full border-b border-b mb-1" />
                    </div>
                    <div className="flex items-end gap-1 relative">
                        <span>Última vez que passou:</span>
                        <div className="relative">
                            <div className="flex items-center gap-6 ml-6">
                                <p>/</p>
                                <p>/</p>
                            </div>
                            <div className="h-[1px] w-21 border-b border-black mb-1 absolute bottom-0 left-0" />
                        </div>
                    </div>
                    <div className="flex items-end gap-2 w-full">
                        <span>Exames Prontos:</span>
                        <div className="w-4 h-4 border border-black mb-1" />
                    </div>
                    <div className="flex flex-col gap-6 w-full h-full">
                        <div className="flex items-end gap-2 w-full h-full">
                            <span>Observação:</span>
                            <div className="h-[0.5px] w-full border-b border-black mb-1" />
                        </div>
                        <div className="h-4">
                            <div className="h-[0.5px] w-full border-b border-black mb-1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}