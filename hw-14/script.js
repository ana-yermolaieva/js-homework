(() => {
    function Hamburger(size) {
        "use strict"
        this.size = size;
        const small = { 
            'price': 50,
            'callories': 20
        };
        const middle = {
            'price': 75,
            'callories': 30
        };
        const large = {
            'price': 100,
            'callories': 40
        };
        const cheese = {
            'price': 10,
            'callories': 20
        };
        const salad = {
            'price': 20,
            'callories': 5
        };
        const potato = {
            'price': 15,
            'callories': 10
        };
        const spice = {
            'price': 15,
            'callories': 0
        };
        const mayo = {
            'price': 20,
            'callories': 5
        };
        let toppingList = [];
        let toppingPrice = 0;
        let toppingCallories = 0;
        this.addTopping = function (topping) {
            let toppingPriceList = [];
            let toppingCalloriesList = [];
            if (topping == topping_cheese) {
                toppingPriceList.push(cheese.price);  
                toppingCalloriesList.push(cheese.callories);
            }
            if (topping == topping_salad) {
                toppingPriceList.push(salad.price);  
                toppingCalloriesList.push(salad.callories);
            }
            if (topping == topping_potato) {
                toppingPriceList.push(potato.price);  
                toppingCalloriesList.push(potato.callories);
            }
            if (topping == topping_spice) {
                toppingPriceList.push(spice.price);  
                toppingCalloriesList.push(spice.callories);
            }
            if (topping == topping_mayo) {
                toppingPriceList.push(mayo.price);  
                toppingCalloriesList.push(mayo.callories);
            }
            for (let i = 0; i < toppingPriceList.length; i++) {
                toppingPrice += toppingPriceList[i];
            }
            for (let i = 0; i < toppingCalloriesList.length; i++) {
                toppingCallories += toppingCalloriesList[i];
            }
            toppingList = [toppingPrice, toppingCallories];
            return toppingList;
        };
        this.getPrice = function () {
            let price = 0;
            let burgerSize = 0;
            if (size == size_small) burgerSize = small.price;
            if (size == size_middle) burgerSize = middle.price;
            if (size == size_large) burgerSize = large.price;
            return price = burgerSize + toppingList[0];
        };
        this.getCallories = function () {
            let callories = 0;
            let burgerCallories = 0;
            if (size == size_small) burgerCallories = small.callories;
            if (size == size_middle) burgerCallories = middle.callories;
            if (size == size_large) burgerCallories = large.callories;
            return callories = burgerCallories + toppingList[1];
        };
    }

    const hamburger = new Hamburger(size_small); 
    hamburger.addTopping(topping_cheese);
    hamburger.addTopping(topping_potato);
    hamburger.addTopping(topping_mayo);

    console.log(`Price with sauce: ` + hamburger.getPrice());             //50+10+15=75+20
    console.log(`Callories with sauce: ` + hamburger.getCallories());     //20+20+10=50+5
})();
