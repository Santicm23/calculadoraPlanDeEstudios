"using strict"

let clases;
fetch("../archivos/clases.json")
    .then(response => response.json())
    .then(data =>{
        clases = data;
    });

window.addEventListener("load", function(){

    const btnsMaterias = this.document.getElementsByClassName("btn-materias");
    const overlay = this.document.querySelector(".overlay");
    const btnCerrar = this.document.querySelector("#cerrar");
    const nombre_materia = this.document.querySelector("#nombre-materia");
    const codigo = this.document.querySelector("#codigo");
    const creditos = this.document.querySelector("#creditos");
    const tipo = this.document.querySelector("#tipo");
    const tabla_requisitos = this.document.querySelector("#preRequi");
   

    for (let i = 0; i < btnsMaterias.length; i++){
        btnsMaterias.item(i).addEventListener("click", function(){
            document.getElementsByClassName("popup")[0].classList.add("active")
            btnCerrar.classList.add("active");
            overlay.classList.add("active");
            abrir_materia(this.id, clases);
        });
    }
    
    btnCerrar.addEventListener("click", function(){
        document.getElementsByClassName("popup")[0].classList.remove("active")
        overlay.classList.remove("active");
        btnCerrar.classList.remove("active");
        while (tabla_requisitos.rows.length!=0){
            tabla_requisitos.rows[0].remove();
        }
    });

    //funciones
    function abrir_materia(id, clases){
        const materia = clases[id];
        nombre_materia.value = materia.nombre;
        codigo.value = id;
        creditos.value = materia.creditos;
        tipo.value = materia.tipo;
        agregar_lista_requisitos("pre-requisitos", materia.pre_requisitos);
        agregar_lista_requisitos("co-requisitos", materia.co_requisitos);
        if (materia.pre_requisitos == 0 && materia.co_requisitos == 0){
            agregar_fila(tabla_requisitos, "td", "Esta materia no tiene requisitos");
        }
    }

    function agregar_lista_requisitos(header, codigos){
        if (codigos.length != 0){
            agregar_fila(tabla_requisitos, "th", header, "Codigo");
            codigos.forEach(codigo => {
                agregar_fila(tabla_requisitos, "td", clases[codigo].nombre, codigo);
            });
        }
    }
    
    function agregar_fila(tabla, tipo, ...contenido){
        let fila = "";
        contenido.forEach(element => {
            fila += `<${tipo}>${element}</${tipo}>`;
        });
        tabla.insertRow(-1).innerHTML = fila;
    }
});