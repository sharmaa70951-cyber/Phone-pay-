// =============================
// DEMO PAYMENT SIMULATOR
// =============================

let balance = 2500000;

// Demo PIN only
const DEMO_PIN = "1234";


// =============================
// LOGIN
// =============================

function login() {

  const pin = document.getElementById("pinInput").value;

  if (pin === DEMO_PIN) {

    document.getElementById("loginPage")
      .classList.add("hidden");

    document.getElementById("mainPage")
      .classList.remove("hidden");

    updateBalance();
    loadHistory();

  } else {

    alert("गलत Demo PIN!\nDemo PIN: 1234");

  }
}


// =============================
// LOGOUT
// =============================

function logout() {

  document.getElementById("mainPage")
    .classList.add("hidden");

  document.getElementById("loginPage")
    .classList.remove("hidden");

  document.getElementById("pinInput").value = "";

  closeProfile();
}


// =============================
// BALANCE
// =============================

function formatMoney(number) {

  return "₹" + Number(number).toLocaleString("en-IN");

}


function updateBalance() {

  document.getElementById("balance")
    .innerText = formatMoney(balance);

}


// =============================
// ADD DEMO MONEY
// =============================

function addDemoMoney() {

  const amount = 500000;

  balance += amount;

  updateBalance();

  addTransaction(
    "Demo Money Added",
    amount,
    "received"
  );

}


// =============================
// PAYMENT
// =============================

function openPayment() {

  document.getElementById("paymentModal")
    .style.display = "flex";

}


function closePayment() {

  document.getElementById("paymentModal")
    .style.display = "none";

}


function sendPayment() {

  const phone =
    document.getElementById("phoneInput").value.trim();

  const amount =
    Number(document.getElementById("amountInput").value);


  // Check number

  if (!/^[0-9]{10}$/.test(phone)) {

    alert("10 digit mobile number डालें।");
    return;

  }


  // Check amount

  if (!amount || amount <= 0) {

    alert("Valid amount डालें।");
    return;

  }


  // Check balance

  if (amount > balance) {

    alert("Demo balance कम है।");
    return;

  }


  // Deduct demo balance

  balance -= amount;

  updateBalance();


  // Add history

  addTransaction(
    "Demo Payment",
    amount,
    "sent",
    phone
  );


  // Success message

  document.getElementById("successMessage")
    .innerText =
    formatMoney(amount) +
    " का Demo Payment\n" +
    "Mobile: " +
    phone;


  closePayment();

  document.getElementById("successModal")
    .style.display = "flex";


  // Clear inputs

  document.getElementById("phoneInput").value = "";
  document.getElementById("amountInput").value = "";

}


// =============================
// TRANSACTION HISTORY
// =============================

function addTransaction(
  title,
  amount,
  type,
  phone = ""
) {

  const history =
    JSON.parse(
      localStorage.getItem("demoHistory") || "[]"
    );


  const transaction = {

    title: title,

    amount: amount,

    type: type,

    phone: phone,

    time: new Date().toLocaleString("en-IN")

  };


  history.unshift(transaction);


  localStorage.setItem(
    "demoHistory",
    JSON.stringify(history)
  );


  loadHistory();

}


function loadHistory() {

  const list =
    document.getElementById("historyList");

  const history =
    JSON.parse(
      localStorage.getItem("demoHistory") || "[]"
    );


  list.innerHTML = "";


  if (history.length === 0) {

    list.innerHTML =
      `<div class="empty">
        अभी कोई Demo Transaction नहीं है
      </div>`;

    return;

  }


  history.forEach(transaction => {

    const isReceived =
      transaction.type === "received";


    const icon =
      isReceived ? "↓" : "↑";


    const sign =
      isReceived ? "+" : "-";


    const color =
      isReceived ? "green" : "red";


    let subtitle =
      transaction.time +
      " • DEMO";


    if (transaction.phone) {

      subtitle +=
        " • " +
        transaction.phone;

    }


    const div =
      document.createElement("div");


    div.className = "transaction";


    div.innerHTML = `

      <div class="transaction-icon ${transaction.type}">
        ${icon}
      </div>

      <div class="transaction-info">

        <b>${transaction.title}</b>

        <small>${subtitle}</small>

      </div>

      <div class="amount ${color}">
        ${sign} ${formatMoney(transaction.amount)}
      </div>

    `;


    list.appendChild(div);

  });

}


// =============================
// CLEAR HISTORY
// =============================

function clearHistory() {

  if (
    confirm("क्या Demo transaction history हटानी है?")
  ) {

    localStorage.removeItem("demoHistory");

    loadHistory();

  }

}


// =============================
// SUCCESS
// =============================

function closeSuccess() {

  document.getElementById("successModal")
    .style.display = "none";

}


// =============================
// PROFILE
// =============================

function showProfile() {

  document.getElementById("profileModal")
    .style.display = "flex";

}


function closeProfile() {

  document.getElementById("profileModal")
    .style.display = "none";

}


// =============================
// START
// =============================

updateBalance();
loadHistory();
