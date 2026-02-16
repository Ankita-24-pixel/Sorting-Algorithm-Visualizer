const size = document.getElementById('size');
const array = document.getElementById('enterarray');
const generate = document.getElementById('generate');
const printArray = document.getElementById('array');
const container = document.getElementById('container');
const result = document.getElementById('result');
const minimum = document.getElementById('min');
const sortedRange = document.getElementById('sortedRange');
const keyE = document.getElementById('key');
const leftSortedA = document.getElementById('leftSortedA');
const rightSortedA = document.getElementById('rightSortedA');

const bubble = document.getElementById('bubble');
const selection = document.getElementById('selection');
const insertion = document.getElementById('insertion');
const merge = document.getElementById('merge');
const count = document.getElementById('count');
const countArray = document.getElementById('countArray');
const radix = document.getElementById('radix');
const buckets = document.getElementById('buckets');

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
async function selectionSort(){
    let bars = document.getElementsByClassName("bar");

    for(let i = 0; i<arr.length; i++){
        let min = i;
        bars[i].style.backgroundColor = "#ef4444";
        for(let j = i+1; j<arr.length; j++){
            bars[j].style.backgroundColor = "#ef4444";

            await sleep(1000);

            if(arr[min] > arr[j]){
                min = j;
            }
            bars[j].style.backgroundColor = "#3b82f6";
            minimum.innerText = `Current smallest element is ${arr[min]}`;

        }
        if(min != i){
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;

            bars[i].innerText = arr[i];
            bars[min].innerText = arr[min];
        }
        bars[i].style.backgroundColor = "#22c55e";
    }
    result.innerText = "Congratulations!! Your array is sorted now"
}
async function insertionSort(){
    let bars = document.getElementsByClassName("bar");

    for(let i = 1; i<arr.length; i++){
        bars[i].style.backgroundColor = "#ef4444";
        let j = i-1;
        let key = arr[i];
        keyE.innerText = `Current key element is ${key}`
        while(j>=0 && arr[j] > key){
            bars[j].style.backgroundColor = "#ef4444";
            await sleep(2000); 
            arr[j+1] = arr[j];
            bars[j+1].innerText = arr[j+1];
            bars[j].style.backgroundColor = "#3b82f6";

            j--;
        }
        arr[j+1] = key;
        bars[j+1].innerText = arr[j+1];
        let list = [];
        for(let k = 0; k<=i; k++){
            bars[k].style.backgroundColor = "#22c55e";
            list.push(arr[k]);
        }
        sortedRange.innerText = `Current sorted window is ${list}`
    }
    result.innerText = "Congratulations!! Your array is sorted now"
}
async function mergeSort(start, end) {

    if(start >= end){
        return;
    }
    let mid = Math.floor((start+end)/2);
     
    await mergeSort(start, mid);
    await mergeSort(mid+1, end);

    await Combine(start, mid, end);
}
async function Combine(start, mid, end){
    let bars = document.getElementsByClassName("bar");

    let left = arr.slice(start, mid+1);
    let right = arr.slice(mid+1, end+1);

    let i = 0, j= 0, k = start;
    while(i<left.length && j<right.length){
        bars[k].style.backgroundColor = "#ef4444";
        await sleep(2000);
        if(left[i] > right[j]){
            arr[k] = right[j];
            bars[k].innerText = arr[k];
            j++;
        }else{
            arr[k] = left[i];
            bars[k].innerText = arr[k];
            i++;
        }
        bars[k].style.backgroundColor = "#22c55e";
        k++;
    }
    while(i<left.length){
        arr[k] = left[i];
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = "#22c55e";
        i++;
        k++;
    }
    while(j<right.length){
        arr[k] = right[j];
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = "#22c55e";
        j++;
        k++;
    }
    
}
async function countSort() {
    let bars = document.getElementsByClassName("bar");
    let max = Math.max(...arr);
    let count = new Array(max + 1).fill(0);
    let output = new Array(arr.length);

    // 🔵 Step 1: Count frequency
    for (let i = 0; i < arr.length; i++) {
        bars[i].style.backgroundColor = "#3b82f6"; // Blue
        await sleep(300);

        count[arr[i]]++;
        
        bars[i].style.backgroundColor = "#6b7280"; // Reset
    }
    let map = new Map();
    for(let i = 0; i<count.length; i++){
        if(count[i] != 0){
            map.set(i, count[i]);
        }
    }
 countArray.innerText = `Count array is ${JSON.stringify([...map])}`;


    // 🟡 Step 2: Build output array
    let k = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {

            // Highlight position being updated
            bars[k].style.backgroundColor = "#facc15"; // Yellow
            await sleep(400);

            output[k] = i;
            arr[k] = i; // Update original array

            // bars[k].style.height = `${i * 5}px`; // Adjust height (change multiplier if needed)
            bars[k].innerText = i;

            await sleep(400);

            bars[k].style.backgroundColor = "#22c55e"; // Green (sorted)

            count[i]--;
            k++;
        }
    }
    result.innerText = "Congratulations!! Your array is sorted now"
}
function createBuckets() {
    const container = document.getElementById("bucket-container");
    container.innerHTML = "";
    buckets.innerText = "Buckets";

    for (let i = 0; i < 10; i++) {
        let bucket = document.createElement("div");
        bucket.classList.add("bucket");
        bucket.id = `bucket-${i}`;
        bucket.innerText = i;  // label
        container.appendChild(bucket);
    }
}

async function radixSort() {
    let bars = document.getElementsByClassName("bar");
    let max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {

        createBuckets();
        let buckets = Array.from({ length: 10 }, () => []);

        // 🔵 Move elements to buckets
        for (let i = 0; i < arr.length; i++) {

            let digit = Math.floor(arr[i] / exp) % 10;

            bars[i].style.backgroundColor = "#a78bfa";
            await sleep(300);

            buckets[digit].push(arr[i]);

            // Visual bucket update
            let bucketDiv = document.getElementById(`bucket-${digit}`);
            let num = document.createElement("div");
            num.innerText = arr[i];
            bucketDiv.appendChild(num);

            bars[i].style.opacity = "0.4";
        }

        // 🟢 Collect back
        let index = 0;
        for (let i = 0; i < 10; i++) {
            while (buckets[i].length > 0) {

                arr[index] = buckets[i].shift();

                // bars[index].style.height = `${arr[index] * 3}px`;
                bars[index].innerText = arr[index];
                bars[index].style.backgroundColor = "#34d399";
                bars[index].style.opacity = "1";

                await sleep(300);
                index++;
            }
        }

        await sleep(500);
    }

    // Final color
    for (let bar of bars) {
        bar.style.backgroundColor = "#22c55e";
    }
}


bubble.addEventListener('click', bubbleSort);
selection.addEventListener('click', selectionSort);
insertion.addEventListener('click', insertionSort);
// merge.addEventListener('click', mergeSort(0, arr.length-1));
merge.addEventListener('click', async function() {
    await mergeSort(0, arr.length - 1);
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#22c55e";
    }

    result.innerText = "Congratulations!! Your array is sorted now";
});
count.addEventListener('click', countSort);
radix.addEventListener('click', radixSort);
