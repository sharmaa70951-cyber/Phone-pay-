let balance = 3500000;

function formatMoney(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function updateBalance() {
  document.getElementById("balance").innerText = formatMoney(balance);
}

function addMoney() {
  const amount = 500000;

  balance += amount;
  updateBalance();

  addTransaction(
    "Demo Money Added",
    amount,
    "received"
  );
}

function openPay() {
  document.getElementById("payModal").style.display = "flex";
}

function closePay() {
  document.getElementById("payModal").style.display = "none";
}

function makePayment() {

  const name = document.getElementById("name").value.trim();
  const amount = Number(
    document.getElementById("amount").value
  );

  if (!name) {
    alert("Receiver name डालें");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Valid amount डालें");
    return;
  }

  if (amount > balance) {
    alert("Demo balance कम है");
    return;
  }

  balance -= amount;
  updateBalance();

  addTransaction(
    "Paid to " + name,
    amount,
    "sent"
  );

  closePay();

  document.getElementById("successText").innerText =
    formatMoney(amount) +
    " का DEMO payment " +
    name +
    " को भेजा गया।";

  document.getElementById("successModal").style.display = "flex";

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
}

function closeSuccess() {
  document.getElementById("successModal").style.display = "none";
}

function addTransaction(title, amount, type) {

  const list = document.getElementById("transactionList");

  const div = document.createElement("div");

  div.className = "transaction";

  const iconClass =
    type === "received" ? "received" : "sent";

  const icon =
    type === "received" ? "↓" : "↑";

  const sign =
    type === "received" ? "+" : "-";

  const color =
    type === "received" ? "green" : "red";

  div.innerHTML = `
    <div class="icon ${iconClass}">
      ${icon}
    </div>

    <div class="details">
      <b>${title}</b>
      <small>Just now • DEMO</small>
    </div>

    <strong class="${color}">
      ${sign} ${formatMoney(amount)}
    </strong>
  `;

  list.prepend(div);
}

function clearTransactions() {
  document.getElementById("transactionList").innerHTML = "";
}

function showInfo() {
  alert(
    "यह एक Fake Payment Simulator है।\n\n" +
    "इसमें दिखाया गया balance और सभी transactions काल्पनिक हैं।\n" +
    "इसका किसी bank, UPI या वास्तविक payment system से connection नहीं है।"
  );
}

updateBalance();
