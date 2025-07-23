// changes
const billInput=document.getElementById('bill');
console.log('Bill Input Element',billInput)

const tipButton=document.querySelectorAll('.tip-percent-btn')  
console.log('Tip Buttons Nodelist',tipButton)

const CustomInput=document.getElementById('custom-tip')
console.log('Custom Tip Id',CustomInput)

const PeopleInput=document.getElementById('num-people')
console.log('People Input Element',PeopleInput)

const TipAmountDisplay=document.getElementById('tip-amount-display')
console.log('Tip Amount Id',TipAmountDisplay)

const TotalAmountDisplay=document.getElementById('total-amount-display')
console.log('Total Amount Id',TotalAmountDisplay)

const ResetButton=document.getElementById('reset-button')
console.log('Reset Button Id',ResetButton)



billInput.addEventListener('input',calculateTip);

tipButton.forEach((button)=>{
    button.addEventListener('click',(event) => {
       const clickedButton=event.target;
       const tipPercent=clickedButton.dataset.tip;
       tipButton.forEach(button => button.classList.remove('active'));
       clickedButton.classList.add('active');
       CustomInput.value='';
       if(!tipPercent){
            console.warn('Percent Button Not Clicked');
        }
       calculateTip();
    });

});

CustomInput.addEventListener('change',()=>{

    tipButton.forEach(btn => btn.classList.remove('active'));
    console.log(`Custom tip: ${CustomInput.value}%`);
    calculateTip();

});

PeopleInput.addEventListener('input',calculateTip);

if(ResetButton){
    ResetButton.addEventListener('click', () =>{
        resetCalculator();
    });
}else{
    console.error('no reset done');
}

let billTouched = false;
let peopleTouched = false;
let customTouched = false;

billInput.addEventListener('input', () => {
    billTouched = true;
    calculateTip();
});

PeopleInput.addEventListener('input', () => {
    peopleTouched = true;
    calculateTip();
});

CustomInput.addEventListener('input', () => {
    customTouched = true;
    calculateTip();
});



