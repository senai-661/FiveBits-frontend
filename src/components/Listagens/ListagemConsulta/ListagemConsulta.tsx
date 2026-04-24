import { type JSX } from "react";
import { useState, useEffect } from "react";
import type { ConsultaDTO } from "../../../dto/ConsultaDTO";
import ConsultaRequest from "../../../fetch/ConsultaRequest";

// Certifique-se de que os caminhos das importações estão corretos
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function ListagemConsultas(): JSX.Element {
    const [consultas, setConsultas] = useState<ConsultaDTO[]>([]);

    useEffect(() => {
        const buscarConsultas = async () => {
            try {
                const listaDeConsultas = await ConsultaRequest.obterListaDeConsultas();
                setConsultas(listaDeConsultas);
            } catch (error) {
                console.error(`Erro ao buscar consultas. ${error}`);
            }
        }
        buscarConsultas();
    }, []);

    const formatarDataHora = (dataIso: string) => {
        const dataObj = new Date(dataIso);
        return {
            data: dataObj.toLocaleDateString('pt-BR'),
            hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        /* O container pai deve ser flex-column para empilhar Navegação, Conteúdo e Rodapé */
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            
            {/* 1. CABEÇALHO (Agora visível) */}
            <Navegacao />

            {/* 2. CONTEÚDO PRINCIPAL */}
            <main style={{ 
                flex: 1, 
                padding: '40px 10%', 
                backgroundColor: '#f4f7f6' // Cor de fundo suave para destacar a tabela
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h1 style={{ color: '#2c3e50', fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
                        Agenda de Consultas
                    </h1>
                    <button style={btnNovo}>+ Nova Consulta</button>
                </div>

                <div style={containerTabela}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', backgroundColor: '#f9f9f9' }}>
                                <th style={estiloCabecalho}>DATA / HORA</th>
                                <th style={estiloCabecalho}>PACIENTE</th>
                                <th style={estiloCabecalho}>MÉDICO</th>
                                <th style={estiloCabecalho}>TRIAGEM</th>
                                <th style={estiloCabecalho}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultas.map((consulta) => {
                                const { data, hora } = formatarDataHora( consulta.dataHora.toString());
                                return (
                                    <tr key={consulta.idConsulta} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={estiloCelula}>
                                            <div style={{ fontWeight: 'bold' }}>{data}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>às {hora}</div>
                                        </td>
                                        <td style={estiloCelula}>{consulta.paciente.nomePaciente}</td>
                                        <td style={estiloCelula}>{consulta.medico.nomeMedico}</td>
                                        <td style={estiloCelula}>
                                            <div style={estiloTriagem}>{consulta.triagemSintomas}</div>
                                        </td>
                                        <td style={estiloCelula}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={btnAcao}>Detalhes</button>
                                                <button style={{ ...btnAcao, color: '#E53E3E' }}>Cancelar</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* 3. RODAPÉ */}
            <Rodape />
        </div>
    );
}

// Estilos extraídos para manter o componente limpo
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

const containerTabela: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    border: '1px solid #e0e0e0'
};

const btnNovo: React.CSSProperties = {
    backgroundColor: '#3f4de3',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const btnAcao: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '0.8rem',
    cursor: 'pointer'
};

const estiloTriagem: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#666',
    maxWidth: '180px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

export default ListagemConsultas;