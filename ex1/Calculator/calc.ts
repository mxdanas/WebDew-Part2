let num1: number;
let num2: number;
let result: number|string;

function getValues(): void{
    const val1 = (document.getElementById('value1') as HTMLInputElement).value;
    const val2 = (document.getElementById('value2') as HTMLInputElement).value;

    num1 = Number(val1);
    num2 = Number(val2);
    if(val1==='' || val2==='' ||
         isNaN(num1) ||isNaN(num2)){
            alert('Please Enter valid numbers in both fields');
            throw new Error('Invalid input!!');
    }
}
function displayResult(value:(string | number)):void{
    (document.getElementById('result') as HTMLInputElement).value = String(value);
}
function addition(): void{
    getValues();
    result = num1 + num2;
    displayResult(result);
}
function subtraction(): void{
    getValues();
    result = num1 - num2;
    displayResult(result);
}
function multiplication(): void{
    getValues();
    result = num1 * num2;
    displayResult(result);
}
function divition(): void{
    getValues();
    if(num2 == 0){
        displayResult('Cannot Divide by Zero');
        return;
    }
    result = num1 / num2;
    displayResult(result);
}
