const botaoVoltarHome = document.querySelector("#btn_voltar");
const produtos = document.querySelector("#itens");
const pesquisar_item = document.querySelector("#pesquisar_item");
const btn_comidas = document.querySelector("#comidas");
const btns_Categorias = document.querySelectorAll(".btn-categorias");

let itemSelecionado = null;

window.onload = () => {
  allProdutos();
};

botaoVoltarHome.addEventListener("click", () => {
  location.href = "/pages home/index.html";
});

pesquisar_item.addEventListener("input", (event) => {
  let value = formatar(event.target.value);

  limparLocalProdutos();

  for (let key in categorias) {
    const a = categorias[key];
    const filter = a.filter((item) => item.nome.toLowerCase().includes(value));

    filter.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "container-item";
      div.setAttribute("data-index", index);
      div.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

      selecionado(div);

      div.addEventListener("dblclick", () => {
        itemSelecionado = filter[index];
        adicionarItem();
      });

      produtos.appendChild(div);
    });
  }
});

function formatar(value) {
  return value.toLowerCase().trim();
}

function allProdutos() {
  limparLocalProdutos();

  for (let key in categorias) {
    const fil = categorias[key];

    fil.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "container-item";
      div.setAttribute("data-index", index);
      div.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      produtos.appendChild(div);

      selecionado(div);

      div.addEventListener("dblclick", () => {
        itemSelecionado = fil[index];
        adicionarItem();
      });
    });
  }
}

function adicionarItem() {
  const clienteAtual = localStorage.getItem("click");
  const clientes = JSON.parse(localStorage.getItem("LF")) || {};

  const { nome, preco } = itemSelecionado;
  const unidade = 1;

  //Metado .some verifica no LocalStorage se o item já foi adicionado.
  const itemExists = clientes[clienteAtual].some((item) => item.nome === nome);

  if (itemExists) {
    alert("Esse item já foi adicionado!");
    return;
  } else {
    alert(`Item ${nome} adicionado!`);
  }

  clientes[clienteAtual].push({ nome, preco, unidade });

  localStorage.setItem("LF", JSON.stringify(clientes));
  pesquisar_item.value = "";
}

function voltar() {
  location.href = "/pages home/index.html";
}

function limparLocalProdutos() {
  while (produtos.firstChild) {
    produtos.removeChild(produtos.firstChild);
  }
}

btns_Categorias.forEach((categoria) => {
  categoria.addEventListener("click", () => {
    limparLocalProdutos();

    const nomeCategoria = categoria.value;
    const filter = categorias[nomeCategoria];

    if (filter) {
      filter.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "container-item";
        div.setAttribute("data-index", index);
        div.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        produtos.appendChild(div);

        selecionado(div);

        div.addEventListener("dblclick", () => {
          itemSelecionado = filter[index];
          adicionarItem();
        });
      });
    } else {
      alert("Essa categorias ainda não existe!");
      allProdutos();
    }
  });
});

function selecionado(div) {
  div.addEventListener("click", () => {
    produtos.querySelectorAll(".container-item").forEach((i) => {
      i.classList.remove("selecionado");
    });
    div.classList.add("selecionado");
  });

  return div;
}