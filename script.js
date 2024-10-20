let inputSlider = document.querySelector("[data-lengthSlider]");
let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let lengthDisplay = document.querySelector("[length-num]");
let CopyBtn = document.querySelector("[data-copy]");
let CopyMsg = document.querySelector("[copy-msg]");
let upperCase = document.querySelector("#uppercase");
let lowerCase = document.querySelector("#lowercase");
let symbolsCheck = document.querySelector("#symbols");
let numbers = document.querySelector("#numbers");
let indicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector("[generate-btn]");
let allCheckBox = document.querySelectorAll("input[type=checkBox]");
let symbols = ' ~`! @#$%^&*()_-+={[}]|\:;"<,>.?/';

let password="";
let passwordLength=10;
let checkCount=1;

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRndInteger(min , max){
    return Math.floor(Math.random()*(max-min)) +min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateRandomLowercase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateRandomUppercase(){
    return String.fromCharCode(getRndInteger(65,91))
}
function generateSymbol(){
    let sym = getRndInteger(0,symbols.length);
    return symbols.charAt(sym);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upperCase.checked) hasUpper=true;
    if(lowerCase.checked) hasLower=true;
    if(numbers.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
    
    if(hasUpper&&hasLower&&hasNum&&hasSym&&passwordLength>=8){
        setIndicator("#1eff00");
    }else if(
        (hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }

}

function shuffleString(str) {
    // String ko ek array mein tod do
    let arr = str.split('');
  
    // Fisher-Yates shuffle algorithm se array ko shuffle karo
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // Random index select karo
      // Swap the elements at index i and j
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    // Shuffle hone ke baad array ko wapas string mein convert karo
    return arr.join('');
  }
  
 
  

  

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        CopyMsg.innerText="copied";
    }catch{
        CopyMsg.innerText="failed";
    }

    CopyMsg.classList.add("active");

    setTimeout(() => {
    CopyMsg.classList.remove("active");
        
    }, 2000);
    
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();

    
})

CopyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

function handleCheckBoxCheck(){
    checkCount=0;
    allCheckBox.forEach((checkBox) => {
        if(checkBox.checked){
            checkCount++;
        }
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('input',(handleCheckBoxCheck));
})


generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";
    
    let arrFun=[];
    if(upperCase.checked){
        arrFun.push(generateRandomUppercase);
    }
    if(lowerCase.checked){
        arrFun.push(generateRandomLowercase);
    }
    if(numbers.checked){
        arrFun.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        arrFun.push(generateSymbol);
    }
    
    for(let i=0 ; i < arrFun.length;i++){
        password+=arrFun[i]();
    }

        for(let i=0;i<passwordLength-arrFun.length;i++){
            let ranFun=getRndInteger(0,arrFun.length);
            password+=arrFun[ranFun]();

        }
        let p=shuffleString(password);
        console.log(typeof password);

    passwordDisplay.value=p;
})