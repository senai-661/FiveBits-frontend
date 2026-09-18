import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormConsulta from "../../../components/Formularios/FormConsulta/FormConsulta";

function PAtualizarConsulta(): JSX.Element {
    const { id_consulta } = useParams();

    return (
        <div className="page-shell">
            <Navegacao />
            <FormConsulta idConsulta={Number(id_consulta)} />
            <Rodape />
        </div>
    );
}

export default PAtualizarConsulta;
