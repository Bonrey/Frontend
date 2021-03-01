// ============================== DISCLAIMER ==============================
// This code is a mess, and it should be split into different files, I know.
// But come on, it is my first big project, and I can be excused, can't I?

const previous = document.getElementById("previous");
const current = document.getElementById("current");


// makes "_" blink when there is no output
let blinkID; // used for clearInterval()
current.style.opacity = "1";

function startTextBlink() {
  blinkID = setInterval(() => {
    current.style.opacity = (1 - current.style.opacity).toString();
  }, 650);
}

startTextBlink();  // run for the first time


// stops text blinking
function stopTextBlink() {
  current.style.opacity = "1";
  clearInterval(blinkID);
}


// updates the output font-size
function updateOutput() {
  const prevLen = previous.innerText.length;
  const currLen = current.innerText.length;
  if (prevLen <= 18) {
    previous.style.fontSize = "1.5rem";
  } else {
    previous.style.fontSize = "1.2rem";
    previous.scrollLeft = 10000;
  }
  if (currLen <= 10) {
    current.style.fontSize = "2.5rem";
  } else if (currLen >= 11 && currLen <= 13) {
    current.style.fontSize = "2rem";
  } else {
    current.style.fontSize = "1.5rem";
    current.scrollLeft = 10000;
  }
}


// checks whether the input is a correct expression
function isExpression(input) {
  return !/^[=_]|^-?\d*\.?\d*[-×/+]?$/.test(input);
}


// corrects the raw expression
function parseExpression(input) {
  let result = input.slice();
  if (/[-.×/+]$/.test(result)) {
    result = result.slice(0, -1);
  }
  const addParenthesesReg = /(\/-|×-)\d+\.?\d*/g;
  const matches = result.match(addParenthesesReg);
  for (let i = 0, len = matches == null ? 0 : matches.length; i < len; i++) {
    result = result.replace(matches[i], matches[i].slice(0, 1) + "(" + matches[i].slice(1) + ")");
  }
  return result;
}

function cleanOutput(output) {
  if (output === Infinity) return "∞";
  if (output === -Infinity) return "-∞";
  if (Number.isNaN(output)) return "error";
  const integerLen = Math.trunc(output).toString().length;
  if (integerLen > 14) {
    return output.toExponential(8);
  }
  let decMax = Math.min(16 - integerLen, 8), decimals = 0;
  let outputFixed = Number.parseFloat(output.toFixed(decimals));
  const eps = 1e-17;
  while (Math.abs(output - outputFixed) > eps && decimals < decMax) {
    decimals++;
    outputFixed = Number.parseFloat(output.toFixed(decimals));
  }
  return outputFixed;
}


// evaluates the expression
function evaluateExpression(input) {
  let result = eval(input.replace(/×/g, "*"));
  return cleanOutput(result);
}


// checks if there's an extra character in the string
function containsExtra(str) {
  return /[ie∞]/.test(str);
}


// digits
function onDigitClick(e) {
  let target = e.target === undefined ? e : e.target;
  stopTextBlink();
  let currVal = current.innerText;
  let digit = target.innerText;
  if (/^=|^[_0]$/.test(currVal)) {
    previous.innerText = "";
    current.innerText = digit;
  } else {
    current.innerText += digit;
  }
  updateOutput();
}

const digits = document.getElementsByClassName("digit-btn");
for (let i = 0; i < 10; i++) {
  digits[i].addEventListener("click", onDigitClick);
}


// decimal point
function onDecimalClick() {
  let currVal = current.innerText;
  if (/^[=_]/.test(currVal)) {
    stopTextBlink();
    previous.innerText = "";
    current.innerText = "0.";
  } else if (!/\.\d*$/.test(currVal)) {
    stopTextBlink();
    if (/[-×/+]$/.test(currVal)) {
      current.innerText += "0.";
    } else {
      current.innerText += ".";
    }
  }
  updateOutput();
}

document.getElementById("decimal").addEventListener("click", onDecimalClick);


// clear-all button
function clearAll() {
  stopTextBlink();
  previous.innerText = "";
  current.innerText = "_";
  startTextBlink();
  updateOutput();
}

document.getElementById("clear").addEventListener("click", clearAll);


