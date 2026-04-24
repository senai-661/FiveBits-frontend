// Classe responsável por fazer requisições à API - paciente
class PacienteRequests {
    private serverURL;
    private endpointPaciente;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointPaciente = `/api/pacientes`;
    }

    async obterListaDePacientes() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPaciente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(respostaAPI.ok) {
                const listaDePacientes = await respostaAPI.json();
                return listaDePacientes;
            } else {
                throw new Error("Não foi possível listar os pacientes.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de pacientes. ${error}`);
            return;
        }
    }
}

export default new PacienteRequests;