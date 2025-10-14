const nameInput = document.querySelector('[name="expense-name"]');
const amountInput = document.querySelector('[name="expense-amount"]');
const addButton = document.getElementById('add-expense');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = [];
let total = 0;

// Currency mode: true = euro to dollar, false = dollar to euro
let euroToDollar = true;
const euroToDollarRate = 1.16;
const dollarToEuroRate = 1 / euroToDollarRate;

//  Show the list of expenses 
function renderExpenses() {
  list.innerHTML = '';
  expenses.forEach(expense => {
    const li = document.createElement('li');

    // Show the correct symbol based on current mode
    if (euroToDollar) {
      li.textContent = `${expense.name}: ${expense.amount.toFixed(2)} €`;
    } else {
      const amountUSD = expense.amount * euroToDollarRate;
      li.textContent = `${expense.name}: ${amountUSD.toFixed(2)} $`;
    }

    list.appendChild(li);
  });
}

//  Show total at the bottom 
function updateTotal() {
  if (euroToDollar) {
    totalDisplay.textContent = `${total.toFixed(2)} €`;
  } else {
    const totalInDollars = total * euroToDollarRate;
    totalDisplay.textContent = `${totalInDollars.toFixed(2)} $`;
  }
}

//  Add a new expense 
function addExpense() {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value.replace(',', '.'));

  if (name === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid name and a positive amount.');
    return;
  }

  expenses.push({ name, amount });
  total += amount;

  renderExpenses();
  updateTotal();

  nameInput.value = '';
  amountInput.value = '';
}

addButton.addEventListener('click', addExpense);

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'm') {
    event.preventDefault();

    // Change currency mode
    euroToDollar = !euroToDollar;

    // Update everything on the page
    renderExpenses();
    updateTotal();

    console.log(`💱 Currency changed: now showing in ${euroToDollar ? 'EURO' : 'DOLLAR'}`);
  }
});
