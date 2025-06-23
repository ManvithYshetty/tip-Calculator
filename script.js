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

};





