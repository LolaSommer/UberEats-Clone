const basketIcon = document.querySelector('.header__basket-icon');
const cartModal = document.querySelector('.modal__cart');
const modalClose = document.querySelector('.modal__close');
function openModal() {
  cartModal.classList.add('active');
    renderCart();  
    document.removeEventListener('mousedown', handleOutsideClick);
}
//закрытие по клику вне корзины
function handleOutsideClick(e) {
  const target = e.target;
  const inside = target.closest('.modal__cart');
  const onIcon = target.closest('.header__basket-icon');

  if (!inside && !onIcon) {
    closeModal();
    document.addEventListener('mousedown', handleOutsideClick);

  }
}


basketIcon.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});
function closeModal() {
  cartModal.classList.remove('active');
  cartModal.setAttribute('aria-hidden','true');

}
//закрытие корзины
const modalTriggers = [modalClose];
modalTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal());
});
//генерация товара в корзине
const generateCartItem = (item) => {

   return `  <div class="modal__wrapper">
   <div class="modal__counter">
  <select class="cart__select" data-title="${item.title}">
    <option value="1" ${item.quantity === 1 ? 'selected' : ''}>1</option>
  <option value="2" ${item.quantity === 2 ? 'selected' : ''}>2</option>
  <option value="3" ${item.quantity === 3 ? 'selected' : ''}>3</option>
  <option value="4" ${item.quantity === 4 ? 'selected' : ''}>4</option>
  <option value="5" ${item.quantity === 5 ? 'selected' : ''}>5</option>
  <option value="6" ${item.quantity === 6 ? 'selected' : ''}>6</option>
  <option value="7" ${item.quantity === 7 ? 'selected' : ''}>7</option>
  <option value="8" ${item.quantity === 8 ? 'selected' : ''}>8</option>
  <option value="9" ${item.quantity === 9 ? 'selected' : ''}>9</option>
  <option value="10" ${item.quantity === 10 ? 'selected' : ''}>10</option>
    <option value="удалить">удалить</option>
  </select>
</div>

<div class="modal__title">${item.title}</div>
<div class="modal__price">${(item.price * item.quantity).toFixed(2)}₽</div>
         
                   </div> `
                  }
//стейты
const cartItems = [
  { title: 'Сельдь на бородинском хлебе', price: 240 },
  { title: 'Грибы маринованные', price: 300 },
  { title: 'Малосольная семга', price: 390 },
  { title: 'Соленья ассорти', price: 320 },
  { title: 'Сало домашнее с горчицей', price: 320 },
  { title: 'Язык говяжий с хреном', price: 350 }
];
//хранилище суммы
let lastOrderTotal = 0;

const modalItemsContainer = document.querySelector('.modal__items');
function renderCartItems(){
   modalItemsContainer.innerHTML='';
   cartItems.forEach(item=>{
    modalItemsContainer.innerHTML+=generateCartItem(item);
   }) 
}
//функция обновления счетчика над корзиной 
function updateCartCounter() {
const totalQuantity = cartState.reduce((sum, item) => sum + item.quantity, 0);
const counterElement = document.querySelector('.cart__counter');
counterElement.textContent = totalQuantity;
}

//функция рассчета цены
function renderCartTotal() {
const totalItems = cartState.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);
document.querySelector('.modal__number').textContent = `${totalItems} items`;
document.querySelector('.modal__total').textContent = `${totalPrice.toFixed(2)}₽`;
document.querySelector('.modal__total-price').textContent = `${totalPrice.toFixed(2)}₽`;
lastOrderTotal = totalPrice;

}

//пустая корзина
let cartState = [];
//сохранение корзины
const savedCart = localStorage.getItem('cartState');
if (savedCart) {
  cartState = JSON.parse(savedCart);
}

