
    $(document).ready(function(){
   
      handelSubmit()
    });

    const handelSubmit = ()=> $("form").submit((event)=>{
        event.preventDefault();
        const cedula = $("#cedula").val();
        const nombreApellido = $("#nombreApellido").val();
        const celular = $("#celular").val();
        const observacion = $("#observacion").val();



        $(".login-form-btn").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ')
        $(".login-form-btn").prop('disabled', true);
        const modal=$('#modal')
        const modalColor = $('#modalColor')
        const participanteModal = $("#participanteModal")
        modal.removeClass('bg-amarillo bg-azul bg-verde bg-rojo');
      


        $.ajax({
            url: `http://192.168.27.72:4000/participantes/nocedula`,
            type: "POST",
            data: {
                nombreApellido: nombreApellido,
                cedula: cedula,
                celular: celular,
                observacion: observacion
            },
            success: function(response){
            
                const color = response.data
                const participante =response.participante
                
                if(color.toLowerCase().includes('ya registrado')){
                    $("#modalYaRegustrado").modal('show');
                    $(".login-form-btn").html('Registrar')
                    $("#cedula").val('');
                    $(".login-form-btn").prop('disabled', false);
                    return
                }
                participanteModal.html(participante.participantenombre)
                if (color.toLowerCase().includes('amarillo')) {
                    modalColor.addClass('bg-amarillo');
                    modal.modal('show');
                   
                } else if (color.toLowerCase().includes('azul')) {
                    modalColor.addClass('bg-azul');
                    modal.modal('show');
                } else if (color.toLowerCase().includes('rojo')) {
                    modalColor.addClass('bg-rojo');
                    modal.modal('show');
                } else if (color.toLowerCase().includes('verde')) {
                    modalColor.addClass('bg-verde');
                    modal.modal('show');
                } else  {
                    alert("Color desconocido");
                }

                $(".login-form-btn").html('Registrar')
                $("#cedula").val('');
        
                $("#nombreApellido").val('');
                $("#celular").val('');
                $("#observacion").val('');
        
                $(".login-form-btn").prop('disabled', false);
            },
            error: function(xhr, status, error){
                console.log(error)
          
                $(".login-form-btn").html('Registrar')
                $(".login-form-btn").prop('disabled', false);
                alert("Ocurrió un error al enviar el formulario");
            }
        });
    });

