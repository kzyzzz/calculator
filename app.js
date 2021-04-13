let firstNumber = undefined;
    let secondNumber = undefined;
    let operator = undefined; 
    let answer = 0;
    let newInput = true;
    let display = document.querySelector('.display');
    let buttons = document.querySelectorAll('button');
    let point = document.querySelector('#point');


    window.addEventListener('keydown', (e)=>{
        let btn = document.getElementById(`${e.key}`);
        if (e.key == '.') btn = document.getElementById('point');
        if (e.key == 'Escape') btn = document.getElementById('clear');
        if (e.key == 'Enter') btn = document.getElementById('total');
                
        if (btn) {
            btn.click();
            btn.focus();
        }   
                         
    })

    
    buttons.forEach((button) =>{
        button.classList.add('btn', 'btn-primary', 'btn-lg');
    })

    buttons.forEach((button)=>{
        button.addEventListener('click',()=>{
            if (button.classList.contains('num')) {
                numpress(button.textContent);
            }

            if (button.classList.contains('func')) {
                funcpress(button.textContent);
            }

            if (button.id == 'clear') {
                clear();
                display.textContent = '0';
                newInput = true;
            }

            if (button.id == 'total') {
                total();
            }

            if (button.id == 'Backspace') {
                backspace();
            }

            if (button.id == '%') {
                getpercent();
            }

        })
    })

    function backspace(){
        let numArray = display.textContent.split('');
        if (numArray.length == 1) {
            numArray[0] = 0;
            newInput = true;
        } else {
            numArray.pop();
            if (numArray[numArray.length -1] == '.') numArray.pop()
        }
        display.textContent = numArray.join('');
    }

    function numpress(num){
        if (num === '.') {
            point.setAttribute('disabled', true);
        }
        if (newInput && num ==='.'){
            newInput = false;
            display.textContent = '0';
        }
        if (newInput) {
            display.textContent = '';
            newInput = false;
            point.removeAttribute('disabled');
        }
        display.textContent += num;
    }

    function funcpress(func){
        if (!parseFloat(display.textContent)) return undefined; 
        if (firstNumber === undefined) {
            firstNumber = display.textContent;
        } else if (!newInput) {
            secondNumber = display.textContent;
            firstNumber = operate();
        }
        point.removeAttribute('disabled');
        operator = func;
        newInput = true;
    }

    function clear(){       //clears display
        display.textContent = '';
        firstNumber = undefined;
        point.removeAttribute('disabled');
    }

    function total(){
        if (firstNumber === undefined && secondNumber !== undefined) {
            firstNumber = display.textContent;
            operate();
        } else if (firstNumber !== undefined){
            secondNumber = display.textContent;
            operate();
        }
    }

    function getpercent(){
        if (firstNumber !== undefined && operator !== undefined) {
   
            let percent = parseFloat(display.textContent);
            let result = firstNumber * percent / 100; 
            result = Math.round(result*1000000)/1000000;
            newInput = true;
            display.textContent = result;
            return result;
        }
        return undefined;
    }

    function operate(){

        if (firstNumber === undefined || secondNumber === undefined || operator === undefined) {
            alert("Something went wrong");
            clear();
            return undefined;
        };

        let result = undefined;
        let valOne = parseFloat(firstNumber);
        let valTwo = parseFloat(secondNumber);
        switch(operator) {
            case('+'):
                result = valOne + valTwo;
                break;
            case('-'):
                result = valOne - valTwo;
                break;
            case('*'):
                result = valOne * valTwo;
                break;
            case('/'):
                if (valTwo == 0) {
                    
                    clear();
                    display.textContent='Error';
                    newInput = true;
                    return undefined;
                }
                result = valOne / valTwo;
                break;
        }
        clear();
        newInput = true;
        result = Math.round(result*1000000)/1000000;
        display.textContent = result;
        return result;
    }