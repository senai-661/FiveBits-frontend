import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormConsulta from "../../../components/Formularios/FormConsulta/FormConsulta";

function PCadastroConsulta(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormConsulta />
            <Rodape />
        </div>
    );
}

export default PCadastroConsulta;