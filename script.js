const myLibrary = [];
const IS_READ = "finished reading";
const NOT_READ = "not read yet";

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  let readStatus = null;

  if(this.read){
    readStatus = IS_READ;
  } else {
    readStatus = NOT_READ;
  }

  this.info = function(){
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + readStatus;
  }

  this.toggleRead = function(){
    if(readStatus === IS_READ){
      readStatus = NOT_READ;
    } else {
      readStatus = IS_READ;
    }
  }

  this.getReadStatus = function(){
    return readStatus;
  }
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

function removeBook(){
  let removeBtns = Array.from(document.querySelectorAll(".removeBtn"));
  let index;
  for(let i=0; i<removeBtns.length; i++){
    if(this === removeBtns[i]){
      index = i;
    }
  }
  myLibrary.splice(index, 1);
  updateLibraryDisplay();
}

function toggleReadBtn(){
  let readBtns = Array.from(document.querySelectorAll(".readBtn"));
  let index;
  for(let i=0; i<readBtns.length; i++){
    if(this === readBtns[i]){
      index = i;
    }
  }
  myLibrary[index].toggleRead();
  updateLibraryDisplay();
}

const theBarefootInvestor = new Book("The Barefoot Investor", "Scott Pape", 304, false);

const hundredMillionLeads = new Book("$100M Leads", "Alex Hormozi", 438, false);

const howToAvoidAClimateDisaster = new Book("How to Avoid a Climate Disaster", "Bill Gates", 208, true);

const expertSecrets = new Book("Expert Secrets", "Russell Brunson", 352, true);

addBookToLibrary(theBarefootInvestor);
addBookToLibrary(hundredMillionLeads);
addBookToLibrary(howToAvoidAClimateDisaster);
addBookToLibrary(expertSecrets);


const container = document.querySelector("#container");
const myForm = document.querySelector("#myForm");

function updateLibraryDisplay(){
  //remove all the child nodes in the container first
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }

  for(let i=0; i<myLibrary.length; i++){
    const myDiv = document.createElement("div");
    myDiv.className = "bookDiv";
    const textDiv = document.createElement("div");
    textDiv.className = "bookTextDiv";
    textDiv.textContent = myLibrary[i].info();
    myDiv.appendChild(textDiv);

    const btnDiv = document.createElement("div");
    btnDiv.className = "btnDiv";
    myDiv.appendChild(btnDiv);

    const readBtn = document.createElement("button");
    readBtn.className = "readBtn";
    readBtn.addEventListener("click", toggleReadBtn);
    if(myLibrary[i].getReadStatus() === IS_READ){
      readBtn.textContent = "Mark Unread";
      readBtn.style.backgroundColor = "rgb(247, 197, 136)";
    } else {
      readBtn.textContent = "Mark Read";
    }
    btnDiv.appendChild(readBtn);

    const myBtn = document.createElement("button");
    myBtn.className = "removeBtn";
    myBtn.textContent = "Remove";
    myBtn.addEventListener("click", removeBook);
    btnDiv.appendChild(myBtn);

    container.appendChild(myDiv);
  }
  
}

function hideForm(){
  myForm.style.display = "none";
}

updateLibraryDisplay();
hideForm();

const newBookBtn = document.querySelector("#newBookBtn");

newBookBtn.addEventListener("click", function(e) {
  if(myForm.style.display === "none"){
    myForm.style.display = "block";
  } else {
    myForm.style.display = "none";
  }
});

const submitBookBtn = document.querySelector("#submitBookBtn");
const bookTitleInput = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const numPages = document.querySelector("#numPages");
const readStatus = document.querySelector("#readStatus");
const successText = document.querySelector("#successText");

submitBookBtn.addEventListener("click", function(e) {
  if(!(bookTitleInput.value === "" || bookAuthor.value === "" || numPages.value === "")){
    e.preventDefault();
    const newBook = new Book(bookTitleInput.value, bookAuthor.value, +numPages.value, readStatus.checked);
    addBookToLibrary(newBook);
    updateLibraryDisplay();
    hideForm();
    myForm.reset();
    successText.textContent = "Success. Your book has been added!";
  }
});
