import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormMedico from "../../../components/Formularios/FormMedico/FormMedico";

function PAtualizarMedico(): JSX.Element {
    const { id_medico } = useParams();

    return (
        <div className="page-shell">
            <Navegacao />
            <FormMedico idMedico={Number(id_medico)} />
            <Rodape />
        </div>
    );
}

export default PAtualizarMedico;
