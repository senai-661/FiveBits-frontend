import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";
import DetalhesConsulta from "../../../components/Listagens/DetalhesConsulta/DetalhesConsulta";

function PDetalhesConsulta(): JSX.Element {
    const { id_consulta } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="page-shell">
            <Navegacao />
            <DetalhesConsulta id_consulta={Number(id_consulta)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesConsulta;
