import Cart from "./Cart.js";

const cart = new Cart();
cart.showCart();

/*
elöször importálunk majd ilyen formában meghívjuk itt a showCart függvényünketa
a cart.html-ben pedig hivatkozunk a cart.executer.js-re és nem felejtjük odaírni, hogy type="module"
<script type="module" src="cart.executer.js"></script>

Azért mert itt importáltunk, tehát ha ezt az import statementet használjuk (import Cart from "./Cart.js";)
vagy az export, valamilyen modult alkalmazunk, akkor kell nekünk type="module"
*/

/*
megnyítjük a böngeszőn a 127.0.0.1:8080/cart.html-t, megformáztuk style.css-vel 
és utána visszamegyünk a főoldalra (127.0.0.1:8080), ott a kosárba gombbal belerakunk rengeteg terméket és 
utána rámegyünk a (127.0.0.1:8080/cart.html) és látjuk azokat a termékeket, amiket beleraktunk a kosárba 
*/