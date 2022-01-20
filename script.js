class Calculator {
  constructor(previous, current) {
    this.previous = previous;
    this.current = current;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation === "Xy" || operation === "y" ? "^" : operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      case "^":
        computation = prev ** curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.current.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previous.innerText = `${this.previousOperand} ${this.operation}`;
    } else this.previous.innerText = "";
  }
}

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const egale = document.querySelector(".span-2");
const CE = document.querySelector(".span-3");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");
const calculator = new Calculator(previous, current);

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.appendNumber(e.target.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    calculator.chooseOperation(e.target.innerText);
    calculator.updateDisplay();
  });
});

egale.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
CE.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
