/*
A localStorage arra jó, hogy kliens oldalon tudunk a böngészőben tárolni adatokat.
*/

localStorage.setItem("userID", 55);

/*
A localStorage.setItem(), vár egy kulcsot meg egy értéket
Az történt a localStorage.setItem metódus meghívására, hogy készítettünk a local storage-ban egy userID-t, aminek az értéke 55.
Ez a böngészőben tárolódik és az adott oldalhoz köthető, jelen pillanatban ez a localstorage.html
Ott találjuk, hogy vizsgálás -> Application (9. elem az elements, console után) és bal oldalon lesz egy olyan fül, hogy Storage, amiben van 
local storage és session storage alfül is, meg cookies is.
Local storage alfülben lesz egy file:// al-alfül és ott lesz, hogy Key: userID és value 55
*/

/*
Ez azért jó, mert ha van egy webszerverünk, pl. live-server és ha mögé írjuk a 127.0.0.1:8080 -> / localstorage.html
ez most egy üres oldal, csak azért használtuk ezt a html-t mert itt hívatkoztunk a localstorage.js-re

most, ha megyítjuk akkor látjuk, hogy local storage: (origin)http://127.0.0.1:8080, ugyanugy key: userID és value: 55
és, ha visszamegyünk az /index.html-re ott lesz ugyanez a local storage-ben -> 
Tehát ugyanazon a domain-en (IP cím) belül megkapjuk a megfelelő értékeket (key és value)
*/

/*
a products.executer.js-ben beírjuk, hogy console.log(localStorage);
és látni, fogjuk a Storage-ban az értékeket 
Storage {userID: '55', length: 1}
userID: "55"
length: 1
[[Prototype]]: Storage
->
Ezeken a kuclsokon csak stringeket tudonk tárolni (mindig string-ek lesznek)
*/

localStorage.clear();

/*
Ha ki akrjuk törölni a localStorage-nak a tartalmát és ez kitöröli az egész tartalmát!!!
megnézzük a 127.0.0.1:8080/localstorage.html-t és tényleg nincs ott az application-ben
*/ 

/*
Létezik, olyan is, hogy localStorage.getItem()
és a localStorage.getItem vár egy paramétert ami a local storage-nek a kulcsa -> userID
*/
console.log(localStorage.getItem("usedID"));

/*
a console.log(localStorage.setItem("userID"))-nál visszakaptunk 55-t végeredméynként
setItem -> local storage-ba tudunk elemeket belerakni, amiket oldalokon átívelően képesek vagyunk felhasználni 
és hozzáférhetünk
getItem -> megkapjuk az értéket 
clear -> az egészet kitöröljük 
removeItem -> egyetlen egy elemet töröl ki egy kulcs alapján
*/
localStorage.removeItem("userID");

localStorage.setItem("email", "kovacs.oliver1989@gmail.com")

/*
Elég egyszer megcsinálni és akkor mindig bent lesz.
webshopon, amilyet mi is csináltunk, ott van a kosárba! gomb és mellette egy input mező, aminél ki tudjuk választani 
hány terméket szerenénk venni, rakunk a kosárba és utána megjelenik a kosárban, ami cookies-os vagy
local storage-os megoldással van kivitelezve
A cookie egészen más dolog, mint a local storage, az a http fejlécében közlekedik 
*/

/*
Local storage mellett létezik session storage is, egy különbség van a kettő között 
*/
sessionStorage.setItem("username", "pisti96");

/*
a böngészőben(http:127.0.0.1:8080/localstorage.html) az applicationben a local storage alatt van egy olyan, hogy session storage és itt fog megjelenni 
a key: userName, value: pisti96 és ez a főoldalon is meg lesz, egy domain, ip-címen, egy tartományon belül ez megtalálható 
local host-on(127.0.0.1-en megtalálható lesz)
*/

/*
akkor ha ezt sessionStorage.setItem("username", "pisti96"); itt kikommentelem és bezárom a böngeszőt és utána újra 
megnyitom, ilyenkor az történik, hogy a session storage az kiürült, viszont a local storage az meg van!!!!!!!!!!!!!!!!!!!!
Session storage csak egy munkamenet erelyéig müködik, amíg a local storage egészen addig marad meg, ameddig ki nem töröljük(clear)

Egy munkamenet azt jelenti, hogy menyitom a böngészőt és ha bezárom, akkor kitörlödik
*/

/*
Hogyan tudunk egy kosár tartalmát a localStorage-on tárolni, érdemes azt ott tárolni, mert hogyha már összeszedtünk 35 db terméket 
és bezárom a böngészőt, utána újra megnyitom és nincsenek ott a termékek az baj 
sessionStorage csak tényleg arra van használva, ami egyetlen egy munkamenet erejéig fontos
localStorage pedig, amit hosszú távra meg akarunk őrizni
*/

