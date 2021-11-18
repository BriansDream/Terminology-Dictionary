// Class = base template
// Inheritance = several object could have same characteristic or behaviour but 
// their not same.

// Custom Error
// Untuk membuat jenis tipe custom error yang tidak dimiliki oleh javascript
class EmptyInput extends Error {
    constructor(message){
        super(message);
    }
}


// Custom Event
// Memungkinkan untuk menjalankan sebuah event handler setelah sebuah eventhandler lain selesai dipanggil.



export {EmptyInput};