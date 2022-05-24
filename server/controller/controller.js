var Userdb = require ('../model/model');

//create an save new user
exports.create = (req, res) => {
    //validar la consulta
    if (!req.body){
        res.status(400).send({message: "Contenido del mensaje no puede estar vacioooooooooooooo!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user in the database
    user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('#')
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "Ocurrio algun error en la creacion de la operacionnnnnnnnnnnnn"
        });
    });
}

// retrive and return all user/ retrive and return a single user
exports.find = (req, res) =>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Not found user with id "+ id})
            } else {
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error retrieving user with id "+id})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error Ocurred while retriving user informationnnnnnnnnnnn"})
        })
    }

}

//Update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can not be emptyyyyyyyyyyyyyyyy"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot Update user with ${id}. Maybe user not foun!!!!!!!!!!!!!!!!!!!!!!`})
        } else {
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error Update user information "})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
        } else {
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Could not delete User with id="+id
        });
    });
}