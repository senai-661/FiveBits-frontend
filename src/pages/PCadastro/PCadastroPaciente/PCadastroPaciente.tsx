import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormPaciente from "../../../components/Formularios/FormPaciente/FormPaciente";

function PCadastroPaciente(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormPaciente />
            <Rodape />
        </div>
    );
}

export default PCadastroPaciente;