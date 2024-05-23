
    $(document).ready(function(){
   
      handelSubmit()
    });

    const handelSubmit = ()=> $("form").submit((event)=>{
        event.preventDefault();
        const cedula = $("#cedula").val();
        $(".login-form-btn").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ')
        $(".login-form-btn").prop('disabled', true);
        const modal=$('#modal')
        const modalColor = $('#modalColor')
        const participanteModal = $("#participanteModal")
        modal.removeClass('bg-amarillo bg-azul bg-verde bg-rojo');
      


        $.ajax({
            url: `http://192.168.27.72:4000/participantes/cedula/${cedula}`,
            type: "POST",
            data: {
                nombreApellido: nombreApellido,
                cedula: cedula,
                celular: celular,
                observacion: observacion
            },
            success: function(response){
            
                if(!response.existe){
                    console.log(response,response.hasOwnProperty('existe'))
                    $("#modalNoRegistrado").modal('show');
                    $("#cedula").val('');
                    $(".login-form-btn").prop('disabled', false);
                    $(".login-form-btn").html('Registrar')
                    return
                }
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
                $(".login-form-btn").prop('disabled', false);
            },
            error: function(xhr, status, error){
                console.log(error)
                $("#cedula").val('');
                $(".login-form-btn").html('Registrar')
                $(".login-form-btn").prop('disabled', false);
                alert("Ocurrió un error al enviar el formulario");
            }
        });
    });

