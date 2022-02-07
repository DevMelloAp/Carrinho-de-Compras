const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('cartItems', 'Item');
    expect(localStorage.setItem).toHaveBeenCalled();  
  });

  it('Verifica se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('cartItems', 'Item');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('Item'));
  });

});