function calculateTip(){
    const billInputStr=billInput.value;
    const peopleValueStr=PeopleInput.value;
    const customInputStr=CustomInput.value;
    let selectedButtonTipStr = null;
    const activeButton=document.querySelector('.tip-percent-btn.active');
    if(activeButton){
        selectedButtonTipStr=activeButton.dataset.tip;
    }
    const billAmount=parseFloat(billInputStr);
    const NoOfPeople=parseFloat(peopleValueStr);
    const customTipPercent=parseFloat(customInputStr);
    const  selectedButtonTipPercent=selectedButtonTipStr?parseFloat(selectedButtonTipStr):null;
    let isBillValid= !isNaN(billAmount) && billAmount >= 0;
    console.log(`Validation - Bill Amount (${billAmount}) Is Valid: ${isBillValid}`);

    let isTipValid=false;
    let actualPercent=0;
    if(!isNaN(customTipPercent) && customTipPercent >= 0){
        actualPercent=customTipPercent;
        console.log('Using Custom Button Percentage',actualPercent);
    }
    else if(selectedButtonTipPercent != null && !isNaN(selectedButtonTipPercent) && selectedButtonTipPercent >= 0){
        actualPercent=selectedButtonTipPercent;
        console.log('Using Selected Button Percentage',selectedButtonTipPercent);
    }
    else{
        console.log('Using Default Percentage :0');
    }

    isTipValid= !isNaN(actualPercent) && actualPercent >= 0;
    console.log(`Validation - Tip percent (${actualPercent}) isValid: ${isTipValid}`);

    const isCustomTipInputValid = customInputStr === '' || (!isNaN(customTipPercent) && customTipPercent >= 0);
    console.log(`Validation - Custom Tip Input (${customTipPercent}) Is Valid/Empty: ${isCustomTipInputValid}`);

    let totalTipAmount=0;
    if(isBillValid && isTipValid){
        totalTipAmount=billAmount * (actualPercent / 100);
    }
    console.log("Calculated - Total Tip Amount:", totalTipAmount, `(Type: ${typeof totalTipAmount})`);

    let totalBillAmount=0;
    if(isBillValid){
        totalBillAmount=billAmount+totalTipAmount;
    }
    console.log('Total Amount Including Tip =',totalBillAmount,`(Type: ${typeof totalBillAmount})`);

    let isPersonValid= !isNaN(NoOfPeople) && NoOfPeople > 0 && Number.isInteger(NoOfPeople);
    console.log(`Validation - Number of People (${NoOfPeople}) Is Valid Integer: ${isPersonValid}`);

    let tipPerPerson=0;
    let totalAmountPerPerson=0;
    if(isBillValid && isPersonValid && isTipValid){
        if(!isNaN(totalBillAmount)){
            tipPerPerson=totalTipAmount/NoOfPeople;
            totalAmountPerPerson=totalBillAmount/NoOfPeople;
        }
        else{
            tipPerPerson=0;
            totalAmountPerPerson=0;
            console.warn("Per-person calculation aborted: totalBillAmount was NaN despite other flags.");
        }
    }
    else{
         if (!isPersonValid) {
             console.warn(`Cannot calculate per-person amounts. Number of People (${NoOfPeople}) is not a positive integer.`);
        } else if (!isBillValid) {
             console.warn("Cannot calculate per-person amounts due to invalid Bill Amount.");
        } else if (!isTipValid) {
             console.warn("Cannot calculate per-person amounts due to invalid Tip Percentage.");
        }
    }
    const formattedTipAmount=tipPerPerson.toFixed(2); 
    const formattedTotalAmount=totalAmountPerPerson.toFixed(2);

    const displayTipAmount = `₹${formattedTipAmount}`;
    const displayTotalAmount = `₹${formattedTotalAmount}`;

    console.log("Formatted for Display - Tip Amount Per Person:", displayTipAmount);
    console.log("Formatted for Display - Total Amount Per Person:", displayTotalAmount);

    if(TipAmountDisplay){
        TipAmountDisplay.textContent=displayTipAmount;
    }
    else{
        console.error('Error: tipAmountDisplay element not found in the DOM.');
    }

    if(TotalAmountDisplay){
        TotalAmountDisplay.textContent=displayTotalAmount;
    }
    else{
        console.error('Error: totalAmountDisplay element not found in the DOM.');
    }
    validate(isBillValid,isPersonValid,isCustomTipInputValid);
};

function validate(isBillValid,isPersonValid,isCustomTipInputValid){
    if(billInput){
        billInput.classList.toggle('error', billTouched && !isBillValid);
    }
    if(PeopleInput){
        PeopleInput.classList.toggle('error', peopleTouched && !isPersonValid);
    }
    if(CustomInput){
        CustomInput.classList.toggle('error', customTouched && !isCustomTipInputValid);
    }
};

function resetCalculator(){
    
    if(billInput){
        billInput.value= '';
    }
    if(CustomInput){
        CustomInput.value= '';
    }
    if(tipButton && tipButton.length > 0){
        tipButton.forEach(button => {
            button.classList.remove('active');
        });
    }
    if(PeopleInput){
        PeopleInput.value= '';
    }
    if(TipAmountDisplay){
        TipAmountDisplay.textContent='₹0.00';
    }
    if(TotalAmountDisplay){
        TotalAmountDisplay.textContent='₹0.00';
    }

    if(billInput){
        billInput.classList.remove('error');
      
    }
    if (CustomInput) {
        CustomInput.classList.remove('error');
    }
    if (PeopleInput) {
        PeopleInput.classList.remove('error');
       
    }
    billInput.style.boxShadow = 'none';
    PeopleInput.style.boxShadow = 'none';
    CustomInput.style.boxShadow = 'none';

    billInput.blur();
    PeopleInput.blur();
    CustomInput.blur();

    billTouched = false;
    peopleTouched = false;
    customTouched = false;
    
    console.log('Reset Done Sucessfully');

}
document.addEventListener('DOMContentLoaded',calculateTip);




