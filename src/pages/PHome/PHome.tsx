import type { JSX } from "react";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PHome(): JSX.Element {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao /> 
            
            <main className="main-wrapper" style={{ flex: 1 }}>
                <BoasVindas />
            </main>

            <Rodape />
        </div>
    );
}

export default PHome;