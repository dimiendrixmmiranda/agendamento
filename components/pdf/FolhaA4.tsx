interface Props {
    children: React.ReactNode;
}

export default function FolhaA4({ children }: Props) {
    return (
        <div
            className="folha-a4 mx-auto"
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