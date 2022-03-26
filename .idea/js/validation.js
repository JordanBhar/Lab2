
let db;
let openRequest = indexedDB.open("CompanyInfoDB",2);

openRequest.onupgradeneeded = function(e) {
    var DB = e.target.result;
    if(!DB.objectStoreNames.contains("Company")) {
        //tables name is People
        const companyTable = DB.createObjectStore("Company", {keyPath: "ID"});
    }
};

openRequest.onsuccess = function(e) {
    db = e.target.result;

};
openRequest.onerror = function(e) {
    //console.dir(e);
    // ..do error notification
}


function addCompany(ID, Name , CompanyName){
    var persons = [{id: ID , name: Name, companyname: CompanyName ,created: new Date()}]

    //open a read/write transaction
    var transaction = db.transaction(["Company"],"readwrite");

    //create object store
    var peopleStore = transaction.objectStore("Company");

    //make a request to add a new item
    var request = peopleStore.add(persons[0] , "1")

}

function checkCompany(){

}



function deleteCompnay(){

}



FormEventListener()

function FormEventListener() {

    let addButton = document.getElementById("addCompany").addEventListener("click", validateForm)


}

function validateForm(evt) {

    let isValid = false;

    console.log("test")

    let id = document.getElementById("invid").value
    let name = document.getElementById("name").value
    let companyName = document.getElementById("companyname").value



    if (isEmpty(id)){
        document.getElementById("error1").hidden = true

    }else {
        document.getElementById("error1").hidden = false

    }


    if (isEmpty(name)){
        document.getElementById("error2").hidden = true

    }else {
        document.getElementById("error2").hidden = false

    }

    if (isEmpty(companyName)){
        document.getElementById("error3").hidden = true

    }else {
        document.getElementById("error3").hidden = false

    }




    isValid = id && name && companyName

    if (!isValid){
        console.log("Wrong")
    }else {
        addCompany(id, name, companyName)
    }

}


function isEmpty(input){
    return (input.length > 0)
}


