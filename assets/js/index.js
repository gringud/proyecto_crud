


$("#add_user").submit(function(event){
    /* console.log("PRESIONE EL BOTON"); */
    /* if (req.body.name =="" || req.body.email =="" || req.body.gender ==="" || req.body.status ===""){
        console.log("ALGO ESTA VACIO");
    } */
    
    alert("Data Inserted Successfully!!!");
})

$("#update_user").submit(function(event){   
    event.preventDefault();
    console.log("ENTRE PORQUE PRESIONE UPDATEeeee")

    var unindexed_array = $(this).serializeArray();
    var data ={}

    $.map(unindexed_array, function (n,i){
            data[n['name']] = n['value']
    })
    console.log(data);
    
    console.log("VALOR DE DATA.ID ES: ----------  "+data.id)

    // ACA NO ESTOY RECIVIENDO EL ID DATA.ID = UNDEFINED

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!")
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Do you really want to delette this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!")
                location.reload();
            })
        }
    })
}