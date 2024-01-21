const db = require('../services/db')

const getAllContacts=()=>{
    return db.contact.find().then((result)=>{
        if(result){
            return {
                statusCode:200,
                contacts:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'Contact not found'
            }
        }
    })
}

const addContact = (name, phno, email, address) => {
    return db.contact.findOne({name})
        .then((result) => {
            if(result) {
                return {
                    statusCode: 404,
                    message: "Contact already exist"
                }
            }
        else{
            //save all the data into db
            const newContact = new db.contact({name, phno, email, address})
            newContact.save()
            return{
                    statusCode: 200,
                    message: "Contact added successfully"
                }
            }
        })
}

const viewContact = (name)=>{
    return db.contact.findOne({name})
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                contact:result
            }
        }
        else{
            return{
                statusCode:402,
                message: "Contact details not found!"
            }
        }
    })
}

const updateContact=(name, phno, email, address)=>{
    return db.contact.findOne({name}).then((result) => {
        if (result) {
            //assign updated details from frontend to mongodb object
            result.name=name;
            result.phno=phno;
            result.email=email;
            result.address=address;
            //save the emplyee details to mongodb
            result.save();
            return {
                statusCode: 200,
                message: "Contact details updated successfully"
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Contact not found'
            }
        }
    })
}

const dltContact = (name)=>{
    return db.contact.deleteOne({name})
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                message: "Contact deleted successfully"
            }
        }
        else{
            return{
                statusCode:401,
                message: "contact does not exist"
            }
        }
    })
}

module.exports={
    getAllContacts, addContact, updateContact, viewContact, dltContact
}