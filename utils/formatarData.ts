import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function formatarData(data: string | Date) {
    return format(
        new Date(data),
        "EEEE, dd 'de' MMMM 'de' yyyy",
        {
            locale: ptBR
        }
    );

}