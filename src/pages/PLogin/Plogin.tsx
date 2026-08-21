import { type JSX } from "react";

import Navegacao from "../../components/Navegacao/Navegacao";

import LoginForm from "../../components/Formularios/FormLogin/LoginForm";
import Rodape from "../../components/Rodape/Rodape";




function PLogin(): JSX.Element {
    return (
        <div className="page-shell">
            <Navegacao />
            <main className="page-main">
                <LoginForm />
            </main>
            <Rodape />
        </div>
    );
}

export default PLogin;