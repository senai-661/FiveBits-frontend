import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import CarrosselHome from "../../components/CarrosselHome/CarrosselHome";
import "./PHomeLogin.css";

function PHomeLogin(): JSX.Element {
    return (<>
        <Navegacao />
        <div className="welcome-page">
            <main className="welcome-main">
                <CarrosselHome />
            </main>
            <Rodape />
        </div>
    </>);
}

export default PHomeLogin;