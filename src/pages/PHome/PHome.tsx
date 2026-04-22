import type { JSX } from "react";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PHome(): JSX.Element {
    return (
        <>
            <Navegacao /> {/* Fica no topo automaticamente */}
            
            <main className="main-wrapper">
                <BoasVindas />
            </main>

            <Rodape /> {/* Fica na base devido ao flex: 1 do main */}
        </>
    );
}

export default PHome;