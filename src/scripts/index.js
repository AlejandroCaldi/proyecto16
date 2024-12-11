
    $("#boton_refresca").on("click", function () {

        $.get("http://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes",
            function (result) {
                let $padre = $('#detalle');

                result.forEach(x => {
                    console.log("Processing item:", x);
                    let $linea = $('<tr>');
                    $linea.append($('<td>').text(x.nombre));
                    $linea.append($('<td>').text(x.apellido));
                    $linea.append($('<button></button>').text("Borrar"));
                    $padre.append($linea);
                    
                   
 
                });

            }).fail(function () {

                console.log("Error");
            });

    });