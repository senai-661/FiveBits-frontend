import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import BoasVindas from "../../components/BoasVindas/BoasVindas"; // O banner verde com avatar
import CardsServicos from "../../components/CardsServicos/CardsServicos"; // Os cards estilo Sermed
import Rodape from "../../components/Rodape/Rodape";



function PHome(): JSX.Element {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao /> 
            <main style={{ flex: 1 }}>
                <BoasVindas />
                <CardsServicos />
            </main>
            <Rodape />
        </div>
    );
}

export default PHome;