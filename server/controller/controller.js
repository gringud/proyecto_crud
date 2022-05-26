var Userdb = require ('../model/model');

//create an save new user

exports.create = (req, res) => {
    //validate request
    /* console.log("guardandooooooo"); */
    if (!req.body){
        res.status(400).send({message: "Content can not be emptyyyyyyyyyyyyy-NO GUARDE!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });
    console.log("guardandooooooo ");

    /* console.log("*************************************")
        console.log("envie todo valor de email "+data.name)
        console.log("envie todo valor de email "+data.email) 
        console.log("envie todo valor de email "+user.name+"-")
        console.log("envie todo valor de email "+req.data.status+"-")
        console.log("*************************************") */

    //save user in the database
    if (req.body.name =="" || req.body.email =="" || user.gender === undefined || user.status === undefined){
        console.log("**************NAME ESTA VACIO****************");
        res.redirect('/')
    } else {
        user
        .save(user)
        .then(data=>{
            /* res.send(data) */
            
            res.redirect('/')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while crating a creaate operation - ALGO NO ESTA SALIENDO BIEN ASI QUE ERROR"
            });
        });

    }
}

// retrive and return all user/ retrive and return a single user
exports.find = (req, res) =>{
    console.log("entre al find req: "+req);
    console.log("entre al find res: "+res);

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

    console.log("entre al find reqqqqqqqqqq: "+req);
    console.log("entre al find ressssssssss: "+res);

    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can not be emptyyyyyyyyyyyyyyyy"})
    }
    const id = req.params.id;
    console.log("entre al find VALOR DE NOMRE: "+req.body.name);
    console.log("El valor que tiene ID ES: ---- "+id)


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