const input = document.querySelector("input");

let numKeys = document.querySelectorAll("#num_key");
for (let key of Array.from(numKeys)){
   key.addEventListener("click", () => {
     input.value = input.value !== "0" ? input.value + key.innerText : key.innerText;
   })
}
window.addEventListener("keydown", (event) => {

})

const buffer = [];

const opCallback = opName => () => {
   let currentVal = parseFloat(input.value);

   if (opName === "percent"){
      currentVal *= 0.01;
      input.value = currentVal;
   }
   else {
      if (buffer && buffer.length){
      buffer.push({value: currentVal});

      const result = evaluate(buffer);

      buffer.push({value: result});
      buffer.push({value: opName});

      input.value = "";
   }
   else {
      buffer.push({value: currentVal});
      buffer.push({value: opName});
      input.value = "";
   }
 }
}
const evaluate = buffer => {
   const secondOperand = buffer.pop().value;
   const operator = buffer.pop().value;
   const firstOperand = buffer.pop().value;

   switch (operator) {
      case "add":
         return firstOperand + secondOperand;
         break;
      case "subtract":
         return firstOperand - secondOperand;
         break;
      case "divide":
         return firstOperand / secondOperand;
         break;
      case "multiply":
         return firstOperand + secondOperand;
         break;
      default:
         return secondOperand;
         break;
   }
}

const operators = ["add", "subtract", "multiply", "divide", "percent"];
for(let opName of operators){
  document.querySelector(`#op_key[op=${opName}`)
  .addEventListener("click", opCallback(opName));
}

let eqaul = document.querySelector("#eq_key");
eqaul.onclick = (event) => {
   if (buffer && buffer.length){
      buffer.push({ value: parseFloat(input.value)});
   input.value = evaluate(buffer);
   }
}
window.addEventListener("keydown", (event) =>{
   if (event.keyCode == 13 && buffer && buffer.length){
      buffer.push({ value: parseFloat(input.value)});
      input.value = evaluate(buffer);
      event.preventDefault();
   }
})

let clear = document.querySelector("#op_key[op=clear");
clear.addEventListener("click", () => {
   input.value = 0;
   buffer.length = 0;
});

let neg = document.querySelector("#op_key[op=negate");
neg.addEventListener("click", () => {
   input.value = -parseFloat(input.value);
})
document.body.addEventListener("keydown", (event) => {
   console.log(event.keyCode);
})