let fields = document.querySelectorAll("textarea");
let buttons = document.querySelectorAll("button:not(button.operator)");
let operatorButtons = document.getElementsByClassName("operator")
let operatorClicked = false;




for (const button of buttons) {
  button.onclick = function() {
    fields[1].value += button.textContent;
  }
}

for (const operatorButton of operatorButtons) {
  operatorButton.onclick = function() {
    operatorClicked = true;

    fields[0].value += fields[1].value + operatorButton.textContent;
    fields[1].value = ""
  }
}
operatorButtons[0].onclick = function() {
  fields[0].value = "";
  fields[1].value = "";
}

operatorButtons[4].onclick = function() {
  fields[1].value = fields[1].value.substr(0, fields[1].value.length - 1)
}







let operation = "2323232+232323232-23232X32%232/2 ";
let operationRegex = /([+|—|X|%|÷])/;


let operationsMap = {
  "+": function(...numbers) {
    let sum = 0
    numbers.forEach(function(value, index, numbers) {
      numbers[index] = parseFloat(value)
    })

    numbers.forEach(function(value) {
      sum += value;
    });
    return sum;
  },

  "—": function(...numbers) {
    let diffrence = 0
    numbers.forEach(function(value, index, numbers) {
      numbers[index] = parseFloat(value)
    })

    diffrence = parseFloat(numbers[0]) - parseFloat(numbers[1]);
    for (let index = 2; index < numbers.length; index++) {
      diffrence -= parseFloat(numbers[index])
    }
    return diffrence;
  },

  "÷": function(...numbers) {
    let dividend = 0
    numbers.forEach(function(value, index, numbers) {
      numbers[index] = parseFloat(value)
    })

    dividend = parseFloat(numbers[0]) / parseFloat(numbers[1]);

    for (let index = 2; index < numbers.length; index++) {
      dividend /= parseFloat(numbers[index])
    }
    return dividend;
  },
  "X": function(...numbers) {
    let product = 1;
    numbers.forEach(function(value, index, numbers) {
      numbers[index] = parseFloat(value)
    })

    numbers.forEach(function(value) {
      product *= value;
    });
    return product;
  }
}


function calculate(operation) {
  operation = (operationRegex.test(operation[operation.length - 1])) ? operation.substr(0, operation.length - 1) : operation;
  let operators = [];
  let operands = operation.split(/\D/g);

  for (let index = 0; index < operation.length; index++) {
    if (operationRegex.test(operation[index])) {
      operators[operators.length] = operation[index]
    }
  }

  let result = 0;

  for (let i = 0; i < operators.length; i++) {
    result = operationsMap[operators[i]](parseFloat(operands[i]), parseFloat(operands[i + 1]));
    operands[i + 1] = result;
  }

  return result;

}

operatorButtons[7].onclick = function() {

  fields[0].value += fields[1].value;
  fields[1].value = calculate(fields[0].value)
  fields[0].value = "";

}

/**
 * ALGORITHM:
 * Take Inputs
 * Show Operations Calculate
 */