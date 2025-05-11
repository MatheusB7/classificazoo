function carregarAnimais() {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const select = document.getElementById("animal-select");
  select.innerHTML = "<option value=''>Selecione um animal</option>";
  animais.forEach((animal, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = animal.nome;
    select.appendChild(option);
  });
}

document.getElementById("cuidados-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const animalIndex = document.getElementById("animal-select").value;
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const frequencia = document.getElementById("frequencia").value;
  const veterinario = document.getElementById("veterinario").value;
  const crmv = document.getElementById("crmv").value;

  const cuidado = {
    nome,
    descricao,
    frequencia,
    veterinario,
    crmv
  };

  let animais = JSON.parse(localStorage.getItem("animais")) || [];
  if (animalIndex !== "") {
    animais[animalIndex].cuidados = animais[animalIndex].cuidados || [];
    animais[animalIndex].cuidados.push(cuidado);
    localStorage.setItem("animais", JSON.stringify(animais));
    alert("Cuidado cadastrado com sucesso!");
    window.location.href = "lista.html";
  } else {
    alert("Escolha um animal.");
  }
});

document.getElementById("vacinas-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const animalIndex = document.getElementById("animal-select").value;
  if (animalIndex === "") {
    alert("Escolha um animal antes de cadastrar vacinas.");
    return;
  }

  const vacinas = [];
  const vacinaItems = document.querySelectorAll(".vacina-item");

  vacinaItems.forEach(item => {
    const vacinaNome = item.querySelector(".vacina-nome").value;
    const vacinaData = item.querySelector(".vacina-data").value;
    if (vacinaNome && vacinaData) {
      vacinas.push({ nome: vacinaNome, data: vacinaData });
    }
  });

  let animais = JSON.parse(localStorage.getItem("animais")) || [];
  animais[animalIndex].vacinas = vacinas;
  localStorage.setItem("animais", JSON.stringify(animais));

  alert("Vacinas cadastradas com sucesso!");
  window.location.href = "lista.html";
});

function adicionarVacina() {
  const vacinaContainer = document.getElementById("vacinas-container");
  const novaVacina = document.createElement("div");
  novaVacina.classList.add("vacina-item");
  novaVacina.innerHTML = `
    <input type="text" placeholder="Nome da vacina" class="vacina-nome" required>
    <input type="date" class="vacina-data" required>
  `;
  vacinaContainer.appendChild(novaVacina);
}

window.onload = carregarAnimais;
