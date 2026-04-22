import { type JSX } from "react";

import Navegacao from "../../components/Navegacao/Navegacao";

import LoginForm from "../../components/Formularios/LoginForm";


function PLogin(): JSX.Element {
    return (
        <div className="pagina-grid">
      
            <Navegacao />


            <LoginForm />
        </div>
    );
}

export default PLogin;