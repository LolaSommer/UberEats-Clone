const basketIcon = document.querySelector('.header__basket-icon');
const cartModal = document.querySelector('.modal__cart');
const modalClose = document.querySelector('.modal__close');
function openModal() {
  cartModal.classList.add('active');
  document.addEventListener('click', handleOutsideClick);
}
//закрытие по клику вне корзины
function handleOutsideClick(e) {
  const isClickInside = cartModal.contains(e.target);
  const isClickOnIcon = basketIcon.contains(e.target);

  if (!isClickInside && !isClickOnIcon) {
    closeModal();
    document.removeEventListener('click', handleOutsideClick);
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
                        <select name="counter" id="count" class="counter__option">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6"> 6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="удалить">удалить</option>
                        </select>
                    </div>
                     <div class="modal__title">${item.title}</div>
                     <div class="modal__price">${item.price.toFixed(2)}₽</div>           
                   </div> `}
//стейты
const cartItems = [
  { title: 'Сельдь на бородинском хлебе', price: 240 },
  { title: 'Грибы маринованные', price: 300 },
  { title: 'Малосольная семга', price: 390 },
  { title: 'Соленья ассорти', price: 320 },
  { title: 'Сало домашнее с горчицей', price: 320 },
  { title: 'Язык говяжий с хреном', price: 350 }
];

const modalItemsContainer = document.querySelector('.modal__items');
function renderCartItems(){
   modalItemsContainer.innerHTML='';
   cartItems.forEach(item=>{
    modalItemsContainer.innerHTML+=generateCartItem(item);
   }) 
}
//функция рассчета цены
function renderCartTotal() {
    const totalItems = cartItems.length;
   const totalPrice=cartItems.reduce((sum,item)=>sum + item.price,0);
  document.querySelector('.modal__number').textContent = `${totalItems} items`;
  document.querySelector('.modal__total').textContent = `${totalPrice.toFixed(2)}₽`;
  document.querySelector('.modal__total-price').textContent = `${totalPrice.toFixed(2)}₽`;
}
let cartState = [];


//модалка с информацией
const infoModal = document.querySelector('.modal__info');
const menuCards = document.querySelectorAll('.menu__cards');
menuCards.forEach(card=>{
    card.addEventListener('click',()=>{
        infoModal.classList.remove('hidden');
    })
})
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