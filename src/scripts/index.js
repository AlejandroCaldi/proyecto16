
    $("#boton_refresca").on("click", function () {

        $.get("http://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes",
            function (result) {
                let $padre = $('#listado');

                result.forEach(x => {
                    console.log("Processing item:", x);
                    let $linea = $('<tr>');
                    $linea.append($('<td class="renglon" style=display:none>').text(x.id));                 
                    $linea.append($('<td class="renglon">').text(x.nombre));
                    $linea.append($('<td class="renglon">').text(x.apellido));
                    $linea.append($('<button></button>').text("Borrar"));
                    $padre.append($linea);
                    
                   
 
                });

            }).fail(function () {

                console.log("Error");
            });

    });

    $('#listado').on("click", "td", function (event) {

        let $detalle = $("detalle");
        let $row = $(this).closest('tr'); 
        let solId = $row.find('td').eq(0).text();
        let solNombre = $row.find('td').eq(1).text(); 
        let solApellido = $row.find('td').eq(1).text(); 


        $("#id").val(solId);
        $("#nombre").val(solNombre);
        $("#apellido").val(solApellido);

        if ($detalle.is(':visible')) {
            $detalle.hide();
        } else {
            $detalle.show();
        }

        $("#boton_graba").on('click', function (event) {

            envio = { "id": $("#id").val(),
                      "nombre": $("#nombre").val(), 
                      "apellido": $("#apellido").val()};
            if ($(("#nombre").val() != solNombre) && $(("#apellido").val() != solApellido)) {

                $.post('https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes', // Se `puede hacer ppr ajax también, pero este sería mejor. 
                    JSON.stringify(envio),
                    function (response) {
                        console.log('Respuesta: ' + response)
                        let $padre = $('<respuesta></respuesta')
                        let $linea = $('<p></p>').text(JSON.stringify(response));
                        $padre.append($linea);
            
                        $('body').append($padre);
                    });

            }
           
    });

    $('#boton_cancela').on("click", "td", function (event) {

        $("#id").val("");
        $("#nombre").val("");
        $("#apellido").val("");

        if ($detalle.is(':visible')) {
            $detalle.hide();
        } else {
            $detalle.show();
        }
    });


    
    
    });

