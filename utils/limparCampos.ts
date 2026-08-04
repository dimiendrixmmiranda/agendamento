function limparCampo<T>(setValor: React.Dispatch<React.SetStateAction<T>>, valorPadrao: T) {
    setValor(valorPadrao);
}

export default function limparVariosCampos(
    campos: {
        setValor: React.Dispatch<React.SetStateAction<any>>;
        valorPadrao: any;
    }[]
) {
    campos.forEach(({ setValor, valorPadrao }) => {
        setValor(valorPadrao);
    });
}