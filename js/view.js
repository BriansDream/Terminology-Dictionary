

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


export {showFormAdd,closeFormAdd,closeFormUpdate};