const criarFamilia = async (familiaData) => {
    try{
        const response = await fetch('/familias/save', familiaData);
        console.log('Familia criada com sucesso!', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(familiaData),
        });

        if(!response.ok) {
            throw new Error('Erro ao criar familia')
        }

        const data = await response.json();
        console.log('Familia cadastrada com sucesso', data)
        return data;
    } catch(error) {
        console.error('Erro ao criar familia:', error);
        throw error;
    }
};

export const getFamilias = async (page, itensPorPagina) => {
    const response = await fetch(`http://localhost:8080/familias/findAll?page=${page}&size=${itensPorPagina}`);
    return response.json();
};

export const getFamiliasByName = async (name) => {
    const response = await fetch(`/familias/findByName?nome=${name}`);
    if(!response.ok)  {
        throw new Error("Erro ao buscar familias por nome");
    }
    return response.json();
};6

export const getFamiliaById = async (id) => {
    const response = await fetch(`/familias/findById${id}`);
    return response.json();
};