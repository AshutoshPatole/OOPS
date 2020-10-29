class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // whenever we load the calculator we clear the output screen
        this.clear();
    }

    // clear function is for AC button in the calculator
    // which set all values to default
    clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
        }
        // clear function is to delete recent number typed in the calculator.
        // which is DEL button
    delete() {
        // We convert the current typed input into string and then slice the last number from the string.
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // appendNumbers funtion is used to add the output to the screen
    // 1 ==> 12 ==> 123
    appendNumbers(number) {
        // while adding the numbers to the screen we check whether . is already present
        // in the current input. If so, we simply return and stop further statements.
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        // We convert the currentOperand and typed number into string since while appending,
        // we do not want our input to be 4 instead of 22 while typing 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // shiftOperandToUpperDiv is used to shift the number up to another div,
    // when an operator is chose;
    shiftOperandToUpperDiv(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }

        // if the previous operand already holds a number then
        // after choosing another operator we simply perform operation on previous inputs
        // e.x ==> if we type 1 + 2 and then hit + 5 again then, 1 + 2 will be computed to 3 and then
        // 3 + 5 is performed; 
        if (this.previousOperand !== '') {
            this.computeNumbers();
        }
        this.operation = operation;
        // swapping the operands here to shift current operand to previous operand 
        // and setting '' to current operand
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    computeNumbers() {
        let sum;
        // converting string to float
        const previousVal = parseFloat(this.previousOperand);
        const currentVal = parseFloat(this.currentOperand);

        // if previousVal and currentVal is not a number then simply do nothing
        if (isNaN(previousVal) || isNaN(currentVal)) {
            return;
        }
        switch (this.operator) {
            case '+':
                sum = previousVal + currentVal;
                break;
            case '-':
                sum = previousVal - currentVal;
                break;
            case '*':
                sum = previousVal * currentVal;
                break;
            case '÷':
                sum = previousVal / currentVal;
                break;
            default:
                return;
        }
        this.currentOperand = sum;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        // @todo Uncaught TypeError: Cannot set property 'innerText' of undefined
        // at Calculator.updateDisplay (index.js:108)
        // at HTMLButtonElement.<anonymous>

        this.currentOperandText.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operator != null) {
            this.previousOperandText.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumbers(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})