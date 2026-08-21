import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import BoasVindas from "../../components/BoasVindas/BoasVindas"; // O banner verde com avatar
import CardsServicos from "../../components/CardsServicos/CardsServicos"; // Os cards estilo Sermed
import Rodape from "../../components/Rodape/Rodape";
import CarrosselHome from "../../components/CarrosselHome/CarrosselHome";
import HomeFuncionalidades from "../../components/HomeFuncionalidades/HomeFuncionalidades";
import "./PHome.css";



function PHome(): JSX.Element {
    return (
        <div className="home-page">
            <Navegacao /> 
            <main className="home-main">
                <BoasVindas />
                <CarrosselHome />
                <HomeFuncionalidades />
                <CardsServicos />
            </main>
            <Rodape />
        </div>
    );
}

export default PHome;