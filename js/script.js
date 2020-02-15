//global variable
const studentList = document.getElementsByClassName('student-item cf');

// the showPage Function hides students to only show 10 students per page
const showPage = (list,page) => {
   for (let i = 0; i < studentList.length; i ++) {  
      if (list <= i && i <= page){
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = 'none';
      }
   }
}

/* The appendPageLinks() function broken down into refactored functions 
for pagination and manipulating the page */

const theSearchFunction = () => {
   const headerDiv = document.getElementsByClassName('page-header cf')[0];
   const students = document.getElementsByTagName('h3');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');
   headerDiv.appendChild(searchDiv);
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   searchDiv.className = 'student-search';
   searchInput.placeholder = 'Search for students...';
   searchButton.textContent = 'Search';
   searchInput.addEventListener('input', (e) =>{
      for (let student of students) { 
         if (student.innerText.search(searchInput.value) != -1) {
            student.parentNode.parentNode.style.display = '';
            student.parentNode.parentNode.className = 'student-item cf';
         } else {
            student.parentNode.parentNode.style.display = 'none';
            student.parentNode.parentNode.className = 'studentNotVisible cf';
         }
      }
      const numsToRemove = document.querySelector('div.pagination');
      numsToRemove.parentNode.removeChild(numsToRemove);
      thePageNumbers();
   })  
}

const thePageNumbers = () => {
   pageNumbers = Math.trunc(parseInt(studentList.length) / 10);
   if (parseInt(studentList.length) > pageNumbers * 10){
      pageNumbers++;
   }
   const pageDiv = document.getElementsByClassName('page')[0];
   const buttonsDiv = document.createElement('div');
   const buttonsUl = document.createElement('ul');
   const buttonsLi = document.createElement('li');
   pageDiv.appendChild(buttonsDiv);
   buttonsDiv.appendChild(buttonsUl);
   buttonsUl.appendChild(buttonsLi);
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
   clickThePages();
}

const clickThePages = () => {
   const buttons = document.getElementsByTagName('a');
   if (buttons[0] != undefined){
      buttons[0].className = 'active';
      for (const button of buttons){
         showPage(0,9);
         button.addEventListener('click', (e) =>{
            for (const button of buttons){
               if (button != e.target) {
                  button.className = '';
               }
            }
            button.className = 'active';
            index = e.target.textContent;
            list = ((parseInt(index)) * 10) - 10;
            page = ((parseInt(index)) * 10) - 1;
            showPage(list,page);
            console.log("here's list: " + list);
         }) 
      }
   } else {
      const pageDiv = document.getElementsByClassName('pagination')[0];
      const searchNullDiv = document.createElement('div');
      const searchNullUl = document.createElement('ul');
      const searchNullLi = document.createElement('li');
      pageDiv.appendChild(searchNullDiv);
      searchNullDiv.appendChild(searchNullUl);
      searchNullUl.appendChild(searchNullLi);
      searchNullLi.textContent = "Sorry, there are no students by that name";
   }
}

const appendPageLinks = () => {
   showPage(0,9);
   theSearchFunction();
   thePageNumbers();
   clickThePages();
}

appendPageLinks();