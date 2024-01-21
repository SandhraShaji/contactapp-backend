const express = require('express')
const cors = require('cors')
const conServer = express()
const logic = require('./services/logic')
conServer.use(cors({
    origin:'http://localhost:3000'
}))
conServer.use(express.json())
conServer.listen(8000,()=>{
    console.log('conServer listening on port 8000');
})

conServer.get('/get-all-contacts',(req,res)=>{
    logic.getAllContacts().then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

conServer.post('/add-contact',(req,res)=>{
    logic.addContact(req.body.name,req.body.phno,req.body.email,req.body.address)
    .then((response)=>{
        res.status(response.statusCode).json(response)
    })
})

conServer.get('/view-contact/:name',(req,res)=>(
    logic.viewContact(req.params.name).then((response)=>{
        res.status(response.statusCode).json(response)
    })
))

conServer.post('/update-contact/:name',(req,res)=>(
    logic.updateContact(req.body.name,req.body.phno,req.body.email,req.body.address)
    .then((response)=>{
        res.status(response.statusCode).json(response)
    })
))

conServer.delete('/delete-contact/:name',(req,res)=>(
    logic.dltContact(req.params.name).then((response)=>{
        res.status(response.statusCode).json(response)
    })
))