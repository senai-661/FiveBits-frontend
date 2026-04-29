import { type JSX } from "react";

import Navegacao from "../../components/Navegacao/Navegacao";

import LoginForm from "../../components/Formularios/LoginForm";
import Rodape from "../../components/Rodape/Rodape";




function PLogin(): JSX.Element {
    return (
        <div className="pagina-grid">
      
            <Navegacao />
            <LoginForm />
            <Rodape/>
        </div>
    );
}

export default PLogin;