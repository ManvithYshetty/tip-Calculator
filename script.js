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


billInput.addEventListener('input',(calculateTip)=>{

    const currentBillValue=billInput.value;
    console.clear();// clear the unwanted flood in the console 
    console.log('Bill Input Changed , current Value:',currentBillValue);
   
});

tipButton.forEach((button)=>{
    button.addEventListener('click',(calculateTip) => {
        const clickedButton=calculateTip.target;
        const tipPercentage=clickedButton.value;
        console.log('Tip Button Clicked',clickedButton.textContent);
        if(tipPercentage){
            console.log('Tip Selected Value :',tipPercentage + '%');
        }
        else{
            console.warn('Unknown Value Clicked Not Present ')
        }
    });

});

CustomInput.addEventListener('change',(event)=>{

    const CustomTipValue=event.target.value;
    console.log('Custom Input Changed,CurrentValue:',CustomTipValue + "%");
    calculateTip();

});

PeopleInput.addEventListener('input',(calculateTip)=>{

    const NumberOfPeople=calculateTip.target.value;
    console.log('Number Of People Input Changed ,CurrentValue:',NumberOfPeople);

});

function calculateTip(){
    console.log('function Executed');
};


