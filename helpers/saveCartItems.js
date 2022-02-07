const saveCartItems = (key, products) => {
  localStorage.setItem(key, JSON.stringify(products));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
