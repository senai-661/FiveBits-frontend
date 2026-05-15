import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import DetalhesConsulta from "../../components/Listagens/DetalhesConsulta/DetalhesConsulta";

function PDetalhesConsulta(): JSX.Element {
    const { id_consulta } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesConsulta id_consulta={Number(id_consulta)} />  {/* Envia o ID para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesConsulta;