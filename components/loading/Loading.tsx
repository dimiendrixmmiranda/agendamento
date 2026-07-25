export default function Loading(){

    return(

        <div className="flex items-center justify-center h-full">

            <div className="flex flex-col items-center gap-4">

                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"/>

                <h2 className="text-xl font-bold">
                    Carregando...
                </h2>

            </div>

        </div>

    )

}