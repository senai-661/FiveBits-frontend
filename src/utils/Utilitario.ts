class Utilitario {
    // Formata a data no padrão DD/MM/AAAA
    formatarData(data: string | Date): string {
        return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
    }

    // formata o telefone no padrão (XX) X XXXX-XXXX ou (XX) XXXX-XXXX
    formatarTelefone(telefone: string): string {
        const nums = telefone.replace(/\D/g, "").slice(0, 11);

        if (nums.length <= 2) {
            return nums;
        } else if (nums.length <= 6) {
            return nums.replace(/(\d{2})(\d+)/, "($1) $2");
        } else if (nums.length === 11) {
            return nums.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
        } else {
            return nums.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
    }

    formatarCpf(cpf: string): string {
        const nums = cpf.replace(/\D/g, "").slice(0, 11);

        if (nums.length <= 3) return nums;
        if (nums.length <= 6) return nums.replace(/(\d{3})(\d+)/, "$1.$2");
        if (nums.length <= 9) return nums.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

        return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    formatarCrm(crm: string): string {
        const valor = crm.replace(/[^\dA-Za-z]/g, "").toUpperCase();
        const numeros = valor.replace(/\D/g, "").slice(0, 6);
        const uf = valor.replace(/\d/g, "").slice(0, 2);

        return uf ? `${numeros}/${uf}` : numeros;
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
        if (!data) return '';
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