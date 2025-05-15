var num1;
var num2;
var result;
function getValues() {
    var val1 = document.getElementById('value1').value;
    var val2 = document.getElementById('value2').value;
    num1 = Number(val1);
    num2 = Number(val2);
    if (val1 === '' || val2 === '' ||
        isNaN(num1) || isNaN(num2)) {
        alert('Please Enter valid numbers in both fields');
        throw new Error('Invalid input!!');
    }
}
function displayResult(value) {
    document.getElementById('result').value = String(value);
}
function addition() {
    getValues();
    result = num1 + num2;
    displayResult(result);
}
function subtraction() {
    getValues();
    result = num1 - num2;
    displayResult(result);
}
function multiplication() {
    getValues();
    result = num1 * num2;
    displayResult(result);
}
function divition() {
    getValues();
    if (num2 == 0) {
        displayResult('Cannot Divide by Zero');
        return;
    }
    result = num1 / num2;
    displayResult(result);
}