//товар в корзине
let currentProduct = null;
//модалка с информацией
const infoModal = document.querySelector('.modal__info');
const menuCards = document.querySelector('.menu__cards');//один контейнер всех карточек
menuCards.addEventListener('click',(e)=>{
  const card = e.target.closest('.dish-card');
  if(!card) return;
  //находим заголовок, картинку и описание каждой карточки и заполняем данными
  const title = card.querySelector('.dish-card__title').textContent;
const imageSrc = card.querySelector('.dish-card__img').src;
const description = card.querySelector('.dish-card__composition').textContent;
const priceText = card.querySelector('.dish-card__price').textContent;
const price = parseFloat(priceText);
fillModalUI({title,imageSrc,description});
currentProduct={title,price};
//открытие модального окна 
  infoModal.classList.remove('hidden');
  infoModal.setAttribute('aria-hidden','false')
});
//закрытие модального окна 
const closeOver = document.querySelector('.cartModal__overlay');
const infoClose = document.querySelector('.cartModal__close');
function closeInfoModal() {
  infoModal.classList.add('hidden');
  infoModal.setAttribute('aria-hidden','true');
}
const infoModalTriggers = [closeOver,infoClose];
infoModalTriggers.forEach(el => {
  el.addEventListener('click', () => closeInfoModal());
});
//функция для заполнения модалки данными с карточки 
function fillModalUI(data) {
  const modalTitle = document.querySelector('.ingredients__title');
  const modalImg = document.querySelector('.cartModal-card__img');
  const modalDescr = document.querySelector('.cartModal__ingredients-text');
 
  if(modalTitle)modalTitle.textContent = data.title;
    if (modalImg) modalImg.src = data.imageSrc;
  if (modalDescr) modalDescr.textContent = data.description;
}
const order = document.querySelector('.cartModal__order-btn');
const cartOrder = document.querySelector('.modal__checkout');
const emptyCart = document.querySelector('.modal__empty');
const title = document.querySelector('.cart__modal-title');
const cartList = document.querySelector('.modal__items');
const bottom = document.querySelector('.modal__bottom');
function renderCart(){
modalItemsContainer.innerHTML='';
cartState.forEach(item=>{
  const html = generateCartItem(item);
  modalItemsContainer.innerHTML += html;
})
renderCartTotal();
updateCartCounter();
closeInfoModal();


if(cartState.length === 0){
  emptyCart.classList.remove('hidden');
  title.classList.add('hidden');
  cartList.classList.add('hidden');;
  bottom.classList.add('hidden');
  return;
}else{
   emptyCart.classList.add('hidden');
  title.classList.remove('hidden');
  cartList.classList.remove('hidden');
  bottom.classList.remove('hidden');
}
localStorage.setItem('cartState', JSON.stringify(cartState));
}
//добавить в корзину функция 
function addToCart(product){
  const found = cartState.find(item=>item.title===product.title);
  if(!found){
    cartState.push({title:product.title,price:product.price,quantity:1});
  }
  else{
found.quantity++;
  }
  renderCart();
}
//по кнопке заказать добавляется товар в корзину
order.addEventListener('click',()=>{
addToCart(currentProduct);
})
function clearCart(){
  cartState = [];
  localStorage.removeItem('cartState');
  renderCart();
}
//открытие модалки спасибо по клику закаказать из корзины

const thankModal = document.querySelector('.thankyou__modal');
cartOrder.addEventListener('click',()=>{
    document.querySelector('.thankyou__price').textContent =
  `Сумма заказа: ${lastOrderTotal.toFixed(2)} ₽`;
  thankModal.classList.remove('hidden');
   thankModal.setAttribute('aria-hidden','true');
   closeModal();
   clearCart();
})
//закрытие модалки спасибо 
const closeThankOver = document.querySelector('.thankyou__overlay');
const thankClose = document.querySelector('.thankyou__close');
const thankOk = document.querySelector('.thankyou__btn');
function closeThankModal() {
  thankModal.classList.add('hidden');
  thankModal.setAttribute('aria-hidden','true');
}
const thankModalTriggers = [closeThankOver,thankClose,thankOk];
thankModalTriggers.forEach(el => {
  el.addEventListener('click', () => closeThankModal());
});
//удаление и увеличение товара в корзине по селект 
function handleSelectChange(e) {
  const title = e.target.dataset.title;
  const value = e.target.value;

  if (value === 'удалить') {
    cartState = cartState.filter(item => item.title !== title);
  } else {
    const found = cartState.find(item => item.title === title);
    if (found) {
      found.quantity = Number(value);
    }
  }

  renderCart();
}
 modalItemsContainer.addEventListener('change', (e) => {
  if (!e.target.classList.contains('cart__select')) return;
  handleSelectChange(e);
});

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});



