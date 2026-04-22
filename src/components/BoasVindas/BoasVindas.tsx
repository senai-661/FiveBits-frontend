import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="bg-gray-200 h-[76vh]">
            <h1 className="text-[3rem] pt-20" style={{ textAlign: 'center' }}>MedFlow</h1>

            <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                Seja bem-vindo ao MedFlow.
            </p>
        </main>
    );
}

export default BoasVindas;