import type { JSX } from "react";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";

 
function PHome(): JSX.Element {
    return (
        <>
            <Navegacao />
            <BoasVindas />
        </>
    );
}

export default PHome;