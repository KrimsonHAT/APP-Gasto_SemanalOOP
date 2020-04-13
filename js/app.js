// variables
const presupuestoUsuario=prompt("Cúal es tu presupuesto semanal");
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto ;

// clases
// Clase de presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // metodo para ir reestando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    };

}

// CLASS que maneja todo lo que se muestra en el html
class Interfaz{
    insertarPresupuesto(cantidad){
       const presupuestoSpan = document.querySelector('span#total');
       const restanteSpan = document.querySelector('span#restante');


    //    insertar al html
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;

    }
    imprimirMensaje(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        if(tipo ==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        // quitar el alert 

        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000);

    }

    // Inserta los gastos a la lista toma los dos parametros 1.-nombre 2.-cantidad
    agregarGastoListado(nombre,cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        // crear un li
        const li = document.createElement('li');
        li.classList = 'list-group-item d-flex justify-content-between align-items-center';
        // insertar el gasto 
        li.innerHTML = `
            ${nombre}
           <span class="badge badge-primary badge-pill"> $${cantidad}</span>
        `
        // insertar al html
        gastosListado.appendChild(li);
    }
    // comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        // leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

       restante.innerHTML = `${presupuestoRestanteUsuario}`;
       this.comprobarPresupuesto();
    }
    // cambia de color el presupuesto
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar el 25% del gasto 
        if(presupuestoTotal/4 > presupuestoRestante){
            const restante =document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if(presupuestoTotal/2 > presupuestoRestante){
            const restante =document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}



// Event Listenners

document.addEventListener('DOMContentLoaded',function(){
    if(presupuestoUsuario =='' || presupuestoUsuario == null){
        window.location.reload();
    }else{
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        
        // Instanciar la clase de Interfaz
        const ui =new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)

    }
});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
//    leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto =document.querySelector('#cantidad').value;

    // instanciar la interfaz
    const ui = new Interfaz();
    // comprobar que los campos no esten vacíos
    if(nombreGasto==='' || nombreGasto===null || cantidadGasto==='' || cantidadGasto ===null){
        
        //2 parametros mensaje y tipo 
           ui.imprimirMensaje('Hubo un error, revisa el formulario', 'error');
    }else{
        // Inserrtar en el html
        ui.imprimirMensaje('Correcto','correcto');

        // AGregar gasto en html
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        
        // 
        ui.presupuestoRestante(cantidadGasto);
    }
})