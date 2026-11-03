
const botoesFiltro = document.querySelectorAll(".btn-filtro");
const itensCardapio = document.querySelectorAll(".item");

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    const categoriaEscolhida = botao.getAttribute("data-categoria");

    itensCardapio.forEach((item) => {
      const categoriaDoItem = item.getAttribute("data-categoria");
      if (categoriaEscolhida === "todos" || categoriaEscolhida === categoriaDoItem) {
        item.classList.remove("escondido");
      } else {
        item.classList.add("escondido");
      }
    });
  });
});


// ---------- PARTE 2: CARRINHO DE PEDIDO ----------

// Array que guarda os itens adicionados ao pedido.
// Cada item vira um objeto: { nome: "X-Salada", preco: 18 }
let pedido = [];

// Referências aos elementos do HTML que vamos atualizar
const listaPedido = document.getElementById("lista-pedido");
const totalPedidoEl = document.getElementById("total");
const msgVazio = document.getElementById("msg-vazio");
const btnLimpar = document.getElementById("btn-limpar");
const botoesAdd = document.querySelectorAll(".btn-add");

// Quando o usuário clica em "Adicionar" em um item do cardápio
botoesAdd.forEach((botao) => {
  botao.addEventListener("click", () => {
    // O botão está dentro da div .item, então "sobe" até ela para
    // ler o nome e o preço guardados nos atributos data-nome e data-preco
    const itemDiv = botao.closest(".item");
    const nome = itemDiv.getAttribute("data-nome");
    const preco = parseFloat(itemDiv.getAttribute("data-preco"));

    pedido.push({ nome, preco });
    atualizarPedido();
  });
});

// Limpa todo o pedido
btnLimpar.addEventListener("click", () => {
  pedido = [];
  atualizarPedido();
});

// Função central: redesenha a lista do pedido e recalcula o total.
// É chamada toda vez que o pedido muda (adicionar ou remover item).
function atualizarPedido() {
  // Limpa a lista atual na tela antes de redesenhar
  listaPedido.innerHTML = "";

  if (pedido.length === 0) {
    msgVazio.classList.remove("escondido");
  } else {
    msgVazio.classList.add("escondido");
  }

  let total = 0;

  pedido.forEach((item, indice) => {
    total += item.preco;

    // Cria um <li> para cada item do pedido, com um botão "x" para remover
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button class="btn-remover" data-indice="${indice}">×</button>
    `;
    listaPedido.appendChild(li);
  });

  // Atualiza o texto do total, formatado com 2 casas decimais
  totalPedidoEl.textContent = `R$ ${total.toFixed(2)}`;

  // Adiciona o evento de clique em cada botão "x" recém-criado
  document.querySelectorAll(".btn-remover").forEach((botaoRemover) => {
    botaoRemover.addEventListener("click", (evento) => {
      const indice = evento.target.getAttribute("data-indice");
      // Remove 1 item do array na posição clicada
      pedido.splice(indice, 1);
      atualizarPedido();
    });
  });
}
