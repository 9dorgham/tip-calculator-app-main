// height
document.body.style.height= window.innerHeight + 'px';


// Selectors
let val,
selected,
percent,
pepNum;

let bill = document.getElementById('bill');
let lis = document.querySelectorAll('li');
let custom = document.querySelector('.custom input');
let people = document.querySelector('#num-p');
let tipAmount = document.querySelector('.tip-amount');
let tipTotal = document.querySelector('.total-tip');
let reset = document.querySelector('button');
let errorM = document.querySelector('.error-mes');



function getNumber(str) {
  return +[...str].filter(x => isNaN(x) === false).join('');
}


function getVal(event) {
  val = getNumber(event.target.value);
}


function getPercentage(event) {
  if (selected != undefined) {
    selected.classList.remove('choosed');
  }else if (selected == event.target) {
    selected.target.classList.add('choosed');
  }

  selected = event.target;
  selected.classList.add('choosed');
  if (selected.hasAttribute('data-value')) {
    percent = Number(selected.dataset.value);
  }else {
    percent = Number(selected.value);
  }
}


function getPeople(event) {
  pepNum = getNumber(event.target.value);
  
  if (pepNum == 0) {
    errorM.style.display= 'inline';
    people.classList.add('error');
  }else {
    errorM.style.display= 'none';
    people.classList.remove('error');
  }
}


function clear() {
  bill.value = '';
  custom.value = '';
  people.value = '';
  val = undefined;

  if (selected != undefined) {
    selected.classList.remove('choosed');
  }
}


function update() {
  if (val && percent && pepNum) {
    let tipPerPerson = (percent / 100) * val;
    let totalTip = tipPerPerson * pepNum;

    tipAmount.textContent = '$' + tipPerPerson.toFixed(2);
    tipTotal.textContent = '$' + totalTip.toFixed(2);

    reset.classList.add('active');
  }else {
    tipAmount.textContent = '$0:00';
    tipTotal.textContent = '$0:00';
    reset.classList.remove('active');
  }
}



// Invoking
bill.addEventListener('input', (e) => {getVal(e); update()});
lis.forEach(ele => {ele.addEventListener('click', (e) => {getPercentage(e); update()})});
custom.addEventListener('input', (e) => {getPercentage(e); update()});
people.addEventListener('input', (e) => {getPeople(e); update()});
reset.addEventListener('click', () => {clear(); update()});















/*
  function headler() {
  let billValue = 0;
  let percent = 0;
  let numberOfPeople = 0;


  bill.addEventListener('input', e => {
    billValue = parseInt(e.target.value);
  });

  
  function tip() {    
    [...tips.children].forEach(ele => {
      if (!ele.classList.contains('custom')) {
        ele.onclick = (e) => {
          removeall(tips.children);
            ele.classList.add('choosed');
            percent = parseInt(e.target.dataset.value);
            document.querySelector('.tip-amount').innerHTML = `$ ${(billValue * percent / 100)}`;
        }
      }else {
        li.onclick= () => {
          removeall(tips.children);
          ele.addEventListener('input', e => {
            percent = [...e.target.value].filter(x => isNaN(x) === false).join('');
            document.querySelector('.tip-amount').innerHTML = `$ ${(billValue * percent / 100)}`;
          })
        }
      }
    });
  };
  tip();


  function Np() {
    people.addEventListener('input', e => {
      if (e.target.value == '0') {
        people.parentElement.classList.add('error');
        people.parentElement.querySelector('label').after(errorM);
    }else {
        people.parentElement.classList.remove('error');
        errorM.remove();
        numberOfPeople = e.target.value;
        document.querySelector('.tip-total').innerHTML = `$ ${(billValue * percent / 100) * numberOfPeople}`;
      }
    });
  }
  Np();


  reset.onclick = () => {
    removeall(tips.children);
    tipAmount.innerHTML = "0.00";
    tipTotal.innerHTML = "0.00";

    bill.value = '';
    li.querySelector('input').innerHTML = '';
    people.value = '';
  }
}

headler();



// remove all checked
function removeall(arr) {
  for (let i of arr) {
    i.classList.remove('choosed');
  }
}

*/ 