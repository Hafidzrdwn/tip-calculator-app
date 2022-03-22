// LIST OF ALL VARIABLES
const tipCheckBox = document.querySelectorAll('.tip-check-box')
const tipInputCustom = document.querySelector('.tip-input-custom')
const btnReset = document.getElementById('btnReset')
let boxOfPeopleInput = document.querySelector('.calculation-box .people-box .input-box')
let errorMsg = document.querySelector('.error-msg')
let tipAmountResult = document.getElementById('tip-amount-result')
let totalAmountResult = document.getElementById('total-amount-result')
let errorArr = [1]

// SOME FUNCTIONS
function deleteActiveClass (index) {
  for (i in tipCheckBox) {
    if (!isNaN(i) && parseInt(i) !== index) {
      tipCheckBox[i].classList.remove('active')
    }
  }
}

function calculateSplitter(bill, tip, people) {
  let tipInPersent = tip / 100
  let tipAmount = (bill * tipInPersent) / people
  let total = (bill + (bill * tipInPersent)) / people
  
  return {
    tipAmount: tipAmount.toFixed(2),
    total: total.toFixed(2)
  }
}
  
  let tipValue = 0.00

  tipCheckBox.forEach((tcb, index) => {

    tcb.addEventListener('click', (el) => {

      if (el.target.classList.contains('active')) {
        el.target.classList.remove('active')
        tipValue = 0.00
      } else {
        el.target.classList.add('active')
        tipValue = parseFloat(el.target.getAttribute('data-val').trim())
      }

      tipInputCustom.value = ""
      
      deleteActiveClass(index)
      checkError()
    })
  })

  tipInputCustom.oninput = (el) => { 
    deleteActiveClass("")
    tipValue = (el.target.value.length > 0) ? parseFloat(el.target.value) : 0.00
    checkError()
  }


function checkError() {
  if (errorArr[0] == 1) {
    boxOfPeopleInput.classList.add('error')
    errorMsg.style.display = "inline-block"
    tipAmountResult.textContent = '$0.00'
    totalAmountResult.textContent = '$0.00'
    btnReset.setAttribute('disabled', '')
  } else {
    boxOfPeopleInput.classList.remove('error')
    errorMsg.style.display = "none"

    const result = calculateSplitter(billValue, tipValue, peopleValue)
    console.log(`Bill:$${billValue} , Tip:${tipValue}% , ${peopleValue} peoples`)
    console.log(result)

    tipAmountResult.textContent = `$${result.tipAmount}`
    totalAmountResult.textContent = `$${result.total}`
    btnReset.removeAttribute('disabled')
  }
}

// END OF FUNCTION SECTION

// INPUT CONFIGURATIONS
const billInput = document.getElementById('bill')
let billValue = 0

billInput.addEventListener('input', (el) => {
  billValue = (el.target.value.length > 0) ? parseFloat(el.target.value) : 0.00
  checkError()
})

const peopleInput = document.getElementById('people')
let peopleValue = 0

peopleInput.addEventListener('input', (el) => {
  if (el.target.value.length > 0) {
    errorArr[0] = 0
    peopleValue = parseInt(el.target.value)
  } else {
    errorArr[0] = 1
  } 
  checkError()
})

// EVENT FOR BTN RESET
btnReset.addEventListener('click', () => {
  errorArr[0] = 1

  billValue = 0
  billInput.value = ""

  peopleInput.value = ""
  peopleValue = 0

  tipInputCustom.value = ""
  tipValue = 0

  deleteActiveClass("")

  tipAmountResult.textContent = '$0.00'
  totalAmountResult.textContent = '$0.00'
  btnReset.setAttribute('disabled', '')
})
