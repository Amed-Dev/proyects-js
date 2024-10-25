const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => context.querySelectorAll(selector);

let answerOutput = $("input[name='ans']");
const operators = ["+", "-", "×", "÷"];

const evaluateExpression = (expression) => {
  try {
    const sanitizedExpression = expression.replace("×", "*").replace("÷", "/");
    return Function('"use strict"; return (' + sanitizedExpression + ")")();
  } catch (error) {
    return "Error";
  }
};

const calculatePercentage = (expression) => {
  let lastNumberMatch = expression.match(/(\d+(\.\d+)?)(?!.*\d)/);
  
  if (lastNumberMatch) {
    let lastNumber = lastNumberMatch[0];
    return expression.slice(0, -lastNumber.length) + lastNumber / 100;
  }
  return expression;
};

const isLastCharNumber = () => /\d$/.test(answerOutput.value);

$$("button[type='button']").forEach((input) => {
  input.addEventListener("click", (e) => {
    let value = e.currentTarget.value;

    if (value == "=") {
      answerOutput.value = evaluateExpression(answerOutput.value);
    } else if (value == "C") {
      answerOutput.value = "";
    } else if (value == "⌫") {
      answerOutput.value = answerOutput.value.slice(0, -1) || "0";
    } else if (value == "%") {
      answerOutput.value = calculatePercentage(answerOutput.value);
    } else if (operators.includes(value)) {
      if (isLastCharNumber()) {
        answerOutput.value += value;
      }
    } else {
      if (answerOutput.value === "0") {
        answerOutput.value = value;
      } else {
        answerOutput.value += value;
      }
    }
  });
});
