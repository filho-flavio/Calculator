// HTML Elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operators");
const btEqual = document.getElementById("btEqual");
const btClean = document.getElementById("btClean");
const btDot = document.getElementById("btDot");
const btBackspace = document.getElementById("btBackspace");

// Variables
let num = "";
let current = "";
let old = "";
let operator = "";

// Add events to number buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    num += button.textContent;
    updateDisplay();
  });
});

// Add events to operators
operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (num === "") {
      return;
    }
    if (current === "") {
      current = num;
      num = "";
    } else {
      old = num;
      num = "";
      calculate();
    }
    operator = op.textContent;
  });
});

// Function to update the display
function updateDisplay() {
  display.textContent = num;
}

// Function to perform calculations
function calculate() {
  switch (operator) {
    case "÷":
      if (parseFloat(current) === 0) {
        cleanDisplay();
        display.textContent = "Error";
      } else {
        num = (parseFloat(current) / parseFloat(old)).toString();
        console.log(num);
      }
      break;
    case "x":
      num = (parseFloat(old) * parseFloat(current)).toString();
      break;
    case "-":
      num = (parseFloat(current) - parseFloat(old)).toString();
      break;
    case "+":
      num = (parseFloat(old) + parseFloat(current)).toString();
      break;
  }
  operator = "";
  old = "";
  current = num;
  updateDisplay();
}

// Add event to equals button
btEqual.addEventListener("click", calculate);

// Function to clear the display
function cleanDisplay() {
  num = "";
  operator = "";
  old = "";
  current = "";
  updateDisplay();
}

// Add event to clear button
btClean.addEventListener("click", cleanDisplay);

// Add event to decimal point button
btDot.addEventListener("click", () => {
  if (!num || isNaN(num)) return false;
  if (num.indexOf(".") === -1) {
    num += ".";
    updateDisplay();
  }
});

// Add event to backspace button
btBackspace.addEventListener("click", () => {
  num = num.slice(0, -1);
  updateDisplay();
});
