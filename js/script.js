
    $(document).ready(function(){
      handelSubmit()
    });






    const handelSubmit = ()=> $("form").submit((event)=>{
        event.preventDefault();
 
      
        const nombreApellido = $("#nombreApellido").val();
        const cedula = $("#cedula").val();
        const celular = $("#celular").val();
        const observacion = $("#observacion").val();



        $.ajax({
            url: "http://192.168.0.149:4000/participantes/nocedula",
            type: "POST",
            data: {
                nombreApellido: nombreApellido,
                cedula: cedula,
                celular: celular,
                observacion: observacion
            },
            success: function(response){
                const color = response.data
                if (color.toLowerCase().includes('amarillo')) {
                    $("#modalAmarillo").modal('show');
                } else if (color.toLowerCase().includes('azul')) {
                    $("#modalAzul").modal('show');
                } else if (color.toLowerCase().includes('rojo')) {
                    $("#modalRojo").modal('show');
                } else if (color.toLowerCase().includes('verde')) {
                    $("#modalVerde").modal('show');
                } else {
                    alert("Color desconocido");
                }
                
              
             
            },
            error: function(xhr, status, error){
                console.log(error)
                alert("Ocurrió un error al enviar el formulario");
            }
        });
    });