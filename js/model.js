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

        if(HistoryData > 3) {
            HistoryData.pop();
        }

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

    for (let data of HistoryData) {

        let row = document.createElement('tr');
        let tableData = document.createElement('td');
        let updateButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        row.style.cssText = `
            font-size: 1.2em; 
        `;

        updateButton.setAttribute('class','updateButton');
        updateButton.classList.add('updateButton');
        updateButton.innerHTML = "update";

        deleteButton.setAttribute('class','deleteButton');
        deleteButton.classList.add('updateAndDeleteButton');
        deleteButton.innerHTML = 'delete';

        row.innerHTML = `<td> ${data.terminology} </td>`;
        row.innerHTML += `<td> ${data.meaning} </td>`;
        tableData.appendChild(deleteButton);
        tableData.insertBefore(updateButton,deleteButton);
       
        row.appendChild(tableData);
        tableBody.appendChild(row);
        
        // Still question why this button can get id specific 1 by 1 
        // when we create this button outside the function we can't get id data 1 by 1
        deleteButton.addEventListener('click', () => {
            
            const dataID = data.id;
                if(dataID == data.id) {
                    // way to accest index while using for of => [data]
                    HistoryData.splice([data],1);
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
        })

    }
   

    

}


// const deleteData = () => {
//     const deleteButton = document.querySelector('.deleteButton');
//     deleteButton.addEventListener('click', () => {
       
//         let HistoryData = showDataStorage();
    
//     if(HistoryData != null || HistoryData != ''){
        
//         for(let index=0; index <= HistoryData.length-1; index++) {
//                 const dataID = HistoryData[index].id;
//                 console.log(dataID)


//         }
//     } else {
//         alert('There is no data !!');
//     }



//     });
// }


export {putDataStorage, renderDataStorage};