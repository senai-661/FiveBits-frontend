import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemPaciente(): JSX.Element {
    // Dados fictícios para visualização
    const pacientes = [
        { id: 1, cpf: "123.456.789-00", nome: "Enzo Cassão", email: "enzo@email.com", telefone: "(16) 99999-1111" },
        { id: 2, cpf: "987.654.321-11", nome: "Lívia Borges", email: "livia@email.com", telefone: "(16) 99999-2222" },
        { id: 3, cpf: "456.789.123-22", nome: "Jadson Santos", email: "jadson@email.com", telefone: "(16) 99999-3333" },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main style={{ flex: 1, padding: '40px 10%', backgroundColor: 'var(--cor-container)' }}>
                {/* Cabeçalho da Listagem */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: 'var(--cor-inspiracao)', fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Pacientes Cadastrados
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
                        + Novo Paciente
                    </button>
                </div>

                {/* Tabela de Pacientes */}
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
                                <th style={estiloCabecalho}>CPF</th>
                                <th style={estiloCabecalho}>NOME</th>
                                <th style={estiloCabecalho}>EMAIL</th>
                                <th style={estiloCabecalho}>TELEFONE</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente.id} className="linha-tabela" style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={estiloCelula}>{paciente.id}</td>
                                    <td style={estiloCelula}>
                                        <span style={{ backgroundColor: 'var(--cor-suave)', color: 'var(--cor-logo-primaria)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                            {paciente.cpf}
                                        </span>
                                    </td>
                                    <td style={estiloCelula}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--cor-telemed-botao)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {paciente.nome.charAt(0)}
                                            </div>
                                            {paciente.nome}
                                        </div>
                                    </td>
                                    <td style={estiloCelula}>{paciente.email}</td>
                                    <td style={estiloCelula}>{paciente.telefone}</td>
                                    <td style={estiloCelula}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button style={btnAcao}>Editar</button>
                                            <button style={{ ...btnAcao, color: 'var(--cor-botao-sair)' }}>Excluir</button>
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

// Estilos Reutilizáveis
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

export default PListagemPaciente;