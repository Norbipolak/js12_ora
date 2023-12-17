/*
Class példa a chatgpt.js-ben a Class-ról
*/

class Cart {
    cart;

    constructor() {
        //this.cart = []; ahelyett 
        this.cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [];
    }

    addToCart(product) {
        this.cart.push(product);

        localStorage.setItem("cart", JSON.stringify(this.cart));
    }
}

export default Cart;

/*
a this.cart alapértelmezetten egy üres tömb lesz, de ezt majd módosítjuk 

az addToCart metódus az várni fog egy olyat, hogy product és azt mondjuk this.cart.push(product) ->
kérdés, hogy hol tudjuk meghívni ezt a metódust -> a Products.js class Products-ban lesz egy olyan vátozónk, hogy cart; és a cart 
az egy példány a Cart osztányból

class Porducts(); constructer()-ében
    this.cart = new Cart();

lemegyünk a createProductsHtml függvényre, ahol lementettük az addToCartBtn-t és adunk egy eventlistener-t
*/

addToCartBtn.addEventListener("click", () => {
    const pData = {
        productID: product.productID,
        category: product.category,
        brand: product.brand,
        title: product.title,
        price: product.price,
        quantity: parseInt(quantity.value) //ahol lementettük a qualityInput-ot, annak a value-je kell, de az mindig string, ezért JSON.parseInt
    };

    this.cart.addToCart(pData);
});

/*
az addToCartBtn.addEventListener-ben össze kell állítanunk a products-nak az adatait, olyan formában 
hogy, van egy pData nevű változónk, mert products itt már volt, nem lehet az a neve
*/
/*
és itt meghívjuk a this.cart-nak az addToCart nevű függvényét, ami megkapja a pData-t
a cart.js-ben lévő Cart-on belüli cart azt csinálja, hogy belerakja a product-ot és  utána 
stringfy-oval belerakja a localStorage-ba 
*/

/*
Egésznek a leírása:
1. Csinálunk egy class-t, új .js-en
2. ennek a class-nak a constuctorében csinálunk egy üres tömböt, amit késöbb feltöltünk productokkal 
3. csinálunk egy függvényt, ami vár productokat és ha ezek a productok megjönnek, akkor bepusholja a cart nevezezű üres tömbünkbe
ugyanez a függvényben van az is, hogyha megérkeznek a productok(átvisszük ezt az egész class cart a Products.js-be ahol majd átadjuk neki a productokat)
akkor azokat töltse fel JSON.parse-val stringgé átalakítva a localStorage metódussal böngészönk a local storage-ába
4. A Products.js class Products-ban csinálunk egy cart-ot, majd ennek a constructor-ében this.cart = new Cart, ezzel átvittük az 
egész Class Cart-ot a Products.js-be és itt dolgozunk vele tovább 
5. Itt a Products.js-ben van lementve az addToCartBtn-nünk amivel azt szeretnénk, hogyha rákattintunk az adott termékre, amit meg szeretnénk
vásárolni, akkor hozzáadja a kosárba, ami meg kell, hogy jelenjen a local storage-ünkbe, tehát csinálunk egy addEventListener-t erre a gombra
6. Az eventListenerben csinálunk egy pData változót és ebben átadjuk neki egy objektumban az adatokat, amit tartalmaz egy product
pl. product:product.id, product:product.category stb és ezt itt átadjuk az addToCart függvényünkbek ami pusholja ebben az onjektumban 
összegyüjtött adatokat a cart nevű üres tömbünkbe -> this.cart.addToCart(pData) (this. hivatkozásra figyelni a class-on belül!!!)
7. Ha rákkatintunk a kiválastott termékre, akkor a local storage-ben megjelenik key: cart value: pl. az első termékre kattintva  ->
és lejjebb a JSON stringet objektumként is megjeleniti
0: {productID: 1, category: "smartphones", brand: "Apple", title: "iPhone 9, quantity: 1, price: 549"}
    brand: "Apple"
    category: "smartphones"
    price: 549
    productID: 1
    quantity: 1
    title: "Iphone 9"

Még az a probléma, hogyha beleraktuk a termékeinket és utána újratöltjük a képernyőt és utána belerakunk még egyet, 
akkor csak az az egy lesz bent a local storage-ben és amit újratöltés előtt beleraktunk az elveszik, kitörlődik -> 
az az oka, amikor újratöljük a képernyőt akkor létrejön egy példány a Products.js-ben Class Prodcuct constructor-ában abból a cart-ból(new Cart),
amit csináltunk a cart.js-en és amikor létrejön a products constructorában a cart, akkor ő meghívja a saját constructorát, ami van a cart.js és 
ebben a constructorban az van, hogy this.cart = [], szóval a this.cart-ot leüríti 
-> 
erre az a megoldás, hogy az üres [] helyett, azt írjuk a Cart class contructorába, hogy this.car = JSON.parse(localStorage.getItem("cart"))
-> 
itt az történik, hogy minden esetben, amikor a cart példány elkészül, akkor a this.cart-ba már lementjük a meglévő termékeket.
A localStorage.getItem-vel visszakapjuk a JSON stringünket és a JSON parse-val objektummá alakítjuk és akkor már nincs az a probléma, hogy 
kitöröl egyet újratöltésnél de ezzel is van egy probléam 
->
ha a localStorage.getItem-en nincsen semmilyen termék (érték), akkor null-t fog adni null JSON.parse-olnánk,
tehát ha van bent valami, akkor azt JSON.parse-oljuk, ha nincs bent semmi, akkor egy üres tömb, amibe feltölti a termékeket, amire 
rákattintottunk 
->
még mindig van egy probléma, ha ugyanazt a terméknél többszöt nyumjuk meg, hogy kosárba, akkor több productID:1, quantity: 1-ew 
objektumunk, és ehelyett szeretnénk, hogy egy objektumunk legyen egy termékre és annak a quantity-ja változzon!!!!!!!!
->
cart.js-en az addToCart függvény elején meg kell nézzük meg, hogy az adott id-jű termék már szerepel-e a kosárban (findIndex)->
const checkProduct = this.cart.findIndex((p)=> p.id === product.id);
Abban az esetben, ha már megvan ez a termék, akkor a findIndex nekünk vissza fogja adni az adott terméknek az első előfordulását, 
ha nincs akkor -1-et ad vissza, ugyanugy mint az indexOF
*/
addToCar(product) {
    const index = this.cart.findIndex((p) => p.productID === product.productID);

    if (index === -1) {
        this.cart.push(product);
        localStorage.setItem("cart", JSON.stringify(this.cart));
    } else {
        this.cart[index].quantity += product.quantity;
        localStorage.setItem("cart", JSON.stringify(this.cart)); // mindenegyes módisítás után felül kell írni mert különben csak a cartban
    } // változna a quantity a localStorage-on nem 
}
/*
Hogyha nem egyenlő -1-vel az indexem, akkor csak simán belerakom a cart-omba a terméket és utána a localStorage-ot frissítem a cart szerint,
különben meg van az indexem és az indexen lévő quantity-t nővelem a product.quantity-jével, azzal a quantity-vel amit a termékekből kapok ->
böngésző, úgy müködik mikor Amazonon veszek valamit 
*/
/***************************************************************************************************************************************/
/*
További müveletek a cart-val eddig volt a addToCart most következik a remove a cart.js Cart class-jában*/

