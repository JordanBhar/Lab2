
let db;
let openRequest = indexedDB.open("CompanyInfoDB",2);

openRequest.onupgradeneeded = function(e) {
    var DB = e.target.result;
    if(!DB.objectStoreNames.contains("Company")) {
        //tables name is People
        const companyTable = DB.createObjectStore("Company", {keyPath: "id"});
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
    var person = {id: ID , name: Name, companyname: CompanyName ,created: new Date()}

    //open a read/write transaction
    var tx = makeTX("Company","readwrite");

    //create object store
    var transaction = tx.objectStore("Company");

    //make a request to add a new item
    var request = transaction.add(person)

    request.onsuccess = (ev) => {
        console.log('successfully added an object');
        //move on to the next request in the transaction or
        //commit the transaction
    };
    request.onerror = (err) => {
        console.log('error in request to add');
    };

}

function checkCompany(){

}

function deleteCompany(evt){

    let id = document.getElementById("invid").value


    var tx = makeTX("Company","readwrite");

    //create object store
    var transaction = tx.objectStore("Company");

    //make a request to add a new item
    var request = transaction.delete(id)

    request.onsuccess = (ev) => {
        console.log('successfully deleted an object');

        //move on to the next request in the transaction or
        //commit the transaction
    };
    request.onerror = (err) => {
        console.log('error in request to delete');
    };

}

FormEventListener()

function FormEventListener() {
    let addButton = document.getElementById("addCompany").addEventListener("click", validateForm)
    let deleteButton = document.getElementById("removeCompany").addEventListener("click", deleteCompany)
    let checkButton = document.getElementById("checkCompany").addEventListener("click", null)
}

function validateForm(evt) {

    let isValid = false;

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
        //need to finish code here
    }else {
        addCompany(id, name, companyName)
        //need to finish code here
    }

}

function isEmpty(input){
    return (input.length > 0)
}

function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
        console.warn(err);
    };
    return tx;
}



