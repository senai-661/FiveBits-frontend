class Utilitario {
		// Formata a data no padrão DD/MM/AAAA
    formatarData(data: string | Date): string {
        return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
    }

		// formata o telefone no padrão (XX) X XXXX-XXXX ou (XX) XXXX-XXXX
    formatarTelefone(telefone: string): string {
        const nums = telefone.replace(/\D/g, "");  // remove qualquer caracter que não seja um número

        if(nums.length === 11) {
            return nums.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
        } else if(nums.length === 10) {
            return nums.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }

        return telefone;
    }

		// Formata moeda no valor Real BRL
    formatarParaReal(valor: number): string {
        return new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

		// Remove as informações de hora de um objeto Date
    formatarDataParaInput(data: string | Date | undefined): string {
        if(!data) return '';
        const d = new Date(data);
        return d.toISOString().split('T')[0];
    }

		// Valida um e-mail através de uma expressão regular
    validarEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

export default new Utilitario;