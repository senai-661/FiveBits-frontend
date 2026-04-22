// Classe responsável por fazer requisições à API - consulta
class ConsultaRequests {
    private serverURL;
    private endpointConsulta;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointConsulta = `/api/consultas`;
    }

    async obterListaDeConsultas() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointConsulta}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if(respostaAPI.ok) {
                const listaDeConsultas = await respostaAPI.json();
                return listaDeConsultas;
            } else {
                throw new Error("Não foi possível listar as consultas.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de consultas. ${error}`);
            return;
        }
    }
}

export default new ConsultaRequests;