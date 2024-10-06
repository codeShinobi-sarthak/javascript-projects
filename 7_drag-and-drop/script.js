const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listCol = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = true;
let currentCol;
let draggedItem;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  draggedItem = ev.target;
}

function drop(ev) {
  ev.preventDefault();
  listCol.forEach((element) => {
    element.classList.remove("over");
  });
  const cur = listCol[currentCol];
  cur.appendChild(draggedItem);
  newArray();
}

// when item enter the area
function dragEnter(col) {
  listCol[col].classList.add("over");
  currentCol = col;
}

// Get Arrays from localStorage if available, or set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listArrays[index])
    );
  });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.setAttribute("draggable", "true");
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.setAttribute("ondrop", "drop(event)");
  // listEl.setAttribute("onfocusout", `updateItem(${column}, ${index})`);
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.textContent = item;
  columnEl.append(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (updatedOnLoad) {
    updatedOnLoad = false;
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = "";
  backlogListArray.forEach((backlogItems, index) => {
    createItemEl(backlogList, 0, backlogItems, index);
  });
  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItems, index) => {
    createItemEl(progressList, 1, progressItems, index);
  });
  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItems, index) => {
    createItemEl(completeList, 2, completeItems, index);
  });
  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItems, index) => {
    createItemEl(onHoldList, 3, onHoldItems, index);
  });
  // Run getSavedColumns only once, Update Local Storage
  updateSavedColumns();
}

function addToColumn(col) {
  const text = addItems[col].textContent;
  listArrays[col].push(text);
  updateDOM();
}

// to display input box to add item
function displayInputBox(col) {
  addBtns[col].style.visibility = "hidden";
  saveItemBtns[col].style.display = "flex";
  addItemContainers[col].style.display = "flex";
  addItems[col].setAttribute("contenteditable", "true");
}

// to hide input box by clicking the save btn
function hideInputBox(col) {
  addBtns[col].style.visibility = "visible";
  saveItemBtns[col].style.display = "none";
  addItemContainers[col].style.display = "none";
  addToColumn(col);
  addItems[col].textContent = "";
}

// updating th earrau after drag ans drop
function newArray() {
  backlogListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }

  progressListArray = [];
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }

  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }

  onHoldListArray = [];
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }

  updateDOM();
}

function updateItem(column, id) {
  const selectedArray = listArrays[column];
  const selectedCol = listCol[column].children;
  console.log(selectedCol);
  console.log(selectedCol[id].textContent);

  // if (selectedCol[id].textContent == null) {
  //   delete selectedArray[id];
  //   // selectedArray.splice(id,1);
  // }
  updateDOM();
}

updateDOM();
