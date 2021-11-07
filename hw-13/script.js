(() => {
    function Accordion(element) {
        "use strict"
        this.element = element;
        const childs = element.children;
        this.toggle = function (index) {
            for (let index = 0; index < childs.length; index++) {
                childs[index].addEventListener('click', function () { 
                    if (this.classList.contains('accordion-item-active')) {
                        this.classList.remove('accordion-item-active');
                    } else {
                        for (let i = 0; i < childs.length; i++) {
                            childs[i].classList.remove('accordion-item-active');
                        }
                        this.classList.toggle('accordion-item-active');
                    }
                }) 
            }
        };
        this.addBlock = function(title, description) {
            const newBlock = document.createElement('div');
            const newBtnBox = document.createElement('div');
            const newTitle = document.createElement('button');
            const newInfo = document.createElement('p');
            this.element.appendChild(newBlock);
            newBlock.classList.add('accordion-item');
            newBlock.appendChild(newBtnBox);
            newBtnBox.classList.add('btn-box');
            newBtnBox.appendChild(newTitle);
            newTitle.classList.add('btn');
            newBlock.appendChild(newInfo);
            newInfo.classList.add('info');
            newTitle.innerText = `${title}`;
            newInfo.innerText = `${description}`;
        };
        this.getOpenIndexes = function() {
            for (let i = 0; i < childs.length; i++) {
                childs[i].addEventListener('click', function () { 
                    if (childs[i].classList.value == 'accordion-item accordion-item-active') {
                        console.log(`Opened index is: ${i}`);
                    }
                }) 
            }

            //OR, if we need to see the history of opened indexes:

            // const result = [];
            // for (let i = 0; i < childs.length; i++) {
            //     childs[i].addEventListener('click', function () { 
            //         if (childs[i].classList.value == 'accordion-item accordion-item-active') {
            //             result.push(i);
            //         }
            //         console.log(`Opened indexes are: ${result}`);
            //     }) 
            // }
        };
        this.closeAll = function() {
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].classList.value == 'accordion-item accordion-item-active') {
                    childs[i].classList.toggle('accordion-item-active');
                } 
            }
        };
        this.openAll = function() {
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].classList.value !== 'accordion-item accordion-item-active') {
                    childs[i].classList.toggle('accordion-item-active');
                } 
            }
        }    
    }

    const mainAccordion = new Accordion(document.getElementById('accordion'));
    mainAccordion.addBlock(`Node.js`, `Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.`);
    mainAccordion.toggle(0);
    mainAccordion.getOpenIndexes();
})();
