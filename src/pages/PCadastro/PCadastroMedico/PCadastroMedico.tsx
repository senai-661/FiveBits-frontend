import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormMedico from "../../../components/Formularios/FormMedico/FormMedico";

function PCadastroMedico(): JSX.Element {
    return (
        <div className="page-shell">
            <Navegacao />
            <main className="page-main">
                <FormMedico />
            </main>
            <Rodape />
        </div>
    );
}

export default PCadastroMedico;