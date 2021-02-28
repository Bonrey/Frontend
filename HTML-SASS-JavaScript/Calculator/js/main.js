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


  return /[-.×/+]$/.test(result) ? result.slice(0, -1) : result;
}

// evaluates the expression
function evaluateExpression(input) {
  const result = eval(input.replace(/×/g, "*"));
  let decimals = 0;
  let multiplier = 1;
  while (result * multiplier % 1 !== 0 && decimals < 8) {
    decimals++;
    multiplier *= 10;
  }
  return result.toFixed(decimals);
}

// digits
const digits = document.getElementsByClassName("digit-btn");
for (let i = 0; i < 10; i++) {
  digits[i].addEventListener("click", () => {
    stopTextBlink();
    let currVal = current.innerText;
    let digit = digits[i].innerText;
    if (/^=|^_$/.test(currVal)) {
      previous.innerText = "";
      current.innerText = digit;
    } else {
      current.innerText += digit;
    }
    updateOutput();
  });
}

// decimal point
document.getElementById("decimal").addEventListener("click", () => {
  let currVal = current.innerText;
  if (/^[=_]/.test(currVal)) {
    stopTextBlink();
    previous.innerText = "";
    current.innerText = "0.";
  } else if (!/\./.test(currVal)) {
    stopTextBlink();
    if (/[-×/+]$/.test(currVal)) {
      current.innerText += "0.";
    } else {
      current.innerText += ".";
    }
  }
  updateOutput();
});

// clear-all button
const clearAllBtn = document.getElementById("clear");
function clearAll() {
  stopTextBlink();
  previous.innerText = "";
  current.innerText = "_";
  startTextBlink();
  updateOutput();
}
clearAllBtn.addEventListener("click", clearAll);

// clear-last-symbol button
document.getElementById("clear-last").addEventListener("click", () => {
  stopTextBlink();
  let currVal = current.innerText;
  if (currVal.length <= 1 || /^([-=]|=-)\d$/.test(currVal)) {
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
});

// square root
document.getElementById("sqrt").addEventListener("click", () => {
  let currVal = current.innerText;
  let curr;
  if (/^_|i/.test(currVal)) {
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
    previous.innerText = "√" + currVal;
  }
  const sqrt = Math.sqrt(Math.abs(curr));
  current.innerText = "=" + (sqrt % 1 !== 0 ? sqrt.toFixed(8) : sqrt) + (curr < 0 ? "i" : "");
  updateOutput();
});

// basic operations
const operations = document.querySelectorAll("#add, #subtract, #multiply, #divide");
for (let i = 0; i < 4; i++) {
  operations[i].addEventListener("click", () => {
    let currVal = current.innerText;
    previous.innerText = "";
    if (operations[i].id === "subtract" && /^_/.test(currVal)) {
      stopTextBlink();
      current.innerText = "-";
    } else if (/^=/.test(currVal)) {
      stopTextBlink();
      current.innerText = currVal.slice(1) + operations[i].innerText;
    } else if (/[.\d]$/.test(currVal)) {
      stopTextBlink();
      if (/\.$/.test(currVal)) {
        currVal = currVal.slice(0, -1);
      }
      current.innerText = currVal + operations[i].innerText;
    } else if (/\d[-+]$/.test(currVal)) {
      stopTextBlink();
      current.innerText = currVal.slice(0, -1) + operations[i].innerText;
    } else if (/[×/]$/.test(currVal)) {
      stopTextBlink();
      if (operations[i].id !== "subtract") {
        current.innerText = currVal.slice(0, -1) + operations[i].innerText;
      } else {  // operations[i].id == "subtract"
        current.innerText += "-";
      }
    }
    updateOutput();
  });
}

// equals sign
document.getElementById("equals").addEventListener("click", () => {
  let currVal = current.innerText;
  if (/^-$|i/.test(currVal)) {
    clearAll();
  } else if (/^=/.test(currVal)) {
    stopTextBlink();
    previous.innerText = "";
    current.innerText = currVal.slice(1);
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
});
