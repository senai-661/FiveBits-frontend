import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesMedico from "../../../components/Listagens/DetalhesMedico/DetalhesMedico";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesMedico(): JSX.Element {
    const { id_medico } = useParams();  // Recebe o ID do registro acessado

    return (
        <div className="page-shell">
            <Navegacao />
            <DetalhesMedico id_medico={Number(id_medico)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesMedico;
