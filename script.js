let tabuleiro = [
  "preta",
  "preta",
  "preta",
  "vazio",
  "branco",
  "branco",
  "branco",
];
let movimentos = 0;
let pecaSelecionada = -1;

const tabuleiroObjetivo = [
  "branco",
  "branco",
  "branco",
  "vazio",
  "preta",
  "preta",
  "preta",
];

function iniciarJogo() {
  const tabuleiroJogo = document.getElementById("gameBoard");

  for (let i = 0; i < 7; i++) {
    const posicao = tabuleiroJogo.children[i];
    posicao.addEventListener("click", () => lidarComClique(i));
  }

  atualizarDisplay();
}

function lidarComClique(pos) {
  if (tabuleiro[pos] !== "vazio") {
    if (pecaSelecionada !== -1) {
      document
        .querySelector(`[data-pos="${pecaSelecionada}"]`)
        .classList.remove("selected");
    }

    pecaSelecionada = pos;
    document.querySelector(`[data-pos="${pos}"]`).classList.add("selected");
  } else if (pecaSelecionada !== -1) {
    if (ehMovimentoValido(pecaSelecionada, pos)) {
      fazerMovimento(pecaSelecionada, pos);
      pecaSelecionada = -1;
      document.querySelector(".selected").classList.remove("selected");
    }
  }
}

function ehMovimentoValido(de, para) {
  if (tabuleiro[para] !== "vazio") return false;

  const distancia = Math.abs(para - de);

  if (distancia === 1) return true;

  if (distancia === 2) {
    const meio = (de + para) / 2;
    return tabuleiro[meio] !== "vazio";
  }

  return false;
}

function fazerMovimento(de, para) {
  tabuleiro[para] = tabuleiro[de];
  tabuleiro[de] = "vazio";

  movimentos++;
  atualizarDisplay();

  if (verificarVitoria()) {
    setTimeout(() => {
      alert(`Muito bem! Você ganhou em ${movimentos} movimentos!`);
    }, 100);
  }
}

function verificarVitoria() {
  for (let i = 0; i < 7; i++) {
    if (tabuleiro[i] !== tabuleiroObjetivo[i]) return false;
  }
  return true;
}

function atualizarDisplay() {
  const posicoes = document.querySelectorAll(".position");

  posicoes.forEach((pos, indice) => {
    pos.innerHTML = "";

    if (tabuleiro[indice] !== "vazio") {
      const peca = document.createElement("div");
      peca.className = `piece ${tabuleiro[indice]}`;
      pos.appendChild(peca);
    } else {
      const peca = document.createElement("div");
      peca.className = "piece vazio";
      pos.appendChild(peca);
    }
  });

  document.getElementById("moves").textContent = movimentos;
}

function reiniciarJogo() {
  tabuleiro = [
    "preta",
    "preta",
    "preta",
    "vazio",
    "branco",
    "branco",
    "branco",
  ];
  movimentos = 0;
  pecaSelecionada = -1;

  document.querySelectorAll(".selected").forEach((el) => {
    el.classList.remove("selected");
  });

  atualizarDisplay();
  document.getElementById("message").textContent = "";
}

window.onload = iniciarJogo;