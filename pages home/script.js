const botaoVoltar = document.querySelector("#btn_voltar");
const container_perfil = document.querySelector("#container_perfil");
const nome_clientes = document.querySelector("#nome_clientes");
const produtos = document.querySelector(".produtos");
const adicionarProdutos = document.querySelector(".adicionar-itens");
const concluir = document.querySelector("#concluir");
const produtos_adicionados = document.querySelector("#produtos_adicionados");
const valor = document.querySelector("#valor");
const btn_concluir = document.querySelector("#btn_concluir");

const nome = localStorage.getItem("click");
const clientes = JSON.parse(localStorage.getItem("LF")) || {};

botaoVoltar.addEventListener("click", () => {
  location.href = "../index.html";
});

window.onload = () => {
  care();
  item();
};

function care() {
  nome_clientes.innerHTML = nome;
}

adicionarProdutos.addEventListener("click", () => {
  location.href = "../page produtos/index.html";
});

function item() {
  const a = clientes[nome] || [];

  a.forEach((item) => {
    const div = createElementItem(item);
    if (item) {
      produtos_adicionados.appendChild(div);
    }
  });
}

let totalValue = 0;

function createElementItem(item) {
  const { nome, preco } = item;
  let unidades = item.unidade || 1;
  let valorItem = Number(preco) * unidades;

  const div = document.createElement("div");
  const h3 = document.createElement("div");
  h3.className = "div-nome-produto";
  div.className = "div-item";
  h3.innerHTML = `<h3>${nome}</h3> <span>${unidades}x</span> - <span>R$${valorItem.toFixed(
    2
  )}</span>`;

  totalValue += valorItem;
  atualizarValor();

  const btn_esquerda = document.createElement("div");
  btn_esquerda.innerText = "-";
  btn_esquerda.className = "btn-l";
  btn_esquerda.onclick = () => {
    if (unidades === 1) {
      produtos_adicionados.removeChild(div);
      totalValue -= Number(preco);
      atualizarValor();
      removerItem(nome);
    } else {
      unidades -= 1;
      valorItem = Number(preco) * unidades;
      h3.innerHTML = `<h3>${nome}</h3> <span>${unidades}x</span> - <span>R$${valorItem.toFixed(
        2
      )}</span>`;
      saveItem(nome, unidades, preco);
      totalValue -= Number(preco);
      atualizarValor();
    }
  };

  const btn_direita = document.createElement("div");
  btn_direita.className = "btn-r";
  btn_direita.innerText = "+";
  btn_direita.onclick = () => {
    unidades += 1;
    valorItem = Number(preco) * unidades;

    h3.innerHTML = `<h3>${nome}</h3> <span>${unidades}x</span> - <span>R$${valorItem.toFixed(
      2
    )}</span>`;
    saveItem(nome, unidades, preco);
    totalValue += Number(preco);
    atualizarValor();
  };

  div.appendChild(btn_esquerda);
  div.appendChild(h3);
  div.appendChild(btn_direita);

  return div;
}

function saveItem(item, unidade, value) {
  const a = clientes[nome] || [];
  const itemIndex = a.findIndex((i) => i.nome === item);

  if (itemIndex >= 0) {
    a[itemIndex] = { nome: item, preco: value, unidade: unidade };
  } else {
    a.push({ nome: item, preco: value, unidade: unidade });
  }

  clientes[nome] = a;
  localStorage.setItem("LF", JSON.stringify(clientes));
}

function atualizarValor() {
  valor.innerText = `R$${totalValue.toFixed(2)}`;
}

function removerItem(nomeItem) {
  const a = clientes[nome] || [];

  const update = a.filter((item) => item.nome !== nomeItem);
  clientes[nome] = update;
  localStorage.setItem("LF", JSON.stringify(clientes));
}

btn_concluir.onclick = () => {
  delete clientes[nome];

  localStorage.setItem("LF", JSON.stringify(clientes));

  location.href = "../index.html";
};

function comprovante() {
  const items = document.querySelectorAll(
    "#produtos_adicionados > .div-item > .div-nome-produto"
  );

  const array = [];

  items.forEach((item) => {
    const itemText = item.querySelector("h3").textContent;
    const span = item.querySelectorAll("span");
    const u = span[0].textContent;
    const y = span[1].textContent;
    console.log(span[0].textContent);

    array.push({ Produtos: itemText, Quantidades: u, Total: y });
  });

  localStorage.setItem("a", JSON.stringify(array)) || {};
}

concluir.onclick = () => {
  comprovante();
  localStorage.setItem("Valor", Number(totalValue));
  location.href = "../page pagamento/index.html";
};
