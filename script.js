// const calculatorDisplay = document.querySelector(".calculator-display");
// const calculatorButtons = document.querySelector(".calculator-buttons");
// const btnNumber = document.querySelector(".btn-number");
// const btnOperation = document.querySelector(".btn-operator");
// const allBtn = document.querySelectorAll("button");

// const ADD = "+";
// const MINUS = "-";
// const MULTIPLY = "*";
// const DIVISON = "/";
// const op2 = {
//   [ADD]: ADD,
//   [MINUS]: MINUS,
//   [MULTIPLY]: MULTIPLY,
//   [DIVISON]: DIVISON,
// };
// allBtn.forEach((btn, index) => {
//   btn.addEventListener("click", function () {
//     Display(btn.textContent);
//   });
// });

// const displayArr = [];
// const arrNumber = [];
// const arrOpration = [];
// let result;
// function Display(btnValue) {
//   if (btnValue === "C") {
//     clearDisplay();
//   }

//   if (displayArr.length > 0) {
//     if (Number(displayArr[displayArr.length - 1])) {
//       !isNaN(btnValue) && displayArr.indexOf(result) === -1
//         ? (displayArr[displayArr.length - 1] =
//             displayArr[displayArr.length - 1] + btnValue)
//         : displayArr.push(btnValue);
//     }
//     if (isNaN(displayArr[displayArr.length - 1])) {
//       if (Number(btnValue)) displayArr.push(btnValue);
//       else displayArr[displayArr.length - 1] = btnValue;
//     }
//     console.log("dffgffffg");

//     if (btnValue === "=") {
//       displayArr.forEach((val) => {
//         const operator = op2[val];
//         console.log({ operator, val, displayArr, op2 });
//         if (operator) calculResult(op2[operator]);
//       });
//       console.log("result", result);
//       calculatorDisplay.value = result;
//       displayArr.length = 0;
//       displayArr.push(result);
//     }
//   }
//   if (displayArr.length === 0 && Number(btnValue)) {
//     console.log();
//     displayArr.push(btnValue);
//   }
//   if (displayArr.length > 0 && displayArr.indexOf(result) !== -1) {
//     console.log("thre is result", displayArr[displayArr.indexOf(result)]);

//     if (!isNaN(Number(btnValue))) {
//       console.log("thre is number");
//       displayArr.length = 1;
//     }
//     if (btnValue === "=") {
//       displayArr.length = 1;
//       displayArr[0] = displayArr[0];
//     }
//   }

//   calculatorDisplay.value = displayArr.join("").toString();
// }

// function calculResult(operator) {
//   const firstElement = Number(displayArr[0]);
//   const op = {
//     "+": (acc, curr) => Number(acc + Number(curr)),
//     "-": (acc, curr) => Number(acc - Number(curr)),
//     "*": (acc, curr) => Number(acc * Number(curr)),
//     "/": (acc, curr) => Number(acc / Number(curr)),
//   };

//   const defaultValue = {
//     "-": firstElement,
//     "/": firstElement,
//     "*": 1,
//   };
//   console.log("def", defaultValue);
//   const arrayOfNumber = displayArr
//     .filter((el) => !isNaN(Number(el)))
//     .map(Number);
//   console.log({ arrayOfNumber });
//   if (["/", "-"].includes(operator)) {
//     result = arrayOfNumber?.reduce((acc, curr) => {
//       console.log(op[operator]);
//       const fn = op[operator];
//       return fn(acc, curr);
//     });
//     return;
//   }
//   result = arrayOfNumber?.reduce((acc, curr) => {
//     const fn = op[operator];
//     return fn(acc, curr);
//   }, defaultValue[operator] || 0);
// }

// function clearDisplay() {
//   arrNumber.length = 0;
//   arrOpration.length = 0;
//   displayArr.length = 0;
//   calculatorDisplay.value = 0;
// }

const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorButtons = document.querySelector(".calculator-buttons");
const btnNumber = document.querySelector(".btn-number");
const btnOperation = document.querySelector(".btn-operator");
const allBtn = document.querySelectorAll("button");

allBtn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    Display(event.target.textContent);
  });
});
const op2 = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
};
const displayArr = [];
let result;

function Display(btnValue) {
  console.log({ displayArr });
  console.log({ btnValue });
  const actions = {
    C: clearDisplay,
    number: handleNumberInput,
    decimal: handleDecimalInput,
    operator: handleOperatorInput,
    equals: calculateAndDisplayResult,
  };

  const caseType = getCaseType(btnValue);
  console.log({ caseType });
  if (caseType && actions[caseType]) {
    actions[caseType](btnValue);
  }
  calculatorDisplay.value = displayArr.join("").toString();
}

function getCaseType(btnValue) {
  const caseTypes = {
    C: btnValue === "C",
    number: !isNaN(Number(btnValue)) && isFinite(btnValue),
    operator: op2.hasOwnProperty(btnValue),
    decimal: btnValue === ".",
    equals: btnValue === "=",
  };
  return Object.keys(caseTypes).find((caseType) => caseTypes[caseType]) || null;
}

function handleNumberInput(btnValue) {
  const isNumber = (value) => !isNaN(value);
  const lastElement = displayArr.length - 1;
  const isResultNotPresent = displayArr.indexOf(result) === -1;
  if (displayArr.length > 0) {
    displayArr.indexOf(result) &&
    isNumber(btnValue) &&
    isNumber(displayArr[lastElement])
      ? (displayArr[lastElement] += btnValue)
      : isNaN(displayArr[lastElement])
      ? displayArr.push(btnValue)
      : "";
  }
  if (displayArr.length === 0 && isNumber(btnValue)) {
    displayArr.push(btnValue);
  }
}

function handleOperatorInput(btnValue) {
  const lastElement = displayArr.length - 1;
  !isNaN(displayArr[lastElement])
    ? displayArr.push(btnValue)
    : (displayArr[lastElement] = btnValue);
}

function handleDecimalInput(btnValue) {
  const lastElement = displayArr.length - 1;
  const hasDecimal = displayArr[lastElement].includes(".");
  if (!hasDecimal) {
    displayArr[lastElement] += btnValue;
  }
}

function calculateAndDisplayResult() {
  displayArr.forEach((val) => {
    const operator = op2[val];
    operator && calculateResult(op2[operator]);
  });

  calculatorDisplay.value = result;
  displayArr.length = 0;
  displayArr.push(result);
}

const op = {
  "+": (acc, curr) => Number(acc + Number(curr)),
  "-": (acc, curr) => Number(acc - Number(curr)),
  "*": (acc, curr) => Number(acc * Number(curr)),
  "/": (acc, curr) => Number(acc / Number(curr)),
};

function calculateResult(operator) {
  const firstElement = Number(displayArr[0]);
  const defaultValue = {
    "-": firstElement,
    "/": firstElement,
    "*": 1,
  };

  const arrayOfNumber = displayArr
    .filter((el) => !isNaN(Number(el)))
    .map(Number);

  if (["/", "-"].includes(operator)) {
    result = arrayOfNumber?.reduce((acc, curr) => {
      const fn = op[operator];
      return fn(acc, curr);
    });
    return;
  }

  result = arrayOfNumber?.reduce((acc, curr) => {
    const fn = op[operator];
    return fn(acc, curr);
  }, defaultValue[operator] || 0);
  return result;
}
console.log({ result });
function clearDisplay() {
  displayArr.length = 0;
  calculatorDisplay.value = 0;
}
