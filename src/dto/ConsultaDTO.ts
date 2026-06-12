export interface ConsultaDTO {
    idConsulta?: number;
    dataHora: Date;
    status?: 'Pendente' | 'Confirmado' | 'Cancelado' | 'Concluido';
    modalidade?: 'Pessoalmente' | 'Telemedicina';
    triagemSintomas: string;
    situacao?: boolean;

    paciente: {
        idPaciente: number;
        nome: string;
        cpf: string;
        telefone?: string;
        dataNascimento: Date;
        situacao?: boolean;
    };

    medico: {
        idMedico: number;
        nome: string;
        crm: string;
        especialidade: string;
        valorConsulta: number;
        situacao?: boolean;
    };
}