import { showDataStorage } from "./model.js";

const showFormAdd = () => { 
    const showAddForm = document.querySelector('.showAddForm');
    showAddForm.addEventListener('click', () => {

        
        const containerAdd = document.querySelector('.add-container');
     
        containerAdd.removeAttribute('hidden');
       
    })
}

const closeFormAdd = () => {
    const closeAddForm = document.querySelector('.container-closeAdd');

    closeAddForm.addEventListener('click', () => {
        const addContainer = document.querySelector('.add-container');
        addContainer.setAttribute('hidden','hidden');
    })


}

// Expression function
const closeFormUpdate = function() {
    const closeUpdate = document.querySelector('.container-closeUpdate');
    closeUpdate.addEventListener('click', () => {
       const containerUpdateData = document.querySelector('.updateData-container');
       containerUpdateData.setAttribute('hidden','hidden');
    })
}

const searchFunction = () => {
    const HistoryData = showDataStorage();
    const searchForm = document.querySelector('.search-form');

    searchForm.addEventListener('submit',(event) => {
      
        const inputFormSearch = document.querySelector('.inputFormSearch').value.toLowerCase();
        const displaySearch = document.querySelector('.displaySearch');

        if(HistoryData != null || HistoryData != '') {

        for(let index=0; index <= HistoryData.length-1; index++) {
            if(inputFormSearch == HistoryData[index].terminology) {
                displaySearch.innerHTML = `<h6>Terminology : ${HistoryData[index].terminology} <br> Meaning: ${HistoryData[index].meaning} </h6>`
                event.preventDefault();
            } 
        }

    } else {
        alert('No Data');
    }
    });
}
export {showFormAdd,closeFormAdd,closeFormUpdate,searchFunction};