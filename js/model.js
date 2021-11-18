// Model 
// Yang berhubungan dengan manipulasi data dan database



// Key untuk webstorage
const CACHE_KEY = 'CACHE_KEY';

// Pengecekan storage selalu digunakan didalam if statement setiap fungsi transaksi pada storage
const checkWebStorage = () => {
    return typeof(Storage) != null;
}


const putDataStorage = function(data){

    let HistoryData = null;
    if(checkWebStorage()) {
       
        if(localStorage.getItem(CACHE_KEY) == null) {
            HistoryData = [];
        } else {
            HistoryData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }


        HistoryData.unshift(data);

        // Sorting using Higher order function (default ascending)
        HistoryData.sort((a,b) => {
            let nameA = a.terminology;
            let nameB = b.terminology;
            if(nameA < nameB) {
                return -1;
            } 
            if(nameA > nameB) {
                return 1;
            }
            return 0;
        })

      

        localStorage.setItem(CACHE_KEY,JSON.stringify(HistoryData));

    } else {
        alert('Your browser does not support web storage !!');
    }
}



const showDataStorage = () => {
    if(checkWebStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}


const renderDataStorage = () => {
    const HistoryData = showDataStorage();
 
    // Show data from web storage into the UI
    let tableBody = document.querySelector('.tableBody');
    // agar tidak menampilkan data ganda
    tableBody.innerHTML = " ";

for(let index=0; index <= HistoryData.length-1; index++) {

        let row = document.createElement('tr');
        let tableData = document.createElement('td');
        let updateButton = document.createElement('button');
        let deleteButton = document.createElement('button');


        updateButton.setAttribute('class','updateButton');
        updateButton.classList.add('updateButton');
        updateButton.innerHTML = "update";

        deleteButton.setAttribute('class','deleteButton');
        deleteButton.classList.add('updateAndDeleteButton');
        deleteButton.innerHTML = 'delete';

        row.innerHTML = `<td> ${HistoryData[index].terminology} </td>`;
        row.innerHTML += `<td> ${HistoryData[index].meaning} </td>`;
        tableData.appendChild(deleteButton);
        tableData.insertBefore(updateButton,deleteButton);
       
        row.appendChild(tableData);
        tableBody.appendChild(row);
        
        // Still question why this button can get id specific 1 by 1 
        // when we create this button outside the function we can't get id data 1 by 1
        deleteButton.addEventListener('click', () => {
            
            const dataID = HistoryData[index].id;
                if(dataID == HistoryData[index].id) {
                   
                    // way to accest index while using for of => [data]
                   HistoryData.splice(index,1);
                    if(checkWebStorage()) {
                        if(localStorage.getItem(CACHE_KEY) != null) {
                            localStorage.removeItem(CACHE_KEY);
                            location.reload()
                            HistoryData.forEach((dataHistories) => {
                               putDataStorage(dataHistories);
                                renderDataStorage();
                            })
                           
                        }
                    }
                   
                }    
        });

      
        // if we create this function outside render, when data in storage are empty then it will error because there is no element updateButton
        updateButton.addEventListener('click', () => {
           
            const updateDataContainer = document.querySelector('.updateData-container');
            const inputUpdateTerminology = document.querySelector('.terminologyUpdateInput').value = `${HistoryData[index].terminology}`;
            const inputUpdateMeaning = document.querySelector('.meaningUpdateInput').value = `${HistoryData[index].meaning}`;
            updateDataContainer.removeAttribute('hidden');
        
            const formUpdate = document.querySelector('.formUpdate');
            formUpdate.addEventListener('submit' , (event) => {

                const inputUpdateTerminology = document.querySelector('.terminologyUpdateInput').value.toLowerCase();
                const inputUpdateMeaning = document.querySelector('.meaningUpdateInput').value.toLowerCase();
    
                const updateID = HistoryData[index].id;
                
                if(updateID == HistoryData[index].id) {
                       HistoryData[index].terminology = inputUpdateTerminology;
                       HistoryData[index].meaning = inputUpdateMeaning; 
                       if(checkWebStorage()) {
                           if(localStorage.getItem(CACHE_KEY) != null) {
                               localStorage.removeItem(CACHE_KEY);
                                location.reload();
                                HistoryData.forEach((UpdateData) => {
                                   putDataStorage(UpdateData);
                                   renderDataStorage();
                               })
                           }
                       }
                }
            });
        });
       
    }
}



export {putDataStorage, renderDataStorage, showDataStorage};