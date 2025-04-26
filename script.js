// --- Pokémon-Pool (HeartGold/SoulSilver, 001-251) ---
const pokemonNames = [];
for (let i = 1; i <= 251; i++) {
  pokemonNames.push(i.toString().padStart(3, '0'));
}

let activeSlot = null;
let draggedSlot = null;
let soullinkPairs = [];

const linkColors = [
  { background: "#ADD8E680", border: "#ADD8E6" },
  { background: "#90EE9080", border: "#90EE90" },
  { background: "#FFB6C180", border: "#FFB6C1" },
  { background: "#FFD70080", border: "#FFD700" },
  { background: "#FFA07A80", border: "#FFA07A" },
  { background: "#9370DB80", border: "#9370DB" },
  { background: "#00CED180", border: "#00CED1" },
  { background: "#40E0D080", border: "#40E0D0" },
  { background: "#FF69B480", border: "#FF69B4" },
  { background: "#BA55D380", border: "#BA55D3" },
  { background: "#CD5C5C80", border: "#CD5C5C" },
  { background: "#F0808080", border: "#F08080" },
  { background: "#EEE8AA80", border: "#EEE8AA" },
  { background: "#E0FFFF80", border: "#E0FFFF" },
  { background: "#AFEEEE80", border: "#AFEEEE" },
  { background: "#DDA0DD80", border: "#DDA0DD" },
  { background: "#B0C4DE80", border: "#B0C4DE" },
  { background: "#FFDEAD80", border: "#FFDEAD" },
  { background: "#00FA9A80", border: "#00FA9A" },
  { background: "#7B68EE80", border: "#7B68EE" }
];

let isLinkingMode = false;
let isKillingMode = false;
let selected = [];

function createSlots(containerId, count) {
  const container = document.getElementById(containerId);
  for (let i = 0; i < count; i++) {
    const slot = document.createElement('div');
    slot.classList.add('pokemon-slot');
    slot.setAttribute('draggable', 'true');
    slot.addEventListener('click', () => handleSlotClick(slot));
    slot.addEventListener('dragstart', dragStart);
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', drop);
    container.appendChild(slot);
  }
}

createSlots('player1-team', 6);
createSlots('player1-box', 15);
createSlots('player1-dead', 15);
createSlots('player2-team', 6);
createSlots('player2-box', 15);
createSlots('player2-dead', 15);

function handleSlotClick(slot) {
  if (isKillingMode && slot.querySelector('img')) {
    killPokemon(slot);
    return;
  }

  if (!slot.querySelector('img')) {
    activeSlot = slot;
    openPokemonModal();
  } else if (isLinkingMode) {
    if (selected.includes(slot)) {
      slot.classList.remove('linked');
      selected = selected.filter(s => s !== slot);
    } else if (selected.length < 2) {
      slot.classList.add('linked');
      selected.push(slot);
    }
  }
}

function linkSelectedPokemons() {
  const linkButton = document.getElementById('linkButton');

  if (!isLinkingMode) {
    isLinkingMode = true;
    isKillingMode = false;
    selected = [];
    document.querySelectorAll('.pokemon-slot').forEach(slot => slot.classList.remove('linked'));
    linkButton.classList.add('blinking');
    document.getElementById('killButton').classList.remove('killing');
    alert('Bitte zwei Pokémon auswählen, um sie zu verlinken!');
  } else {
    if (selected.length === 2) {
      if (!isAlreadyLinked(selected[0], selected[1])) {
        const confirmLink = confirm('Möchtest du diese beiden Pokémon wirklich verlinken?');
        if (confirmLink) {
          soullinkPairs.push([selected[0], selected[1]]);
          const colorSet = linkColors[(soullinkPairs.length - 1) % linkColors.length];
          selected.forEach(slot => {
            slot.style.backgroundColor = colorSet.background;
            slot.style.border = `2px solid ${colorSet.border}`;
          });
          saveData();
          alert('Pokémon erfolgreich verlinkt!');
        }
      } else {
        alert('Diese Pokémon sind bereits verlinkt!');
      }
      isLinkingMode = false;
      selected = [];
      document.querySelectorAll('.pokemon-slot').forEach(slot => slot.classList.remove('linked'));
      linkButton.classList.remove('blinking');
    } else {
      alert('Bitte genau zwei Pokémon auswählen!');
    }
  }
}

function startKillMode() {
  const killButton = document.getElementById('killButton');

  if (!isKillingMode) {
    isKillingMode = true;
    isLinkingMode = false;
    selected = [];
    killButton.classList.add('killing');
    document.getElementById('linkButton').classList.remove('blinking');
    alert('Klicke auf ein Pokémon, um es in die Toten-Box zu verschieben!');
  } else {
    isKillingMode = false;
    killButton.classList.remove('killing');
  }
}

