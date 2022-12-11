//Declaro variable del formulario 
const incomeOutcomeform = document.getElementById("incomeOutcomeform");

incomeOutcomeform.addEventListener("submit", function(event) {
    event.preventDefault();
    let incomeOutcomeformData = new FormData(incomeOutcomeform) //obtengo datos del formulario
    let transactionObj = convertFormData_to_Obj(incomeOutcomeformData) 
    saveTransactionObj(transactionObj)
    insertTransactionRow(transactionObj)

});

document.addEventListener("DOMContentLoaded", function(event) {
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    transactionObjArr.forEach(element => {
        insertTransactionRow(element)
    });
})

// declaro variables concept y amount que seran el contenido de dichos inputs
function convertFormData_to_Obj(incomeOutcomeformData) {
    let concept = incomeOutcomeformData.get("concept")
    let amount = incomeOutcomeformData.get("amount")
    return { 
        "concept" : concept,
        "amount" : amount
    };

}


function insertTransactionRow(transactionObj){
    let transactionRecordRef = document.getElementById("transactionRecord"); //obtiene la tabla
    
    let newTransactionRowRef = transactionRecordRef.insertRow(-1); // una referencia a la fila que me acabo de crear
    
    let newTransactionCellRef = newTransactionRowRef.insertCell(0)
    newTransactionCellRef.textContent = transactionObj["concept"];

    newTransactionCellRef = newTransactionRowRef.insertCell(1)
    newTransactionCellRef.textContent = transactionObj["amount"];
}

function saveTransactionObj(transactionObj){
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj)
    //convierto el array de transacciones a JSOM
    let transactionArrayJSON = JSON.stringify(myTransactionArray)
    //lo guardo en el localStorage
    localStorage.setItem("transactionData", transactionArrayJSON)
}





