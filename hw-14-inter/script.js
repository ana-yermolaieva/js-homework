(() => {
    function Hamburger(sizeEl, toppingEl) {
        this.sizeEl = sizeEl;
        this.toppingEl = toppingEl;
    }

    Hamburger.SIZE = [
        small = { 
            price: 50,
            callories: 20
        },
        middle = {
            price: 75,
            callories: 30
        },
        large = {
            price: 100,
            callories: 40
        }
    ];
    Hamburger.TOPPINGS = [
        cheese = {
            price: 10,
            callories: 20
        },
        salad = {
            price: 20,
            callories: 5
        },
        potato = {
            price: 15,
            callories: 10
        },
        spice = {
            price: 15,
            callories: 0
        },
        mayo = {
            price: 20,
            callories: 5
        }
    ];
    
    Hamburger.sizeList = [];
    Hamburger.toppingList = [];

    Hamburger.priceButton = document.getElementById('priceBtn');
    Hamburger.callButton = document.getElementById('callBtn');
    Hamburger.priceSpan = document.getElementById('priceSpan');
    Hamburger.callSpan = document.getElementById('callSpan');

    Hamburger.prototype.addSize = function() {
        for (let i = 0; i < this.sizeEl.length; i++) {
            this.sizeEl[i].addEventListener('change', function(){
                Hamburger.sizeList = Hamburger.SIZE[i];
            })
        }
        return Hamburger.sizeList;
    };
    Hamburger.prototype.addTopping = function() {
        for (let i = 0; i < this.toppingEl.length; i++) {
            this.toppingEl[i].addEventListener('change', function(){
                Hamburger.toppingList.push(Hamburger.TOPPINGS[i]);
            })
        }
        return Hamburger.toppingList;
    };
    Hamburger.prototype.getPrice = function(btn, text) {
        let result;
        btn.addEventListener('click', function() {
            result = Hamburger.sizeList.price;
            for (let i = 0; i < Hamburger.toppingList.length; i++) {
                result += Hamburger.toppingList[i].price;
            }
            if(!result) return;
            text.innerText = `Price: ${result} тугриков`;
            console.log(`Price: ${result} тугриков`);
        })
    };
    Hamburger.prototype.getCallories = function(btn, text) {
        let result;
        btn.addEventListener('click', function() {
            result = Hamburger.sizeList.callories;
            for (let i = 0; i < Hamburger.toppingList.length; i++) {
                result += Hamburger.toppingList[i].callories;
            }
            if(!result) return;
            text.innerText = `Callories:  ${result} каллорий`;
            console.log(`Callories:  ${result} каллорий`);
        })
    };
    const sizeElement = document.getElementsByClassName('size');
    const toppingElement = document.getElementsByClassName('topping');

    const hamburger = new Hamburger(sizeElement, toppingElement);
    hamburger.addSize();
    hamburger.addTopping();
    hamburger.getPrice(Hamburger.priceButton, Hamburger.priceSpan);
    hamburger.getCallories(Hamburger.callButton, Hamburger.callSpan);
})();