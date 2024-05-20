/*Traigo los campos del formulario*/
var boton_formulario = document.querySelector('#but_shop'); /*Boton del formulario*/
var nombre = document.querySelector('#nombre');
var apellido = document.querySelector('#apellido');
var telefono = document.querySelector('#telefono');
var correo = document.querySelector('#correo');
var problema = document.querySelector('#problema');
var select_campo = document.querySelector('#select_campo');

boton_formulario.addEventListener('click',carga_formulario)

function carga_formulario() {


		if (!validaFormulario(nombre, 'nom-ape', 15, 'Nombre.')) {
			return;
		  }
		if (!validaFormulario(apellido, 'nom-ape', 15, 'Apellido.')) {
			return;
		  }
		if (!validaFormulario(telefono, 'num', 50, 'Telefono de contacto.')) {
			return;
		  }
		if (!validaFormulario(correo, 'mail', 50, 'el correo.')) {
			return;
		  }	
        if (!validaFormulario(select_campo, 'select', 250, 'una opcion1.')) {
			return;
		  }	   
        if (!validaRadios('radio_but', 'Debe seleccionar una opción2.')) {
            return;
        } 	    
		if (!validaFormulario(problema, 'text', 20, 'Debe Ingresar su consulta')) {
			return;
		  }

        
          
        formRespuesta.style.background = "#46C34C";
        formRespuesta.innerHTML = "¡Formulario Completado con exito!";
        abroresp();
        setTimeout(function(){ window.location.assign('https://google.com'); }, 5000);
		
}


/*Valida los datos de los formularios*/
function validaFormulario(campo, tipo, longitud, mensaje){
	var valoresAceptados = /^[0-9]+$/;
    if (tipo === 'select') {
        if (campo.value === "") { // Verifica si no se ha seleccionado ninguna opción
            formRespuesta.innerHTML = 'Seleccione una opción válida para ' + mensaje;
            abroresp();
            campo.focus();
            return false;
        }
    }
	else if(campo.value.length==0){
		campo.focus();
		formRespuesta.innerHTML = 'Completar '+mensaje;
		abroresp();	
		return false;
	}
    else if(campo.value.length > longitud){
		campo.focus();
		formRespuesta.innerHTML = 'No debe superar las ' +longitud+'posiciones';
		abroresp();	
		return false;
	}else if(tipo == 'num' && campo.value.match(valoresAceptados) == false) {
		campo.focus();		
		formRespuesta.innerHTML = 'Debe ingresar números';
		abroresp();
		return false;
	}else if (tipo == 'mail' && (campo.value.indexOf('@') == -1 || campo.value.indexOf(".") == -1)) {
		campo.focus();		
		formRespuesta.innerHTML = 'un mail correcto';
		abroresp();
		return false;
	}
	else if (tipo == 'nom-ape' && /[0-9]/.test(campo.value)) {
		campo.focus();
		formRespuesta.innerHTML = 'Este campo solo admite texto sin números';
		abroresp();
		return false;
	}
	return true;
}

/* Valida que un grupo de radio buttons esté seleccionado */
function validaRadios(radio_but, mensaje) {
    var radios = document.getElementsByName(radio_but);
    var seleccionado = false;

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        formRespuesta.innerHTML = mensaje;
        abroresp();
        return false;
    }
    return true;
}


////////// FUNCION QUE ABRE Y CIERRA EL BLOQUE DE RESPUESTA
var cerrarresult;

var formRespuesta= document.querySelector('.result_formulario');

function abroresp() {
    formRespuesta.style.display = "block";
    cerrarresult = setTimeout("cierroresp();", 5000);
}
function cierroresp() {
    formRespuesta.style.display = "none";
    formRespuesta.style.background = "red";
	clearTimeout(cerrarresult);
}
