const buttonToAddClient = document.querySelector(".buttonToAddClient");
const inputFindClient = document.querySelector("#inputFindClient");
const inputToAddClient = document.querySelector("#inputToAddClient");
const searchIcon = document.querySelector("#searchIcon");
const checkmarkIcon = document.querySelector("#checkmarkIcon");
const localClients = document.querySelector("#container_clientes");
const containerHome = document.querySelector("#containerHome");
const containerPageClient = document.querySelector("#containerPageClient");
const chevronBackOutline = document.querySelector(".chevronBackOutline");
const profileClient = document.querySelector("#profileClient");
const notifications = document.querySelector(".notifications");
const containerTable = document.querySelector("#containerTable");

let currentClient = null;

const clientToDay = JSON.parse(localStorage.getItem("LF")) || {};

window.onload = function () {
  for (const a in clientToDay) {
    addClientTable(a);
  }
};

buttonToAddClient.addEventListener("click", () => {
  buttonToAddClient.classList.add("hidden");
  buttonToAdd();
});

checkmarkIcon.addEventListener("click", (event) => {
  if (event.type === "click") {
    toAddClient();
    home();
    buttonToAddClient.classList.remove("hidden");
  }
});

inputToAddClient.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buttonToAddClient.classList.remove("hidden");
    toAddClient();
    home();
  }
});

function buttonToAdd() {
  inputFindClient.style.display = "none";
  inputToAddClient.style.display = "block";
  
  searchIcon.style.display = "none";
  checkmarkIcon.style.display = "block";
}

function home() {
  inputFindClient.style.display = "block";
  inputToAddClient.style.display = "none";
  
  searchIcon.style.display = "block";
  checkmarkIcon.style.display = "none";
  
  inputToAddClient.value = "";
}

function toAddClient() {
  const newClient = inputToAddClient.value.toUpperCase().trim();
  
  if (newClient) {
    if (clientToDay[newClient]) {
      alert(`The ${newClient} already exists!`);
      return;
    }
    
    clientToDay[newClient] = [];
    localStorage.setItem("LF", JSON.stringify(clientToDay));

    addClientTable(newClient);
  }
}

function addClientTable(name) {
  const table = document.createElement("div");
  table.classList.add("containerClient");
  const circulo = document.createElement("div");
  circulo.classList.add("tableClient");
  circulo.innerText = name.charAt(0);
  const span = document.createElement("span");
  span.classList.add("nameClientSpan");
  span.innerText = name;
  
  table.appendChild(circulo);
  table.appendChild(span);
  
  table.addEventListener("click", function () {
    currentClient = name;
    openTableClient();
  });
  
  localClients.appendChild(table);
}

inputFindClient.addEventListener("input", (event) => {
  let value = formatString(event.target.value);
  
  const Clients = document.querySelectorAll(
    "#container_clientes .containerClient"
  );
  Clients.forEach((client) => {
    if (formatString(client.textContent).indexOf(value) !== -1) {
      client.style.display = "flex";
    } else {
      client.style.display = "none";
    }
  });
});

function formatString(value) {
  return value.toLowerCase().trim();
}

function openTableClient() {
  localStorage.setItem("click", currentClient);
  location.href = "/pages home/index.html";
}

function pageReload() {
  containerHome.style.display = "block";
  containerPageClient.style.display = "none";
  location.reload();
}

function limpar() {
  localStorage.clear("LF")
  location.reload();
}