const cart = [{
    productID:1,
    productName: "porzsák nélküli kávéföző",
    price:65000,
    quantity:1
}];

/*
van egy products tömbünk, amelyben objektumukat fogunk tárolni, amelyek a termékeket adatait jeleniteni meg

Hogyan tudjuk ezt belerakni a localStorage-ba, ha az csak kizárólag stringeket tud tárolni?
mert, ha csinálunk egy localStorage.setItem-et, aminek a kulcsa az, hogy cart és a cart tömböt belerakjuk
akkor azt fogjuk látni a local storage-en(127.0.0.1:8080/localstorage.html) hogy a value-ja a cart key-nek [object Object]
-> ha az object-nek meghívjuk a toString metódusát, márpedig stringben tudunk tárolni a local storage-ben adatokat 

console.log(cart.toLocaleString()); -> [object Object] -telejsen mindegy milyen objektumról van szó
*/ 

// localStorage.setItem("cart", cart); ->
localStorage.setItem("cart", JSON.stringify(cart));

console.log(cart.toLocaleString()); // -> [object Object]

/*
Az objekteket át tudjuk viszont alakítani JSON stringé a JSON.stringify() metódussal, akkor használtuk, amikor küldütnk adatokat 

const response = await fetch("http://dummyjson.com/products" + id, {
    method: 'PUT',
    body: JSON.stringify(productData), -> a http üzenet szövegtörzsében azt mondtuk, hogy JSON.stringify(productData)!!! productData egy objektum
    headears . {"content-type":"application/json"}
});

Tehát itt is kell belőle csinálni egy JSON stringet!!!!!!!!!!!
localStorage.setItem("cart", JSON.stringify(cart));
és ha most, így megnézzük a local storage-et az applicationon belül akkor ott lesz ez a JSON string a valueban->
key: cart value: [{"productID":1,"productName":"porzsák nélküli kávéföző","price":65000}]
*/

/*
Ha új terméket szeretnénk belerakni, akkor vissza kell alakítanunk tömbbé, belerakjuk a terméket és újra JSON.stringify-ozzuk
vagy ugyanígy ha bármilyen változást szeretnénk csinálni 

pl. a cart tömbbe van egy olyan, hogy quantity:1 -> ezt meg szeretnénk növelni 2-re
objektummá visszaalakítás -> JSON.parse!!!!!!!!!!!!!! és utána meg localStorage.getItem("cart")
*/

const cartObj = JSON.parse(localStorage.getItem("cart"));
console.log(cartObj);

/*
Igy visszaalakítottuk, ilyen formára 
[{}]
0:
    price: 65000
    productID: 1
    productName: "porzsák nélküli kávéföző"
    quantity: 1
    [[Prototype]]:object
    length: 1
[[Prototype:]]: Array(0)

megkeressük a megfelelő terméket és megnöveljük a quantity-ját 
*************************************************************************************************************************************
*/

/*
Át kell alakítanunk a products.js-t, hogy ne az legyen, hogy delete és megnyítás gomb, ahogy most van ->
hanem egy kosárba gomb és egy input mező, ahogy ki tudjuk választani, hány terméket akarunk a kosárba rakni
showProductHtml függvényben van egy const grid-box2 = -> ezt fogjuk átalakítani /X/

const gridBox2 = document.querySelector("div");
gridBox2.classList.add("grid-box");
const addToCartBtn = document.createElement("button");
addToCartBtn.innerHTML = `<a href="product.html?id={product.id}">megnyitás</a>`; /X/ helyett addToCartBtn.innerText = "Kosárba!";
gridbox2.appendChild(addToCartBtn);

a másik meg a deleteBtn amit át kell alakítani ez felette van ->

const grid2 = document.createElement("div");
grid2.classList.add("grid-2");
const gridBox1 = document.createElement("div");
grodBox1.classList.add(grid-box);
const deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete!";
deleteBtn.setAttribute("product-id, product.id");
gridBox1.appendChild(deleteBtn);

->

const grid2 = document.createElement("div");
grid2.classList.add("grid-2");
const gridBox1 = document.createElement("div");
grodBox1.classList.add(grid-box);
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
qualityInput.style.width = "60px";
gridBox1.appendChild(quantityInput);

itt még ki kell törölni amikor megcsináltuk az eseménykezelőt a törlésre ->  mert itt már nincsen törlés, azt alakítottuk át 
deleteBtn.addEventListener("click", ()=> {
    const productID = parseInt(deleteBtn.getAttribute("product-id"));
    this.deleteProduct(productID)
});

ilyet is lehet itt beállítani -> 
qualityInput.style.width = "60px";

Most csináljuk a cart.js-t !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/