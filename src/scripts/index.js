$(document).ready(function () {

    let operacion = null;
    // función para actualizar la tabla de maestro. 
    function refrescarListado() {

        $.get("http://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes",
            function (result) {
                let $padre = $('#listado');

                $padre.empty();

                result.forEach(x => {
                    console.log("Processing item:", x);
                    let $linea = $('<tr>');
                    $linea.append($('<td class="renglon" style=display:none>').text(x.id));
                    $linea.append($('<td class="renglon">').text(x.nombre));
                    $linea.append($('<td class="renglon">').text(x.apellido));
                    $linea.append($('<button id="boton_borra"></button>').text("Borrar"));
                    $padre.append($linea);
                });

                console.log("Refrescaso de tabla ejecutado");

            }).fail(function () {

                console.log("Error");
            });

    };

    function mostrarOcultarDetalle() {
        let $detalle = $("detalle");
        if ($detalle.is(':visible')) {
            $detalle.hide();
        } else {
            $detalle.show();
        }

    }

    // Esto es lo que permite que la función sea llamada de cualquier otro lado. 
    window.refrescarListado = refrescarListado;
    window.mostrarOcultarDetalle = mostrarOcultarDetalle;

    // Cliquea en botón refrescar listado. 
    $("#boton_refresca").on("click", function () {

        refrescarListado();

    });

    // clickea en un renglón cualquiera donde hay datos del maestro. 
    $('#listado').on("click", "td", function (event) {

        event.preventDefault()

        let $row = $(this).closest('tr');
        let solId = $row.find('td').eq(0).text();
        let solNombre = $row.find('td').eq(1).text();
        let solApellido = $row.find('td').eq(2).text();


        $("#id").val(solId);
        $("#nombre").val(solNombre);
        $("#apellido").val(solApellido);

        operacion = 0; // 0 es modificación. 

        mostrarOcultarDetalle();


    });


    // botón para borrado de registro. 
    $('#listado').on("click", "#boton_borra", function (event) {

        event.preventDefault()

        let $row = $(this).closest('tr');
        let solId = $row.find('td').eq(0).text();

        $.ajax({url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes/' + solId,
            method: "DELETE",
            contentType: "application/json",
            success: function(result){
                
                console.log('Respuesta: ' + result)
                let $padre = $('<respuesta></respuesta')
                let $parrafo = $('<p></p>').text("Respuesta del Servidor tras DELETE: " + JSON.stringify(result) + ". Para solID: " + solId);
                $padre.append($parrafo);
    
                $('body').append($padre);
            },
            error: function(xhr, status, error) { 
                let $parrafo0 = $('<p></p>').text("Respuesta del Servidor");
                let $parrafo = $('<p></p>').text('Error: ' + error);
            } 
        });

        refrescarListado();


    });

    // Botón para agregado de nuevo registro
    $('#boton_nuevo').on("click", function (event) {
        event.preventDefault(); // Prevent form submission
        operacion = 1 // 1 significa crear registro. 
        mostrarOcultarDetalle();
        $("#id").val("");
        $("#nombre").val("");
        $("#apellido").val("");
    });

    $('#boton_cancela').on("click", function (event) {
        event.preventDefault(); // Prevent form submission
        $("#id").val("");
        $("#nombre").val("");
        $("#apellido").val("");

        mostrarOcultarDetalle();

    });

    $("#boton_graba").on('click', function (event) {

        let valId = $("#id").val();
        let valNombre = $("#nombre").val();
        let valApellido = $("#apellido").val();

        event.preventDefault();

        if (valNombre != "" && valApellido != "") {

            if (operacion == 0) {

                let envio = {
                    "id": valId,
                    "nombre": valNombre,
                    "apellido": valApellido
                };

                console.log("Envio Object:", envio);

                $.ajax({
                    url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes/' + envio.id,
                    data: JSON.stringify(envio),
                    method: "PUT",
                    contentType: "application/json",
                    success: function (result) {
                        console.log('Respuesta: ' + result);
                        let $padre = $('logUsuario');
                        let $linea = $('<p></p>').text("Modificación con PUT: " + JSON.stringify(result));
                        $padre.append($linea);

                        console.log("Actualización existosa")

                        mostrarOcultarDetalle();

                    },
                    error: function (error) {
                        console.log('Error: ' + error);
                    }
                });

            }

            if (operacion == 1) {

                id = 0

                {

                    let envio = {
                        "id": 0,
                        "nombre": valNombre,
                        "apellido": valApellido
                    };

                    console.log("Envio Object:", envio);

                    $.ajax({
                        url: 'https://my-json-server.typicode.com/desarrollo-seguro/dato/solicitudes/',
                        data: JSON.stringify(envio),
                        method: "POST",
                        contentType: "application/json",
                        success: function (result) {
                            console.log('Respuesta: ' + result);
                            let $padre = $('logUsuario');
                            let $linea = $('<p></p>').text("Registro creado con POST: " + JSON.stringify(result));
                            $padre.append($linea);

                            console.log("Creación existosa")

                            mostrarOcultarDetalle();

                        },
                        error: function (error) {
                            console.log('Error: ' + error);
                        }
                    });
                }
            }

        } else {

            let $padre = $('logUsuario');
            let $linea = $('<p></p>').text("POST no Creado: ni Nombre ni Apellido pueden ser vacíos.");
            $padre.append($linea);
        }

    });



});