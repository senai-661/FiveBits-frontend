import { type JSX } from "react";

import Navegacao from "../../components/Navegacao/Navegacao";

import LoginForm from "../../components/Formularios/FormLogin/LoginForm";
import Rodape from "../../components/Rodape/Rodape";
import "./PLogin.css";




function PLogin(): JSX.Element {
    return (
        <div className="login-page">
      
            <Navegacao />
            <LoginForm />
            <Rodape/>
        </div>
    );
}

export default PLogin;
