function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
  event.target.remove();
}    

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const itensListaSelected = document.querySelector('.items');

async function listaItens(item) {
  const fetchOfItems = await fetchProducts(item); 
  const resultList = fetchOfItems.results;
  await resultList.forEach((product) => {
    itensListaSelected.appendChild(createProductItemElement({       
      sku: product.id,
      name: product.title,
      image: product.thumbnail, 
      }));
  });
}  

const itemOfList = document.querySelector('.cart__items');

const cartItemsSaved = [];
const cartItem = async (event) => {
  const itemSelected = event.target.parentElement;
  const productSelected = getSkuFromProductItem(itemSelected);
  const resultFetch = await fetchItem(productSelected); 
  const productObject = { 
    sku: resultFetch.id, 
    name: resultFetch.title, 
    salePrice: resultFetch.price,
  };  
  cartItemsSaved.push(productObject);
  saveCartItems('cartItems', cartItemsSaved);
  itemOfList.appendChild(createCartItemElement(productObject));
};

const getCartOfLocalStorage = async () => {
  if (localStorage.length !== 0) {
    const resultado = getSavedCartItems('cartItems');
    await resultado.forEach((element) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${element.sku} | NAME: ${element.name} | PRICE: $${element.salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    itemOfList.appendChild(li);
    });  
 }
};

const emptyCart = () => {
  itemOfList.innerText = '';
  localStorage.removeItem('cartItems');
};

const buttonEmpty = document.querySelector('.empty-cart');
buttonEmpty.addEventListener('click', emptyCart);
 
window.onload = async () => {
  await listaItens('computador');
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((element) => element.addEventListener('click', cartItem));
  getCartOfLocalStorage();
};
