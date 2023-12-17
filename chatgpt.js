/*
Class -ra példa
*/

class Car {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  
    getCarDetails() {
      return `${this.year} ${this.make} ${this.model}`;
    }
  }
  
  // Creating an instance of the Car class
  const myCar = new Car('Toyota', 'Corolla', 2020);
  
  // Accessing properties and methods of the instance
  console.log(myCar.getCarDetails()); // Output: 2020 Toyota Corolla

  /*
  Leírás, hogy mi történik 

  
In JavaScript, a class is a blueprint for creating objects with predefined properties and methods.
 It's a fundamental part of modern JavaScript introduced in ECMAScript 2015 (ES6) 
 to enable a more structured and object-oriented approach to writing code.

Here's a basic example of a class in JavaScript:

javascript
Copy code
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarDetails() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

// Creating an instance of the Car class
const myCar = new Car('Toyota', 'Corolla', 2020);

// Accessing properties and methods of the instance
console.log(myCar.getCarDetails()); // Output: 2020 Toyota Corolla
Explanation:

class Car { ... }: This declares a class named Car.
constructor(make, model, year) { ... }: The constructor method is a special method used for initializing objects created with the class.
It assigns values to the properties (make, model, and year) when a new Car object is instantiated.

getCarDetails() { ... }: This is a method defined within the class that returns a string representing the car's details.
const myCar = new Car('Toyota', 'Corolla', 2020);: 
This line creates an instance of the Car class by using the new keyword and passing arguments to the constructor.

myCar.getCarDetails(): This calls the getCarDetails() method on the myCar object, returning the details of the car.
Classes in JavaScript provide a way to create objects with similar behaviors and structures while promoting code reusability and maintainability.
Underneath, JavaScript classes use prototypal inheritance but offer a more familiar syntax for developers coming 
from class-based languages like Java or C++.
*/

/*
remove 126-odik sor magyarázata

remove(id) {
    const index = this.cart.findIndex((p) => p.id === product.id);
    this.cart.splice(index, 1);
}
Explanation of each line:

remove(id) { ... }: This defines a method named remove that takes an id parameter. Presumably, this method is part of a class or an object.

const index = this.cart.findIndex((p) => p.id === product.id);:

this.cart refers to an array (likely the shopping cart) stored within the object or class where this method is defined.
findIndex() is an array method that searches for an element in the array that satisfies the provided testing function and
 returns the index of the first occurrence. Here, it's searching for an element (p) in the cart array 
 where the id of the element matches the provided id parameter.

const index = this.cart.findIndex((p) => p.id === id);
This change ensures that the method searches for the element with the specified id passed to the remove() method.
this.cart.splice(index, 1);:

splice() is an array method in JavaScript used to change the contents of an array by removing or replacing existing elements.
In this case, it removes elements from the cart array starting at the index found in the previous step 
(index represents the index of the item with the specified id), and it removes one element (1 as the second argument). 
This effectively removes the item with the specified id from the cart.

*/
  