// clear-last-symbol button
function clearLast() {
  stopTextBlink();
  let currVal = current.innerText;
  if (containsExtra(currVal)) {
    clearAll();
  } else if (currVal.length <= 1 || /^([-=]|=-)\d$/.test(currVal)) {
    previous.innerText = "";
    current.innerText = "_";
    startTextBlink();
  } else if (/^=/.test(currVal)) {
    previous.innerText = "";
    current.innerText = currVal.slice(1, -1);
  } else {
    current.innerText = currVal.slice(0, -1);
  }
  updateOutput();
}

document.getElementById("clear-last").addEventListener("click", clearLast);


// square root
function onSqrtClick() {
  let currVal = current.innerText;
  let curr;
  if (/^_/.test(currVal) || containsExtra(currVal)) {
    clearAll();
    return;
  }
  stopTextBlink();
  if (isExpression(currVal)) {
    let trueExpression = parseExpression(currVal);
    curr = evaluateExpression(trueExpression);
    previous.innerText = "√(" + trueExpression + ")";
  } else {
    if (/^=/.test(currVal)) {
      currVal = currVal.slice(1);
    }
    curr = Number.parseFloat(currVal);
    if (curr < 0) {
      previous.innerText = "√(" + currVal + ")";
    } else {
      previous.innerText = "√" + currVal;
    }
  }
  const sqrt = cleanOutput(Math.sqrt(Math.abs(curr)));
  current.innerText = "=" + (sqrt === 1 && curr < 0 ? "" : sqrt) + (curr < 0 ? "i" : "");
  updateOutput();
}

document.getElementById("sqrt").addEventListener("click", onSqrtClick);


// basic operations
function onOperationsClick(e) {
  let target = e.target === undefined ? e : e.target;
  let currVal = current.innerText;
  previous.innerText = "";
  if (target.id === "subtract" && (/^_/.test(currVal) || containsExtra(currVal))) {
    stopTextBlink();
    current.innerText = "-";
  } else if (containsExtra(currVal)) {
    clearAll();
  } else if (/^=/.test(currVal)) {
    stopTextBlink();
    current.innerText = currVal.slice(1) + target.innerText;
  } else if (/[.\d]$/.test(currVal)) {
    stopTextBlink();
    if (/\.$/.test(currVal)) {
      currVal = currVal.slice(0, -1);
    }
    current.innerText = currVal + target.innerText;
  } else if (/\d[-+]$/.test(currVal)) {
    stopTextBlink();
    current.innerText = currVal.slice(0, -1) + target.innerText;
  } else if (/[×/]$/.test(currVal)) {
    stopTextBlink();
    if (target.id !== "subtract") {
      current.innerText = currVal.slice(0, -1) + target.innerText;
    } else {  // target.id == "subtract"
      current.innerText += "-";
    }
  }
  updateOutput();
}

const operations = document.querySelectorAll("#add, #subtract, #multiply, #divide");
for (let i = 0; i < 4; i++) {
  operations[i].addEventListener("click", onOperationsClick);
}


// equals sign
function onEqualsClick() {
  let currVal = current.innerText;
  if (/^-$/.test(currVal) || containsExtra(currVal)) {
    clearAll();
  } else if (/^=/.test(currVal)) {
    if (!containsExtra(currVal)) {
      stopTextBlink();
      previous.innerText = "";
      current.innerText = currVal.slice(1);
    } else {
      clearAll();
    }
  } else if (isExpression(currVal)) {
    stopTextBlink();
    let trueExpression = parseExpression(currVal);
    previous.innerText = trueExpression;
    current.innerText = "=" + evaluateExpression(trueExpression);
  } else if (/\d+[-.×/+]$/.test(currVal)) {
    stopTextBlink();
    current.innerText = currVal.slice(0, -1);
  }
  updateOutput();
}

document.getElementById("equals").addEventListener("click", onEqualsClick);


// add keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "c" || e.key === "Escape") {
    clearAll();
  } else if (e.key === "Backspace") {
    clearLast();
  } else if (e.key === "=" || e.key === "Enter") {
    onEqualsClick();
  } else if (e.key === ".") {
    onDecimalClick();
  } else if (e.key === "q") {
    onSqrtClick();
  } else if (/[-*/+]/.test(e.key)) {
    const operations = {"-": "subtract", "*": "multiply", "/": "divide", "+": "add"};
    onOperationsClick(document.getElementById(operations[e.key]));
  } else if (/^\d$/.test(e.key)) {
    const digitNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    onDigitClick(document.getElementById(digitNames[e.key]));
  }
});
