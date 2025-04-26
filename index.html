const pokemonNames = [];
for (let i = 1; i <= 251; i++) {
  pokemonNames.push(i.toString().padStart(3, '0'));
}

let activeSlot = null;
let draggedSlot = null;
let soullinkPairs = [];
let isLinkingMode = false;
let isKillingMode = false;
let isDeletingMode = false;
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
  if (isDeletingMode && slot.querySelector('img')) {
    slot.innerHTML = '';
    slot.style.backgroundColor = '';
    slot.style.border = '';
    isDeletingMode = false;
    deactivateAllModes();
    saveData();
    return;
  }

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
  if (!isLinkingMode) {
    activateMode('link');
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
      deactivateAllModes();
      selected = [];
      document.querySelectorAll('.pokemon-slot').forEach(slot => slot.classList.remove('linked'));
    } else {
      alert('Bitte genau zwei Pokémon auswählen!');
    }
  }
}

function startKillMode() {
  activateMode('kill');
  alert('Klicke auf ein Pokémon, um es in die Toten-Box zu verschieben!');
}

function startDeleteMode() {
  activateMode('delete');
  alert('Klicke auf ein Pokémon, um es zu löschen!');
}

function activateMode(mode) {
  isLinkingMode = mode === 'link';
  isKillingMode = mode === 'kill';
  isDeletingMode = mode === 'delete';

  document.getElementById('linkButton').classList.remove('blinking', 'killing', 'deleting');
  document.getElementById('killButton').classList.remove('blinking', 'killing', 'deleting');
  document.getElementById('deleteButton').classList.remove('blinking', 'killing', 'deleting');

  if (mode === 'link') {
    document.getElementById('linkButton').classList.add('blinking');
  }
  if (mode === 'kill') {
    document.getElementById('killButton').classList.add('killing');
  }
  if (mode === 'delete') {
    document.getElementById('deleteButton').classList.add('deleting');
  }
}

function deactivateAllModes() {
  isLinkingMode = false;
  isKillingMode = false;
  isDeletingMode = false;

  document.getElementById('linkButton').classList.remove('blinking');
  document.getElementById('killButton').classList.remove('killing');
  document.getElementById('deleteButton').classList.remove('deleting');
}

function killPokemon(slot) {
  const deadBoxes = [document.getElementById('player1-dead'), document.getElementById('player2-dead')];

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
        saveData();
        deactivateAllModes();
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
          saveData();
          deactivateAllModes();
          return;
        }
      }
    }
  }
}

function isAlreadyLinked(slot1, slot2) {
  return soullinkPairs.some(pair => (pair[0] === slot1 && pair[1] === slot2) || (pair[0] === slot2 && pair[1] === slot1));
}

function openPokemonModal() {
  document.getElementById('pokemonModal').style.display = 'flex';
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
  const player1Name = document.getElementById('player1-name')?.textContent || 'Spieler 1';
  const player2Name = document.getElementById('player2-name')?.textContent || 'Spieler 2';

  localStorage.setItem('slotData', JSON.stringify(slotData));
  localStorage.setItem('trackerText', trackerText);
  localStorage.setItem('player1-name', player1Name);
  localStorage.setItem('player2-name', player2Name);
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

  const name1 = localStorage.getItem('player1-name');
  const name2 = localStorage.getItem('player2-name');

  if (name1) document.getElementById('player1-name').textContent = name1;
  if (name2) document.getElementById('player2-name').textContent = name2;
}

function editName(id) {
  const span = document.getElementById(id);
  const currentName = span.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.className = 'player-name-input';

  input.onblur = () => saveName(id, input.value);
  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      saveName(id, input.value);
    }
  };

  span.replaceWith(input);
  input.focus();
}

function saveName(id, newName) {
  const span = document.createElement('span');
  span.id = id;
  span.textContent = newName || 'Spieler';
  span.setAttribute('ondblclick', `editName('${id}')`);

  const input = document.querySelector('.player-name-input');
  input.replaceWith(span);

  saveData(); // wichtig: speichert Namen nach Änderung
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

// Tracker automatische Nummerierung
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
