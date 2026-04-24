import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import InicialLogin from "../../components/InicialLogin/InicialLogin"; // O banner verde com avatar
import Rodape from "../../components/Rodape/Rodape";

function PHomeLogin(): JSX.Element {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao /> 
            <main style={{ flex: 1 }}>
                <InicialLogin />
            </main>
            <Rodape />
        </div>
    );
}

export default PHomeLogin;