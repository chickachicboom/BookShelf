function openTodoModal() {
    document.getElementById("todo-modal").classList.add("active");
    document.getElementById("todo-modal").focus();
}

function closeTodoModal() {
    document.getElementById("todo-modal").classList.remove("active");
}

function saveToLocalStorage() {
    localStorage.setItem('myBookData', JSON.stringify(bookData));
}

window.onload = function() {
    const savedData = localStorage.getItem('myBookData');
    if (savedData) {
        bookData = JSON.parse(savedData);
    }
    renderPage();
};

let bookData = {
    1: { left: [], right: [] },
    2: { left: [], right: [] },
    3: { left: [], right: [] }
};
let currentPage = 1;
const maxPages = 3;

function renderPage() {
    const leftPage = document.getElementById('page-left');
    const rightPage = document.getElementById('page-right');
    
    leftPage.innerHTML = '';
    rightPage.innerHTML = '';

    bookData[currentPage].left.forEach((text, index) => {
        drawItemOnPage(text, 'left', index);
    });
    bookData[currentPage].right.forEach((text, index) => {
        drawItemOnPage(text, 'right', index);
    });

    saveToLocalStorage(); 
}

function drawItemOnPage(text, side, index) {
    const container = (side === 'left') ? document.getElementById('page-left') : document.getElementById('page-right');
    const todoWrapper = document.createElement('div');
    todoWrapper.className = 'todo-item';
    
    todoWrapper.onclick = function() {
        bookData[currentPage][side].splice(index, 1);
        renderPage(); 
    };

    todoWrapper.innerHTML = `<span class="todo-checkbox">☐</span> <span>${text}</span>`;
    container.appendChild(todoWrapper);
}


function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text !== "") {
        bookData[currentPage].left.push(text);
        renderPage();

        const leftPage = document.getElementById('page-left');
        if (leftPage.scrollHeight > leftPage.clientHeight) {
            const movedText = bookData[currentPage].left.pop();
            bookData[currentPage].right.push(movedText);
            renderPage();

            const rightPage = document.getElementById('page-right');
            if (rightPage.scrollHeight > rightPage.clientHeight) {
                bookData[currentPage].right.pop();
                renderPage();
                alert("ขอโทษทีค่ะ หน้านี้เต็มแล้ว ลองไปหน้าถัดไปนะคะ!");
            }
        }
        
        input.value = ""; 
        closeTodoModal();
    }
}

function nextPage() {
    if (currentPage < maxPages) {
        currentPage++;
        renderPage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
}


// let currentPage = 1;
// const maxPages = 3;

// function nextPage() {
//     if (currentPage < maxPages) {
//         currentPage++;
//         renderPage();
//     }
// }

// function prevPage() {
//     if (currentPage > 1) {
//         currentPage--;
//         renderPage();
//     }
// }

// function renderPage() {
//     const leftPage = document.getElementById('page-left');
//     const rightPage = document.getElementById('page-right');
//     const bgImage = document.querySelector('.book-bg');

//     leftPage.innerHTML = '';
//     rightPage.innerHTML = '';

//     if (bookData[currentPage]) {
//         bookData[currentPage].left.forEach(text => createTodoElement(text, 'left'));
//         bookData[currentPage].right.forEach(text => createTodoElement(text, 'right'));
//     }
// }

// function addTodo() {
//     const input = document.getElementById('todo-input');
//     const text = input.value.trim();
    
//     if (text !== "") {
//         const currentLeft = bookData[currentPage].left;
//         const currentRight = bookData[currentPage].right;

//         bookData[currentPage].left.push(text); 
//         renderPage();

//         const leftPage = document.getElementById('page-left');
//         if (leftPage.scrollHeight > leftPage.clientHeight) {
//             const lastItem = bookData[currentPage].left.pop();
//             bookData[currentPage].right.push(lastItem);
//             renderPage();
            
//             const rightPage = document.getElementById('page-right');
//             if (rightPage.scrollHeight > rightPage.clientHeight) {
//                 bookData[currentPage].right.pop();
//                 renderPage();
//             }
//         }
        
//         input.value = ""; 
//         closeTodoModal();
//     }
// }


// function addTodo(){
//     const input = document.getElementById("todo-input");
//     const text = input.value.trim();

//     if (text !== "") {
//     const todoWrapper = document.createElement("div");
//     todoWrapper.className = "todo-item";

//     const checkbox = document.createElement("span");
//     checkbox.className = "todo-checkbox";
//     checkbox.innerHTML = "☐";

//     todoWrapper.onclick = function() {
//         this.remove();
//     }

//     const todoText = document.createElement("span");
//     todoText.textContent = text;

//     todoWrapper.appendChild(checkbox);
//     todoWrapper.appendChild(todoText);

//     const leftPage = document.getElementById("page-left");
//     const rightPage = document.getElementById("page-right");

//     leftPage.appendChild(todoWrapper);

//     if (leftPage.scrollHeight > leftPage.clientHeight) {
//         leftPage.removeChild(todoWrapper);
//         rightPage.appendChild(todoWrapper);

//         if (rightPage.scrollHeight > rightPage.clientHeight) {
//             rightPage.removeChild(todoItem);
//         }
//     }
//     }

//     input.value = ""
//     closeTodoModal();
// }