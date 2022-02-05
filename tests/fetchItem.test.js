require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "MLB1615760527", a função fetch foi chamada', async  () => {
    expect.assertions(1);
    const dataResult = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();  
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async  () => {
    expect.assertions(1);
    const dataResult = await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toBeCalledWith(url);  
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", o retorno da função é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async  () => {
    expect.assertions(1);
    const dataResult = await fetchItem('MLB1615760527');
    const expected = item;
    expect.assertions(1);
    expect(dataResult).toBe(expected);  
  });

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem:"You must provide an url', async  () => {
    expect.assertions(1);
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));  
    }
  });
});
