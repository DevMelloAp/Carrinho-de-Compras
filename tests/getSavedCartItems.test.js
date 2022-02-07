const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    const object = {
      name: "Fonte De Alimentação Para Pc Knup Kp-517 200w  Prata 110v/220v",
      salePrice: 68.07, 
      sku: "MLB2103783971"
    };
    
    localStorage.setItem('cartItems', JSON.stringify(object));  

    getSavedCartItems('cartItens', object);
    
    expect(localStorage.getItem).toHaveBeenCalled();  

  });

  it('Verifica se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');  
  });
});

