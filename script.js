// Updated script.js
// Includes: 
// 1. Timer and scoring logic
// 2. Module completion status
// 3. Randomized matching
// 4. Accurate Module 2 click areas

// START OF SCRIPT
let currentPage = "etusivu";
let currentModuleSection = "moduuli1";
let moduleTimers = {};
let moduleScores = {};
let moduleStartTime = null;
let completedModules = new Set();

function startModuleTimer(moduleId) {
  moduleStartTime = Date.now();
  moduleTimers[moduleId] = moduleStartTime;
}

function completeModule(moduleId, score) {
  const endTime = Date.now();
  const duration = Math.round((endTime - moduleTimers[moduleId]) / 1000);
  moduleScores[moduleId] = { score, time: duration };
  completedModules.add(moduleId);

  const moduleItem = document.querySelector(`.module-item[onclick="showModule('${moduleId}')"]`);
  if (moduleItem && !moduleItem.classList.contains("completed")) {
    moduleItem.classList.add("completed");
    const mark = document.createElement("span");
    mark.className = "check-mark";
    mark.textContent = "✅";
    moduleItem.appendChild(mark);
  }

  // If all modules done, show summary
  if (completedModules.size === 4) {
    let totalTime = 0;
    let totalScore = 0;
    let totalItems = 0;
    for (const id in moduleScores) {
      totalTime += moduleScores[id].time;
      totalScore += moduleScores[id].score || 0;
      totalItems++;
    }
    const avgScore = Math.round((totalScore / totalItems) * 100);
    alert(`🎉 Kaikki moduulit valmiit! Kokonaispistemäärä: ${avgScore}%, Aika: ${totalTime} sekuntia`);
  }
}

function showModule(sectionId) {
  showPage("learning-modules");
  const sections = document.querySelectorAll(".module-section");
  sections.forEach((section) => section.classList.remove("active"));
  const selected = document.getElementById(sectionId);
  if (selected) {
    selected.classList.add("active");
    currentModuleSection = sectionId;
    startModuleTimer(sectionId);
  }
  const items = document.querySelectorAll(".module-item");
  items.forEach((item) => item.classList.remove("active"));
  const activeItem = document.querySelector(`.module-item[onclick="showModule('${sectionId}')"]`);
  if (activeItem) activeItem.classList.add("active");
  updateProgressIndicator();
}

function updateProgressIndicator() {
  const index = ["moduuli1", "moduuli2", "moduuli3", "moduuli4"].indexOf(currentModuleSection);
  const display = document.getElementById("progress-indicator");
  if (display) display.textContent = `Moduuli ${index + 1} / 4`;
}

function shuffleMatchingItems() {
  const exercises = document.querySelectorAll(".exercise-section");
  exercises.forEach((section) => {
    const left = section.querySelectorAll(".matching-item");
    const right = section.querySelectorAll(".matching-slot");
    const leftArr = Array.from(left);
    const rightArr = Array.from(right);

    for (const container of [left[0]?.parentNode, right[0]?.parentNode]) {
      if (!container) return;
      container.innerHTML = "";
    }

    shuffleArray(leftArr);
    shuffleArray(rightArr);

    leftArr.forEach(el => left[0].parentNode.appendChild(el));
    rightArr.forEach(el => right[0].parentNode.appendChild(el));
  });
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  shuffleMatchingItems();
  updateProgressIndicator();
});


