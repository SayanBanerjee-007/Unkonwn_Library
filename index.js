show();
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    add(book) {
        let tableDataName = localStorage.getItem('tableDataName');
        let tableDataAuthor = localStorage.getItem('tableDataAuthor');
        let tableDataType = localStorage.getItem('tableDataType');

        if (tableDataName == null || tableDataAuthor == null || tableDataType == null) {
            bookClassArrayName = [];
            bookClassArrayAuthor = [];
            bookClassArrayType = [];
        } else {
            bookClassArrayName = JSON.parse(tableDataName);
            bookClassArrayAuthor = JSON.parse(tableDataAuthor);
            bookClassArrayType = JSON.parse(tableDataType);
        }
        bookClassArrayName.push(book.name);
        bookClassArrayAuthor.push(book.author);
        bookClassArrayType.push(book.type);


        localStorage.setItem('tableDataName', JSON.stringify(bookClassArrayName));
        localStorage.setItem('tableDataAuthor', JSON.stringify(bookClassArrayAuthor));
        localStorage.setItem('tableDataType', JSON.stringify(bookClassArrayType));
    }
    validate(book) {
        if (book.name.length > 2 && book.author.length > 2) {
            return true;
        } else {
            return false;
        }
    }
    alertMessage(iconType, msgType, innerMSG) {
        Swal.fire({
            icon: `${iconType}`,
            title: `${msgType}`,
            text: `${innerMSG}`,
        })
    }
    clear() {
        libraryForm.reset();
    }
}

function show() {
    let tableDataName = localStorage.getItem('tableDataName');
    let tableDataAuthor = localStorage.getItem('tableDataAuthor');
    let tableDataType = localStorage.getItem('tableDataType');

    if (tableDataName == null || tableDataAuthor == null || tableDataType == null) {
        bookClassArrayName = [];
        bookClassArrayAuthor = [];
        bookClassArrayType = [];
    } else {
        bookClassArrayName = JSON.parse(tableDataName);
        bookClassArrayAuthor = JSON.parse(tableDataAuthor);
        bookClassArrayType = JSON.parse(tableDataType);
    }

    let html = '';
    bookClassArrayType.forEach(function (element, index) {
        html +=
            `  <tr>
            <td>${bookClassArrayName[index]}</td>
            <td>${bookClassArrayAuthor[index]}</td>
            <td>${bookClassArrayType[index]}</td>
            <td><button type="submit" onclick="deleteRow(this.id)" id="dleBtn${index}">Delete</button>
         </tr>`;
    });

    let tableBody = document.getElementById('tableBody');
    let table = document.getElementById('table');
    let heading = document.getElementById('heading');
    if(bookClassArrayType.length > 0) {
        table.style.display = 'block';
        heading.innerHTML = `Your books -`;
    }else{
        heading.innerHTML = `You have not added any books yet.`;
        table.style.display = 'none';   
    }
    tableBody.innerHTML = html;
}
function deleteRow(id) {
    let tableDataName = localStorage.getItem('tableDataName');
    let tableDataAuthor = localStorage.getItem('tableDataAuthor');
    let tableDataType = localStorage.getItem('tableDataType');


    bookClassArrayName = JSON.parse(tableDataName);
    bookClassArrayAuthor = JSON.parse(tableDataAuthor);
    bookClassArrayType = JSON.parse(tableDataType);

    let index = id.slice(-1);
    console.log(index);

    bookClassArrayName.splice(index, 1);
    bookClassArrayAuthor.splice(index, 1);
    bookClassArrayType.splice(index, 1);

    localStorage.setItem('tableDataName', JSON.stringify(bookClassArrayName));
    localStorage.setItem('tableDataAuthor', JSON.stringify(bookClassArrayAuthor));
    localStorage.setItem('tableDataType', JSON.stringify(bookClassArrayType));

    show();
}
const libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", function (e) {
   
    e.preventDefault();
    let bookName = document.querySelector("#bookName").value.toUpperCase();
    let author = document.querySelector("#author").value.toUpperCase();
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(bookName, author, type);
    let display = new Display();
    let msg;

    if (display.validate(book)) {
        display.add(book);
        show();
        msg = "Your book has been successfully added.";
        display.alertMessage("success", "Success👍", msg);
        display.clear();
    } else {
        msg = "Field empty or wrong information.";
        display.alertMessage("error", "Error!!😢", msg);
    }

});

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){

    let inputVal = search.value.toUpperCase();
    let tableBody = document.getElementById('tableBody');
    let table = document.getElementById('table');
    let heading = document.getElementById('heading');
    let noneDisplayCount = 0;
    
        
    for(let i = 0; i < tableBody.childElementCount; i++) {
        
        let bName = tableBody.children[i].children[0].innerText;
        let author = tableBody.children[i].children[1].innerText;
        let type = tableBody.children[i].children[2].innerText;
        
        if(bName.includes(inputVal)|| author.includes(inputVal)|| type.includes(inputVal)){
            tableBody.children[i].style.display = 'table-row';
        }
        else{
            tableBody.children[i].style.display = 'none';
            noneDisplayCount++;
        }   
    }
    if(noneDisplayCount == tableBody.childElementCount){
        heading.innerText = `No book has been found with the specified search value.Sorry😢!!`;
        table.style.display = 'none';
    }else{
        heading.innerHTML = `Your books -`;
        table.style.display = 'block';
    }
    
})
