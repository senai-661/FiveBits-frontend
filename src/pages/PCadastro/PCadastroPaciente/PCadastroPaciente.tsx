import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormPaciente from "../../../components/Formularios/FormPaciente/FormPaciente";

function PCadastroPaciente(): JSX.Element {
    return (
        <div className="page-shell">
            <Navegacao />
            <main className="page-main">
                <FormPaciente />
            </main>
            <Rodape />
        </div>
    );
}

export default PCadastroPaciente;