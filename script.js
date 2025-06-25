const billInput=document.getElementById('bill');
console.log('Bill Input Element',billInput)

const tipButton=document.querySelectorAll('.tip-percent-btn')   //selets all of the classes in the webpage present rather than first occuring 
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

console.clear();

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
    console.log(`Custom tip: ${CustomInput.value}%`); // Example temporary log
    calculateTip();

});

PeopleInput.addEventListener('input',calculateTip);

function calculateTip(){
    // console.log('Executing Calculator-TIP');
    const billInputStr=billInput.value;
    const peopleValueStr=PeopleInput.value;
    const customInputStr=CustomInput.value;
    let selectedButtonTipStr = null; // Use null to indicate no button is active
    const activeButton=document.querySelector('.tip-percent-btn.active');
    if(activeButton){
        selectedButtonTipStr=activeButton.dataset.tip;
    }

    console.log("Raw Input - Bill:", billInputStr);
    console.log("Raw Input - People:", peopleValueStr);
    console.log("Raw Input - Custom Tip:", customInputStr);
    console.log("Raw Input - Selected Button Tip:", selectedButtonTipStr);

    const billAmount=parseFloat(billInputStr);
    const NoOfPeople=parseFloat(peopleValueStr);
    const customTipPercent=parseFloat(customInputStr);
    const  selectedButtonTipPercent=selectedButtonTipStr?parseFloat(selectedButtonTipStr):null;

    console.log("Converted Number - Bill Amount:", billAmount, `(Type: ${typeof billAmount})`);
    console.log("Converted Number - Number of People:", NoOfPeople, `(Type: ${typeof NoOfPeople})`);
    console.log("Converted Number - Custom Tip %:", customTipPercent, `(Type: ${typeof customTipPercent})`);
    console.log("Converted Number - Selected Button Tip %:", selectedButtonTipPercent, `(Type: ${typeof selectedButtonTipPercent})`); // Will be null if no button active, NaN if button data invalid, or a number

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

    let totalTipAmount=0;
    if(!isNaN(billAmount) && billAmount >= 0){
        totalTipAmount=billAmount * (actualPercent / 100);
    }
    console.log("Calculated - Total Tip Amount:", totalTipAmount, `(Type: ${typeof totalTipAmount})`);

    const totalBillAmount=billAmount+totalTipAmount;
    console.log('Total Amount Including Tip =',totalBillAmount,`(Type: ${typeof totalBillAmount})`);

    let tipPerPerson=0;
    if( !isNaN(totalTipAmount) && !isNaN(NoOfPeople) && NoOfPeople > 0){
        tipPerPerson=totalTipAmount/NoOfPeople;
    }
    else{
        console.warn("Cannot calculate tip per person. Invalid inputs (Tip:", totalTipAmount, ", People:", NoOfPeople, ")");   
    }
    console.log('Tip Per Person Calculated',tipPerPerson,`(Type: ${typeof tipPerPerson})`);

    let totalAmountPerPerson=0;
    if( !isNaN(totalBillAmount) && !isNaN(NoOfPeople) &&  NoOfPeople > 0){
        totalAmountPerPerson=totalBillAmount/NoOfPeople;
    }
    else{
        console.warn("Cannot calculate total per person. Invalid inputs (Total Bill:", totalBillAmount, ", People:", NoOfPeople, ")");
    }
    console.log("Calculated - Total Amount Per Person:", totalAmountPerPerson, `(Type: ${typeof totalAmountPerPerson})`);

    console.log({ // Logging as an object for better readability in console
        billAmount,
        NoOfPeople,
        actualPercent,
        totalTipAmount,
        totalBillAmount,
        tipPerPerson,
        totalAmountPerPerson
    });

    const formattedTipAmount=tipPerPerson.toFixed(2); // for after  two decimal points 
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

};

document.addEventListener('DOMContentLoaded',calculateTip);





