export const getFamilias = async (pagina, itensPorPagina) => {
    const response = await fetch(`/api/familias?page=${pagina}&size=${itensPorPagina}`);
    return response.json();
};

export const getFamiliasByName = async (name) => {
    const response = await fetch(`/api/familias?nome=${name}`);
    return response.json();
};6

export const getFamiliaById = async (id) => {
    const response = await fetch(`/api/familias/${id}`);
    return response.json();
};