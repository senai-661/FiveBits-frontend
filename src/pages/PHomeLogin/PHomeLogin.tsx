import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import CarrosselHome from "../../components/CarrosselHome/CarrosselHome";
import "./PHomeLogin.css";

function PHomeLogin(): JSX.Element {
    return (
        <div className="welcome-page">
            <Navegacao /> 
                        <main className="welcome-main">
                            <CarrosselHome />
            </main>
            <Rodape />
        </div>
    );
}

export default PHomeLogin;