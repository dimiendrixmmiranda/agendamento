interface Props {
    children: React.ReactNode;
    classeEspecial?: string
}

export default function FolhaA4({ children, classeEspecial }: Props) {
    return (
        <div
            className={`folha-a4 mx-auto ${classeEspecial}`}
            style={{
                width: "210mm",
                height: "297mm",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",

                background: "white",
            }}
        >
            {children}
        </div>
    );
}