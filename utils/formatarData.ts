import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatarData(data: Date) {
    return format(
        data,
        "EEEE, dd 'de' MMMM 'de' yyyy",
        {
            locale: ptBR,
        }
    );
}