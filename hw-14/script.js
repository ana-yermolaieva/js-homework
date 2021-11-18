(() => {
    function Hamburger(size, toppings = []) {
        this.size = size;
        this.topping = [...toppings];
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
    };
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

    Hamburger.prototype.addTopping = function(toppings) {
        this.topping.push(toppings);
    };
    Hamburger.prototype.getPrice = function() {
        let price = this.size.price;
        for (let i = 0; i < this.topping.length; i++) {
            price += this.topping[i].price;
        }
        return price;
    };
    Hamburger.prototype.getCallories = function() {
        let callories = this.size.callories;
        for (let i = 0; i < this.topping.length; i++) {
            callories += this.topping[i].callories;
        }
        return callories;
    };

    const hamburger = new Hamburger(Hamburger.SIZE.small);
    hamburger.addTopping(Hamburger.TOPPINGS.cheese);
    hamburger.addTopping(Hamburger.TOPPINGS.potato);
    hamburger.addTopping(Hamburger.TOPPINGS.mayo);

    console.log(`Price: ` + hamburger.getPrice());             //50+10+15+20=95
    console.log(`Callories: ` + hamburger.getCallories());     //20+20+10+5=55
})();
