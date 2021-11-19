(() => {
    class Hamburger {
        constructor(size, toppings = []) {
            this.size = size;
            this.topping = [...toppings];
        } 

        addTopping(toppings) {
            this.topping.push(toppings);
        };
        getPrice() {
            let price = this.size.price;
            for (let i = 0; i < this.topping.length; i++) {
                price += this.topping[i].price;
            }
            return price;
        };
        getCallories() {
            let callories = this.size.callories;
            for (let i = 0; i < this.topping.length; i++) {
                callories += this.topping[i].callories;
            }
            return callories;
        };
    }

    Hamburger.SIZE = {
        small: { 
            price: 50,
            callories: 20
        },
        middle: {
            price: 75,
            callories: 30
        },
        large: {
            price: 100,
            callories: 40
        }
    }
    Hamburger.TOPPINGS = {
        cheese: {
            price: 10,
            callories: 20
        },
        salad: {
            price: 20,
            callories: 5
        },
        potato: {
            price: 15,
            callories: 10
        },
        spice: {
            price: 15,
            callories: 0
        },
        mayo: {
            price: 20,
            callories: 5
        }
    };

    const hamburger = new Hamburger(Hamburger.SIZE.large);
    console.log(hamburger);

    hamburger.addTopping(Hamburger.TOPPINGS.cheese);
    hamburger.addTopping(Hamburger.TOPPINGS.salad);
    hamburger.addTopping(Hamburger.TOPPINGS.potato);
    hamburger.addTopping(Hamburger.TOPPINGS.spice);
    hamburger.addTopping(Hamburger.TOPPINGS.mayo);
    
    console.log(`Price: ` + hamburger.getPrice());
    console.log(`Callories: ` + hamburger.getCallories());
})();