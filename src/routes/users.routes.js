const express = require("express");

const {listUsers,createUser, deleteUser} = require("../database/users");
const { useSyncExternalStore } = require("react");

 const router = express.Router();

router.get("/", async function(_req, res){
    const response = await listUsers();
    res.status(200).json(response);
});

router.post("/", async function(req, res){
    const {name,email} = req.body;
    const user = await createUser(name,email);
    res.status(201).json(user);
});

router.delete("/:id", async function(req, res){
    const id = req.params.id;
    const user = await deleteUser(id);
    if(user.message){
        res.status(404).json(user);
    } else{
        res.status(200).json(user);
    }
});

 module.exports = router;