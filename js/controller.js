import { showFormAdd,closeFormAdd,closeFormUpdate, searchFunction} from "./view.js";
import {putDataStorage, renderDataStorage} from "./model.js"
import { EmptyInput } from "./classCollection.js";

const generateIDFunct = function(){

    const thisDay = new Date();
    return thisDay.getTime();

}

generateIDFunct();

const addDataFunct = () => {
    const formAdd = document.querySelector('.formAdd');
    formAdd.addEventListener('submit', (event) => {

        const inputAddTerminology = document.querySelector('.inputAddTerminology').value.toLowerCase();
        const inputAddMeaning = document.querySelector('.inputAddMeaning').value.toLowerCase();

    try {

        if(inputAddTerminology == '' || inputAddTerminology == 'null', inputAddMeaning == '' || inputAddMeaning == null) {
            throw new EmptyInput('Brother, this form cannot be empty !!! ');
        }

       const NewTerminology = { 
           id: generateIDFunct(),
           terminology: inputAddTerminology,
           meaning: inputAddMeaning
       }

       putDataStorage(NewTerminology);
       renderDataStorage();

    } catch (error) {

        if(error instanceof EmptyInput) {
            alert(error.message);
        }

    }
      
    })
}







const runFunction = () => {
    showFormAdd();
    closeFormAdd();
    addDataFunct();
    renderDataStorage();
    closeFormUpdate();
    searchFunction();

}

runFunction();