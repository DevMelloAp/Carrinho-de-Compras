require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  expect.assertions(1);
  it('Verifica se fecthProducts é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch foi chamada', async  () => {
    expect.assertions(1);
    const dataResult = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();  
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async  () => {
    expect.assertions(1);
    const dataResult = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toBeCalledWith(url);  
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", o retorno da função é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async  () => {
    expect.assertions(1);
    const dataResult = await fetchProducts('computador');
    const expected = computadorSearch;
    expect.assertions(1);
    expect(dataResult).toBe(expected);  
  });

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem:"You must provide an url', async  () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));  
    }
  });


});
