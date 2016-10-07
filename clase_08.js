function Noticia(id, titulo, descripcion, imagen) {

    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;

}

var Diario = (function () {

    // Atributos privados
    var noticias = [];
	var claveLocalStorage = 'noticias';

    /*
        Permite precargar las noticias por localstorage
    */
    var precargarNoticias = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            noticias = JSON.parse(datos);
			
			for (i = 0; i < noticias.length; i++) {
				
				dibujarNoticia(noticias[i]);
				
			}

        }

    }

    /*
        Guarda el array de noticias en localstorage
    */
    var guardarNoticias = function () {

        var datos = JSON.stringify(noticias);
        localStorage.setItem(claveLocalStorage, datos);

    }
	
	/*
		Agrega el texto al elemento utilizando un nodoTexto
		Retorna el elemento con el nodoTexto agregado
	 */
    var agregarTexto = function (elemento, texto) {

        var nodoTexto = document.createTextNode(texto);
        elemento.appendChild(nodoTexto);

        return elemento;

    }


    var cargarNoticia = function (noticia) {
        debugger;
        //document.getElementById("id").value = noticia.id;
        document.getElementById("titulo").value = noticia.titulo;
        document.getElementById("descripcion").value = noticia.descripcion;
        document.getElementById("imagen").value = noticia.imagen;

        var boton = document.getElementById('boton');

        boton.innerHTML = 'Grabar';

        boton.onclick = function () {

            modificarNoticia(noticia.id);

        }

    }

     var modificarNoticia = function (id) {

        for (i = 0; i < noticias.length; i++) {

            if (noticias[i].id === id) {

                noticias[i].titulo = document.getElementById("titulo").value;
                noticias[i].descripcion = document.getElementById("descripcion").value;
                noticias[i].imagen = document.getElementById("imagen").value;

                break;
            }

        }


        guardarNoticias();

        // Falta actualizar la noticia cargada en el DOM para que se vean reflejados los cambios
        var li = document.getElementById(id);

        li.children[0].innerHTML = document.getElementById("titulo").value;
        li.children[1].innerHTML = document.getElementById("descripcion").value;
        li.children[2].setAttribute('src', document.getElementById("imagen").value);

        document.getElementById("myForm").reset();



        // Luego de modificar la noticia volvemos a vincular la funcion para crear noticias
        var boton = document.getElementById("boton");
        boton.innerHTML = 'Agregar';
        boton.onclick = crearNoticia;

    }


    /*
		Dibuja en el DOM la noticia pasada como parametro
	 */

	 // EJERCICIO
	 // Hay que agregar un boton para eliminar la noticia
	 // El evento onclick del boton debera hacer referencia a una funcion que busque el parent de ese boton
    var dibujarNoticia = function (noticia) {

		// Se obtiene el elemento padre que nos servira para agregar los elementos hijos
        var ul = document.getElementById("noticias");

		// Se crean todos los elementos que necesitaremos para dibujar la noticia (li, h3, img, p)
        var li = document.createElement("li");
        var h3 = document.createElement('h3');
        var img = document.createElement('img');
        var p = document.createElement('p');
        var buttone = document.createElement('button');
        var texto = document.createTextNode('Eliminar');
        buttone.appendChild(texto);

		// Se asignan los atributos id y class al elemento li creado anteriormente
		// El id del li es el id de la noticia. Nos servira para luego, de ser necesario, borrarla
        li.setAttribute('id', noticia.id);
        li.setAttribute('class', 'list-group-item'); // Bootstrap
        buttone.setAttribute('class', 'btn btn-danger');
      
        buttone.onclick = function () {

            eliminarNoticia(noticia);

        };


        var buttonmod = document.createElement('button')
        var textmodificar = document.createTextNode('Modificar');
        buttonmod.appendChild(textmodificar);
        buttonmod.setAttribute('class','btn btn-primary');

        buttonmod.onclick = function () {
            debugger;
            //modificarNoticia(noticia.id);
            cargarNoticia(noticia);

        }

		// Se agrega el texto al h3 y p a partir del titulo y la descripcion respectivamente
        h3 = agregarTexto(h3, noticia.titulo);
        p = agregarTexto(p, noticia.descripcion);
       

		// Se asigna el source de la imagen (src) a partir del atributo imagen de la noticia
        img.setAttribute('src',  noticia.imagen);


		// Appends de los elementos h1, p, img en li
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(img);
        li.appendChild(buttone);
        li.appendChild(buttonmod);

		// Por ultimo se hace append del li en ul
        ul.appendChild(li);
        document.getElementById("myForm").reset();

    }    


    // Como vamos a editar la noticia cambiamos la funcion que tiene vinculada
    //var boton = document.getElementById("boton");
    var borrarNoticiaDOM = function (noticia) {

        var ul = document.getElementById("noticias");
        var li = document.getElementById(noticia.id);

        ul.removeChild(li);

    }

    var borrarNoticiasDOM = function () {

        var noticiasDOM = document.getElementById("noticias");
        
        while (noticiasDOM.firstChild) {
            noticiasDOM.removeChild(noticiasDOM.firstChild);
        }

    }


    /*var  limpiarFormulario = function(){
            document.getElementById("titulo")[0].value = "";
            document.getElementById("descripcion")[0].value = "";
            document.getElementById("imagen")[0].value = "";
                  
    };*/

    // Si la noticia existe en el array de noticias devuelve la posicion donde se encuentra (0, 1, 2, etc.)
    // En caso contrario devuelve -1;
    var existeNoticia = function (noticia) {

        var posicion = -1; 
        
        // La condicion del for lee: 'Mientras haya elementos en el array de noticias por recorrer y la posicion sea -1
        for(i = 0; i < noticias.length && posicion === -1; i++) { 

            if (noticias[i].id === noticia.id) { 
                
                // Si los ids coinciden me guardo el contenido de la variable i en la variable posicion
                posicion = i; 

            }

        }

        return posicion;

    }

    var agregarNoticia = function (noticia) {

        // Validacion de que no exista la noticia en el array de noticias
        // Validacion de que lo que me pasen sea una noticia. // Opcional

        // Las noticias con diferente id se podran insertar en el array noticias
        var posicion = existeNoticia(noticia);

        if (posicion === -1) {

            noticias.push(noticia);

            guardarNoticias();

            dibujarNoticia(noticia);

        }  else {

            alert('La noticia con id: ' + noticia.id + ' ya existe');

        }

    }

    var eliminarNoticia = function (noticia) {

        var posicion = existeNoticia(noticia);

        if (posicion > -1) {

            // Borra 1 elemento desde la posicion
            noticias.splice(posicion, 1);

            guardarNoticias();

            borrarNoticiaDOM(noticia);

        } else {

            alert('La noticia con id: ' + noticia.id + ' no existe');

        }

    }
    
    var limpiarDiario = function () {

		noticias = [];
		localStorage.removeItem(claveLocalStorage);
		
		var noticiasDOM = document.getElementById("noticias");
		
		while (noticiasDOM.firstChild) {
			noticiasDOM.removeChild(noticiasDOM.firstChild);
		}
		
	}

	

	// EJERCICIO
	// Busca en el array de noticias la noticia con el id mas grande 
    //y devuelve ese id incrementado en una unidad.	
	var generarNuevoId = function () {

        var numeroMayor = -1;    
        for(i = 0; i < noticias.length; i++) { 

            if (noticias[i].id > numeroMayor) { 
                numeroMayor = noticias[i].id;
            }

        }
		// EJERCICIO
        return numeroMayor + 1;
	}





	// EJERCICIO
	// Vincular el evento onclick del elemento con id boton a una function que llamaremos crearNoticia
	var vincularFormulario = function () {

         var boton = document.getElementById("boton");
        boton.onclick  = crearNoticia;



	}


   var vincularbotonEliminar = function (){

            buttone.onclick = document.getElementById('eliminar');
           borrarNoticiasDOM();
            precargarNoticias();

        }

	// EJERCICIO
	// Tomara los valores (objeto.value) de los objetos DOM con id titulo, descripcion, imagen
	// Con esos valores se creara una noticia y se llamara a agregarNoticia(noticia)
	var crearNoticia = function () {
        var id = generarNuevoId();
        var titulo = document.getElementById("titulo").value;
        var descripcion = document.getElementById("descripcion").value;
        var imagen = document.getElementById("imagen").value;

       var noticia = new Noticia (id, titulo, descripcion, imagen);

       agregarNoticia(noticia);
	}

	// EJERCICIO
	// Vincular los elementos con id ordenamiento_id, ordenamiento_az, ordenamiento_za
	// a 3 funciones que usaremos para ordenar


     

	var vincularOrdenamientos = function () {
      var ordenamiento_id = document.getElementById("ordenamiento_id");
      var ordenamiento_az = document.getElementById("ordenamiento_az");
      var ordenamiento_za = document.getElementById("ordenamiento_za");

   
      var funcionComparador = function(atributo, orden){
        return function(elementoA, elementoB){
            if (elementoA[atributo] < elementoB[atributo]) {

                resultado = 1; // para ordenamiento descendente

            }

            if (elementoA[atributo] === elementoB[atributo]) {

                resultado = 0;

            }

            if (elementoA[atributo] > elementoB[atributo]) {

                resultado = -1;

            }
            return resultado * orden;

        }

      }

      var ordenamientoPorAz = funcionComparador("titulo", -1);
      ordenamiento_az.onclick = function(){
        noticias.sort(ordenamientoPorAz);

        guardarNoticias(noticias);
        borrarNoticiasDOM();

        //for(i = 0; i < noticias.length; i++)
        //console.log("recuperando noticias")
        precargarNoticias(); 


        }
        
      var ordenamientoPorZa = funcionComparador("titulo", 1);
      ordenamiento_za.onclick = function(){
        noticias.sort(ordenamientoPorZa);
        guardarNoticias(noticias);
        borrarNoticiasDOM();

        precargarNoticias(); 

      }

      var ordenamientoPorId = funcionComparador("id", 1);
      ordenamiento_id.onclick  = function(){
        noticias.sort(ordenamientoPorId);
        guardarNoticias(noticias);
        borrarNoticiasDOM();

        precargarNoticias(); 

      }

    



	   }

	// EJERCICIO
	// Esta funcion vinculara todos los eventos de los objetos del DOM a las funciones que iremos construyendo
	// Sera necesario programar varias funciones para ello:
	//	1. vincularFormulario
	//	2. vincularOrdenamientos (por id, a-z, z-a)
	var iniciar = function () {
        //debugger;
        vincularFormulario();
        vincularOrdenamientos();
        precargarNoticias();


	}


    

    // EJERCICIO
    // Solo dejar publico el metodo iniciar
    return {
        agregarNoticia: agregarNoticia,
        eliminarNoticia: eliminarNoticia,
		iniciar: iniciar,
        generarNuevoId: generarNuevoId
    };

})()

// EJERCICIO
// Vincular el evento onload del objeto window al metodo Diario.iniciar
window.onload = Diario.iniciar;