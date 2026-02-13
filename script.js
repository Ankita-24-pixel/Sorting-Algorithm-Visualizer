const size = document.getElementById('size');
const array = document.getElementById('enterarray');
const generate = document.getElementById('generate');
const printArray = document.getElementById('array');
const container = document.getElementById('container');
const result = document.getElementById('result');

const bubble = document.getElementById('bubble');
const selection = document.getElementById('selection');
const insertion = document.getElementById('insertion');
const merge = document.getElementById('merge');
const count = document.getElementById('count');
const radix = document.getElementById('radix');

let arr = [];
generate.addEventListener('click', () =>{
    container.innerHTML = "";
    const n = Number(size.value);
    const arrInput = array.value.trim();
    if(!n || n <= 0){
        alert("Please enter a valid array");
        return;
    }
    if(arrInput === ""){
        alert("Please enter array elements");
        return;
    }
    arr = arrInput.split(/[\s,]+/).map(x => Number(x));
    if(arr.length !== n){
        alert(`Please enter array of size ${n} elements`);
        return;
    }
    for(let val of arr){
        if(isNaN(val)){
            alert("Array must contain only numbers");
            return;
        }
    }
    arr.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.innerText = value;
        container.appendChild(bar);
    });
    console.log(arr);
    printArray.textContent = "Your Array is: " + arr;
    // size.value = "";
    // array.value = "";
}) 
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function bubbleSort(){
    let bars = document.getElementsByClassName("bar");

    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<arr.length-i-1; j++){
            bars[j].style.backgroundColor = "#ef4444";
            bars[j+1].style.backgroundColor = "#ef4444";

            await sleep(1000);

            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

                bars[j].innerText = arr[j];
                bars[j+1].innerText = arr[j+1];
            }
            bars[j].style.backgroundColor = "#3b82f6";
            bars[j+1].style.backgroundColor = "#3b82f6";

        }
        bars[arr.length-i-1].style.backgroundColor = "#22c55e";
    }
    bars[0].style.backgroundColor = "#22c55e";
    result.innerText = "Congratulations!! Your array is sorted now"
}
bubble.addEventListener('click', bubbleSort);

