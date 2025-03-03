// Função para formatar dataHora
export function formatarDataHora(dataHora) {
    // Verifica se dataHora é um array com 5 elementos [ano, mês, dia, hora, minuto]
    if (Array.isArray(dataHora) && dataHora.length === 5) {
        const [ano, mes, dia, hora, minuto] = dataHora;
        
        // Ajusta o mês, pois o mês no JavaScript começa com 0 (janeiro é 0, fevereiro é 1, ...)
        const data = new Date(ano, mes - 1, dia, hora, minuto); 
        
        // Verifica se a data é válida
        if (isNaN(data)) {
            return 'Data inválida';
        }

        // Formatação da data para dd/mm/yyyy hh:mm
        const diaFormatado = String(data.getDate()).padStart(2, '0');
        const mesFormatado = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam com 0
        const anoFormatado = data.getFullYear();
        const horasFormatadas = String(data.getHours()).padStart(2, '0');
        const minutosFormatados = String(data.getMinutes()).padStart(2, '0');

        return `${diaFormatado}/${mesFormatado}/${anoFormatado} ${horasFormatadas}:${minutosFormatados}`;
    }

    // Caso contrário, retorna 'Data inválida'
    return 'Data inválida';
}