function killPokemon(slot) {
  const deadBoxes = [
    document.getElementById('player1-dead'),
    document.getElementById('player2-dead')
  ];

  for (const box of deadBoxes) {
    const deadSlots = box.querySelectorAll('.pokemon-slot');
    for (const deadSlot of deadSlots) {
      if (!deadSlot.querySelector('img')) {
        deadSlot.innerHTML = slot.innerHTML;
        deadSlot.style.backgroundColor = slot.style.backgroundColor;
        deadSlot.style.border = slot.style.border;
        slot.innerHTML = '';
        slot.style.backgroundColor = '';
        slot.style.border = '';
        isKillingMode = false;
        document.getElementById('killButton').classList.remove('killing');
        saveData();
        return;
      }
    }
  }

  if (confirm('Toten-Box ist voll! Ältestes Pokémon wird ersetzt. Fortfahren?')) {
    for (const box of deadBoxes) {
      const deadSlots = box.querySelectorAll('.pokemon-slot');
      for (const deadSlot of deadSlots) {
        if (deadSlot.querySelector('img')) {
          deadSlot.innerHTML = slot.innerHTML;
          deadSlot.style.backgroundColor = slot.style.backgroundColor;
          deadSlot.style.border = slot.style.border;
          slot.innerHTML = '';
          slot.style.backgroundColor = '';
          slot.style.border = '';
          isKillingMode = false;
          document.getElementById('killButton').classList.remove('killing');
          saveData();
          return;
        }
      }
    }
  }
}

function isAlreadyLinked(slot1, slot2) {
  for (const pair of soullinkPairs) {
    if ((pair[0] === slot1 && pair[1] === slot2) || (pair[0] === slot2 && pair[1] === slot1)) {
      return true;
    }
  }
  return false;
}

function openPokemonModal() {
  const modal = document.getElementById('pokemonModal');
  modal.style.display = 'flex';
  renderPokemonList();
}

function renderPokemonList() {
  const list = document.getElementById('pokemonList');
  list.innerHTML = '';
  pokemonNames.forEach(number => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${parseInt(number)}.png" alt="Pokemon ${number}"><br>#${number}`;
    div.onclick = () => selectPokemon(number);
    list.appendChild(div);
  });
}

function selectPokemon(number) {
  if (activeSlot) {
    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${parseInt(number)}.png`;
    activeSlot.innerHTML = '';
    activeSlot.appendChild(img);
    document.getElementById('pokemonModal').style.display = 'none';
    saveData();
  }
}

function filterPokemonList() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const list = document.getElementById('pokemonList');
  const items = list.querySelectorAll('div');
  items.forEach(item => {
    const name = item.innerText.toLowerCase();
    item.style.display = name.includes(input) ? 'block' : 'none';
  });
}

function dragStart(e) {
  draggedSlot = e.target.closest('.pokemon-slot');
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const targetSlot = e.target.closest('.pokemon-slot');
  if (draggedSlot && targetSlot && draggedSlot !== targetSlot) {
    swapSlots(draggedSlot, targetSlot);
    saveData();
  }
}

function swapSlots(slot1, slot2) {
  const tempHTML = slot1.innerHTML;
  const tempBackground = slot1.style.backgroundColor;
  const tempBorder = slot1.style.border;

  slot1.innerHTML = slot2.innerHTML;
  slot1.style.backgroundColor = slot2.style.backgroundColor;
  slot1.style.border = slot2.style.border;

  slot2.innerHTML = tempHTML;
  slot2.style.backgroundColor = tempBackground;
  slot2.style.border = tempBorder;
}

function saveData() {
  const allSlots = document.querySelectorAll('.pokemon-slot');
  const slotData = Array.from(allSlots).map(slot => ({
    html: slot.innerHTML,
    backgroundColor: slot.style.backgroundColor,
    border: slot.style.border
  }));
  const trackerText = document.getElementById('routeTracker').value;

  localStorage.setItem('slotData', JSON.stringify(slotData));
  localStorage.setItem('trackerText', trackerText);
}

function loadData() {
  const slotData = JSON.parse(localStorage.getItem('slotData') || '[]');
  const trackerText = localStorage.getItem('trackerText') || '';

  const allSlots = document.querySelectorAll('.pokemon-slot');
  allSlots.forEach((slot, index) => {
    if (slotData[index]) {
      slot.innerHTML = slotData[index].html;
      slot.style.backgroundColor = slotData[index].backgroundColor;
      slot.style.border = slotData[index].border;
    }
  });

  document.getElementById('routeTracker').value = trackerText;
}

window.onload = function() {
  loadData();
};

window.onclick = function(event) {
  const modal = document.getElementById('pokemonModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Automatische Nummerierung bei Enter
const routeTracker = document.getElementById('routeTracker');

routeTracker.addEventListener('focus', function() {
  if (routeTracker.value.trim() === '') {
    routeTracker.value = '1. ';
  }
});

routeTracker.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const lines = routeTracker.value.split('\n');
    const currentLine = lines.length + 1;
    routeTracker.value += `\n${currentLine}. `;
  }
});

routeTracker.addEventListener('input', saveData);
