import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesPaciente from "../../../components/Listagens/DetalhesPaciente/DetalhesPaciente";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesPaciente(): JSX.Element {
    const { id_paciente } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="page-shell">
            <Navegacao />
            <DetalhesPaciente id_paciente={Number(id_paciente)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesPaciente;
