const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;   // 2. ve sonraki girilecek degerler icin

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

// tikladigimiz elemani aliyoruz
keys.addEventListener('click', function(e){
    const element = e.target;
    const value = element.value;
    // divdeki herhangi bir alana degil, sadece butonlara tiklandiginda sec
    if(!element.matches('button')) return;

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);  
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
            break;
    }
    updateDisplay();
});

function handleOperator (nextOperator) {
    // onceden girilmis bir deger olabilir. o yuzden gorunen degeri aliyoruz
    const value = parseFloat(displayValue); 
    // operatoru guncelleyelim
    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    // ilk deger yoksa ilk degeri aldik
    if(firstValue === null) {
        firstValue = value;
    } else if(operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;             // global tanimlanan operatore aldik

    // console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate (first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if(operator === '-') {
        return first - second;
    } else if(operator === '*') {
        return first * second;
    } else if(operator === '/') {
        return first / second;
    }
    return second;          // demek ki esittir butonuna tiklandi
}


function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {displayValue = displayValue === '0' ? num : displayValue + num;
    }
    // console.log(displayValue, firstValue, operator, waitingForSecondValue);
}
// sadece bir tane nokta ekle, daha önce girilmisse ekleme
function inputDecimal() {
    if(!displayValue.includes('.')) {
       displayValue += '.';
    }
}

function clear () {
    displayValue = '0';
}