remove(id) {
    const index = this.cart.findIndex((p) => p.id === id);
    this.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cart));
}
/*
A remove úgy müködik, hogy kapok egy id, ez az id alapján megkeresem a termékemet és ha meg van, akkor splice(index, 1) -> akkor ezt az 
indexű elemet, kitörlöm a tömbömből a splice-val (indextől egy elemet töröljön ki, szóval azt ami az indexen volt)
de ez csak még a this.cart - utána jön mindig a felülírás, hogy a local storage is megváltozzon -> localStorage.setItem("cart", JSON.stringify(this.cart));
*/
/*
localStorage-ből megjelenítjük a termékeinket -> ehhez kell a cart.html
itt megcsináltuk a div class="containert" és egy div class"cart-table"-t a formázás miatt table th tr-be beleírtuk, hogy id, category, price stb.
a fejléceket 
majd csináltunk egy tbody-t thead alatt lásd cart.html-nek a szerkezete  
/*X*/ /*mostani változtatás*/ 


class Cart {
    cart;
    cartBody; /*X*/

    constructor() {
        /*
            Minden esetben, amikor a cart példány elkészül, 
            akkor a this.cart-ba lementjük a már meglévő 
            termékeket
        */
        this.cart = localStorage.getItem("cart") !== null ?
            JSON.parse(localStorage.getItem("cart")) : [];

        this.cartBody = document.querySelector("#cart-body"); /*X*/
    }
    addToCart(product) {
        const index = this.cart.findIndex((p) => p.productID === product.productID);

        if (index === -1) {
            this.cart.push(product);
            localStorage.setItem("cart", JSON.stringify(this.cart));
        } else {
            this.cart[index].quantity += product.quantity;
            localStorage.setItem("cart", JSON.stringify(this.cart));
        }
    }
    remove(id) {
        const index = this.cart.findIndex((p)=>p.id === id);
        this.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    showCart() {
        for(const product of this.cart) {
            const tr = document.createElement("tr");
            const tdID = document.createElement("td");
            tdID.innerText = product.productID

            const tdCategory = document.createElement("td");
            tdCategory.innerText = product.category;

            const tdBrand = document.createElement("td");
            tdBrand.innerText = product.brand;

            const tdTitle = document.createElement("td");
            tdTitle.innerText = product.title;

            const tdPrice = document.createElement("td");
            tdPrice.innerText = product.price  + "$";

            const tdQuantity = document.createElement("td");
            tdQuantity.innerText = product.quantity;

            const tdSubsum = document.createElement("td");
            tdSubsum.innerText = (product.quantity * product.price) + "$";

            const tdDelete = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Törlés"

            tdDelete.appendChild(deleteBtn);

            tr.appendChild(tdID);
            tr.appendChild(tdCategory);
            tr.appendChild(tdBrand);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdPrice);
            tr.appendChild(tdSubsum);
            tr.appendChild(tdDelete);
            tr.appendChild(tdTitle);
            
            this.cartBody.appendChild(tr); // egészet belerakjuk a cartBody-ba amit ide lementettünk a constructorban
        }
    }
}

/*
showCart-ba legeneráljuk a termékeket
csinálunk egy tr-t és nyolc sort (td), mert 8 db th van a html-ünkben
*/

/*
csinálunk egy cart.executer.js-t, ahol meghívjuk amit most a showCart-ot
*/

/*
itt a cart.js legvégén van egy localStorage.clear 
ha ki akarjuk törölni amit csináltunk, akkor ez kell amugy meg kikommenteljük utána, ha valamit acsinálnunk
*/
//localStorage.clear();