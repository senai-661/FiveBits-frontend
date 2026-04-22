import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemMedico(): JSX.Element {
    // Dados fictícios de médicos para visualização
    const medicos = [
        { id: 1, crm: "12345-SP", nome: "Dr. Gabriel Henrique", especialidade: "Cardiologia", email: "gabriel@medflow.com" },
        { id: 2, crm: "67890-SP", nome: "Dra. Lívia Borges", especialidade: "Pediatria", email: "livia@medflow.com" },
        { id: 3, crm: "11223-SP", nome: "Dr. Ismael Henrique", especialidade: "Clínico Geral", email: "ismael@medflow.com" },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main style={{ flex: 1, padding: '40px 10%', backgroundColor: 'var(--cor-container)' }}>
                {/* Cabeçalho da Listagem */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: 'var(--cor-inspiracao)', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Corpo Clínico (Médicos)
                    </h1>
                    <button style={{ 
                        backgroundColor: 'var(--cor-botao-sucesso)', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        + Cadastrar Médico
                    </button>
                </div>

                {/* Tabela de Médicos */}
                <div style={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', backgroundColor: '#f9f9f9' }}>
                                <th style={estiloCabecalho}>ID</th>
                                <th style={estiloCabecalho}>CRM</th>
                                <th style={estiloCabecalho}>NOME</th>
                                <th style={estiloCabecalho}>ESPECIALIDADE</th>
                                <th style={estiloCabecalho}>CONTATO</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map((medico) => (
                                <tr key={medico.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={estiloCelula}>{medico.id}</td>
                                    <td style={estiloCelula}>
                                        <span style={{ backgroundColor: '#E8F7FE', color: '#3F4DE3', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            {medico.crm}
                                        </span>
                                    </td>
                                    <td style={estiloCelula}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {medico.nome.split(' ')[1].charAt(0)}
                                            </div>
                                            {medico.nome}
                                        </div>
                                    </td>
                                    <td style={estiloCelula}>
                                        <em style={{ color: '#666' }}>{medico.especialidade}</em>
                                    </td>
                                    <td style={estiloCelula}>{medico.email}</td>
                                    <td style={estiloCelula}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={btnAcao}>Perfil</button>
                                            <button style={{ ...btnAcao, color: 'var(--cor-botao-sair)' }}>Remover</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <Rodape />
        </div>
    );
}

// Estilos Reutilizáveis (Mantendo a padronização do MedFlow)
const estiloCabecalho: React.CSSProperties = {
    padding: '16px',
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const estiloCelula: React.CSSProperties = {
    padding: '16px',
    fontSize: '0.95rem',
    color: '#333'
};

const btnAcao: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '0.8rem',
    cursor: 'pointer'
};

export default PListagemMedico;