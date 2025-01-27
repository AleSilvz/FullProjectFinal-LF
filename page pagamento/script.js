const valorPagamento = document.querySelector("#valorPagamento");
const btn_voltar = document.querySelector("#btn_voltar");

const nomeCliente = localStorage.getItem("click");
const valor = localStorage.getItem("Valor");

window.onload = () => {
  valorPagamento.innerText = `R$${Number(valor).toFixed(2)}`;
};

function imprimirComprovante() {
  const dados = JSON.parse(localStorage.getItem("a")) || {};

  let printContent = `
      <div style="text-align: center;">
        <h2>Cliente</h2>
        <p>${nomeCliente}</p>
        <h3>Produtos</h3>
    `;

  dados.forEach((i) => {
    const itemText = i.Produtos;
    const itemParts = itemText.split("\n");

    printContent += `<p>${itemParts[0]}</p>`;
    printContent += `<p>${i.Quantidades} - ${i.Total}</p>`;
  });

  printContent += `
    <div>
    
     <h3>Total: R$${Number(valor).toFixed(2)}</h3>
      </div>
    `;

  const printWindow = window.open("", "", "height=500,width=800");
  printWindow.document.write(
    "<html><head><title>Comprovante de Pedido</title></head><body>"
  );
  printWindow.document.write(printContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();

  printWindow.print();
}

btn_voltar.addEventListener("click", () => {
  location.href = "../pages home/index.html";
});
