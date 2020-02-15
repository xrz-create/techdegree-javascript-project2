/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1d
//iUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//global variable
const studentList = document.getElementsByClassName('student-item cf');

// the showPage Function hides students to only show 10 students per page
const showPage = (list,page) => {
   for (let i = 0; i < studentList.length; i ++){  
      if (list <= i && i <= page){
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = 'none';
      }
   }
}


/* The appendPageLinks() function broken down into refactored functions 
for pagination and manipulating the page */

const makeElements = (name, create) => {
   "const " + name + " = document.createElement('" + create + "');";
}

const appendChildren = (name, child) => name + ".appendChild(" + child + ");"

const theSearchFunction = () => {
   const headerDiv = document.getElementsByClassName('page-header cf')[0];
   makeElements(searchDiv,div);
   makeElements(document,input);
   makeElements(searchButton,button);
   appendChildren(headerDiv,searchDiv);
   appendChildren(searchDiv,searchInput);
   appendChildren(searchDiv,searchButton);
   searchDiv.className = 'student-search';
   searchInput.placeholder = 'Search for students...';
   searchButton.textContent = 'Search';
}

const thePageNumbers = () => {
   pageNumbers = Math.trunc(parseInt(studentList.length) / 10);
      if (parseInt(studentList.length) > pageNumbers * 10){
         pageNumbers++;
      }
   const pageDiv = document.getElementsByClassName('page')[0];
   makeElements(buttonsDiv,div);
   makeElements(buttonsUl,ul);
   makeElements(buttonsLi,li);
   appendChildren(pageDiv,buttonsDiv);
   appendChildren(buttonsDiv,buttonsUl);
   appendChildren(buttonsUl,buttonsLi);
   buttonsDiv.className = 'pagination';
   buttonsUl.className = 'pagination';
   buttonsLi.className = 'pagination';
   for (let p = 1; p <= pageNumbers; p++){
      const pageButton = document.createElement('a');
      pageButton.setAttribute('href', "#");
      pageButton.append(p);
      pageButton.className = 'pagination';     
      buttonsLi.appendChild(pageButton);
   }     
}

const clickThePages = () => {
   const buttons = document.getElementsByTagName('a');
   buttons[0].className = 'active';
   for (const button of buttons){
      button.addEventListener('click', (e) =>{
         for (const button of buttons){
            if (button != e.target) {
               button.className = '';
            }
         }
         button.className = 'active';
         index = e.target.textContent;
         showPage(((parseInt(index)) * 10) - 10,((parseInt(index)) * 10) - 1);
      }) 
   }
}

const appendPageLinks = () => {
   showPage(0,9);
   theSearchFunction();
   thePageNumbers();
   clickThePages();
}

appendPageLinks();