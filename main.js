//#region Clases
class Vehiculo
{
    constructor(id, modelo, anoFabricacion, velMax)
    {
        if (id == "" || modelo == "" || anoFabricacion== "" || velMax == "") 
        {
            alert("Todos los campos son obligatorios.");
            throw new Error("Todos los campos son obligatorios.");
        }
        else if (velMax < 1)
        {
            alert("La velocidad máxima debe ser mayor a 0");
            throw new Error("No arranca");
        }
        else
        {
            this.id = id;
            this.modelo = modelo;
            this.anoFabricacion = anoFabricacion;
            this.velMax = velMax;
        }

        

    }
    toString()
    {
        return `Vehículo: ${this.modelo}, ha sido fabricado en el año ${this.anoFabricacion}. Tiene una velocidad máxima de ${this.velMax}km/h.<br>
        Carga: ${this.carga}<br>Autonomía: ${this.autonomia}`;
    }

}

class Auto extends Vehiculo
{

    constructor(id, modelo, anoFabricacion, velMax, cantidadPuertas,asientos)
    { 
        super(id, modelo, anoFabricacion, velMax);

        if(asientos == null || cantidadPuertas == null)
        {
            alert("No pueden haber datos nulos");
            throw new Error("dato nulo");
        }        
        else if(asientos < 2 || cantidadPuertas < 2 )
        {
            alert("Tanto los asientos como cantidad de puertas deben ser mayores a 2");
            throw new Error("cantidad menor a 2");
        }
        else
        {
            this.cantidadPuertas = cantidadPuertas;
            this.asientos = asientos;
            
        }
        
        
    }


    toString()
    {
        return `Auto: ${this.modelo}, ha sido fabricado en el año ${this.anoFabricacion}. Tiene una velocidad máxima de ${this.velMax}km/h.<br>
        cantidad de puertas: ${this.cantidadPuertas}<br>Asientos: ${this.asientos}`;
    }
}

class Camion extends Vehiculo
{

    constructor(id, modelo,anoFabricacion,velMax,carga,autonomia)
    {
        super(id,modelo,anoFabricacion,velMax);
        if(carga == null || autonomia == null)
        {
            alert("data inválida");
            throw new Error("data no ingresada");
        }
        else if(carga < 0 || autonomia < 0 )
        {
            alert("Tanto la carga como autonomia deben ser mayores a 0");
            throw new Error("cantidad menor a 0");
        }
        else
        {
            this.carga = carga;
            this.autonomia = autonomia;
        }
    }

    toString()
    {
        return `Camión: ${this.modelo}, ha sido fabricado en el año ${this.anoFabricacion}. Tiene una velocidad máxima de ${this.velMax}km/h.<br>
        Carga: ${this.carga}<br>Autonomía: ${this.autonomia}`;
    }
}
//#endregion

//#region Elementos 

//checkbox
const chkId = document.getElementById("chk-id");
const chkModelo = document.getElementById("chk-modelo");
const chkAnoFabricacion = document.getElementById("chk-anofabricacion");
const chkVelMax = document.getElementById("chk-velmax");
const chkCantPuertas = document.getElementById("chk-cantpuertas");
const chkAsientos = document.getElementById("chk-asientos");
const chkCarga = document.getElementById("chk-carga");
const chkAutonomia = document.getElementById("chk-autonomia");

const listaCheckbox = [
    chkId,
    chkModelo,
    chkAnoFabricacion,
    chkVelMax,
    chkCantPuertas,
    chkAsientos,
    chkCarga,
    chkAutonomia
];


//Select
var selectMain = document.getElementById("select-vehiculos");
const selectTipo = document.getElementById("selectTipo");

//Div
const formABM = document.getElementById("formABM");
const formDatos = document.getElementById("div-tabla");

//Input
const inputId = document.getElementById("inputId");
const modeloInput = document.getElementById("modeloInput");
const anoFabricacionInput = document.getElementById("anoFabricacionInput");
const velMaxInput = document.getElementById("velocidadMaxInput");
const atrTipoInput = document.getElementById("inputAtrTipo");
const atrTipoInput2 = document.getElementById("inputAtrTipo2");
const listaInputs = [inputId,modeloInput,anoFabricacionInput,velMaxInput,atrTipoInput,atrTipoInput2];

//Botón
const btnCalcular = document.getElementById("btn-calcular-velMax");
const btnAgregarVehiculos = document.getElementById("btn-agregar-vehiculo");

const btnAceptar = document.getElementById("enviarDatos");
const btnEliminar = document.getElementById("eliminarVehiculo");
const btnCancelar = document.getElementById("cancelar");

//Label
const labelTipo =  document.getElementById("labelAtrTipo");
const labelTipo2 = document.getElementById("labelAtrTipo2");

//#endregion

//#region Listas de vehiculos

let stringDatos = '[{"id":1,"modelo":"Fiat100","anoFabricacion":1987,"velMax":60,"cantidadPuertas":4,"asientos":4},{"id":2,"modelo":"FordMustang","anoFabricacion":1960,"velMax":100,"cantidadPuertas":2,"asientos":2},{"id":3,"modelo":"FerraryF100","anoFabricacion":1999,"velMax":200,"cantidadPuertas":2,"asientos":2},{"id":4,"modelo":"Escania","anoFabricacion":1987,"velMax":60,"carga":5550,"autonomia":300},{"id":5,"modelo":"DodgeRam","anoFabricacion":1970,"velMax":100,"carga":2333,"autonomia":400},{"id":666,"modelo":"ChevySilverado","anoFabricacion":1994,"velMax":80,"carga":1000,"autonomia":450}]';
let lista = JSON.parse(stringDatos);

let listaVehiculos = lista.map(vehiculo => {
        if(vehiculo.cantidadPuertas > 0)
            {return new Auto(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax,vehiculo.cantidadPuertas,vehiculo.asientos);}
        else if (vehiculo.carga > 0)
            {return new Camion(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion,vehiculo.velMax,vehiculo.carga,vehiculo.autonomia);}
        else {return new Vehiculo(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion,vehiculo.velMax);}
});
    
MostrarTabla(listaVehiculos);

let listaAutos = lista.filter(vehiculo => vehiculo.cantidadPuertas > 0);
listaAutos = listaAutos.map(auto => new Auto(auto.id,auto.modelo,auto.anoFabricacion,auto.velMax,auto.cantidadPuertas,auto.asientos));
console.log(listaAutos);
let listaCamiones = lista.filter(vehiculo => vehiculo.carga > 0);
listaCamiones = listaCamiones.map(camion => new Camion(camion.id,camion.modelo,camion.anoFabricacion,camion.velMax,camion.carga,camion.autonomia));
console.log(listaCamiones);
//#endregion



//#region Form Datos

function deschequearChk()
{
    listaCheckbox.forEach(chk => {chk.checked = false});
}

function calcularVelocidadPromedio(lista_param)
{
    const listaVelocidad = lista_param.map(vehiculo => vehiculo.velMax);
    const velTotal = listaVelocidad.reduce((acumulador, actual) => acumulador + actual , 0);
    const velPromedio = velTotal / listaVelocidad.length;


    document.getElementById("calcular-velMax").value = velPromedio;
}

btnCalcular.addEventListener("click", function(){
    switch (selectMain.value) 
    {
        case "Todos":
            calcularVelocidadPromedio(listaVehiculos);
            break;
        case "Auto":
            calcularVelocidadPromedio(listaAutos);
            break;
        default:
            calcularVelocidadPromedio(listaCamiones)
            break;
    }
}
);

// Tabla datos

function MostrarTabla(listaVehiculos)
{
    const tabla = document.getElementById("tabla-vehiculos");
    tabla.innerHTML = "";

    const listaEncabezado = ["ID","Modelo","AnoFabricacion","VelMax","Asientos","CantPuertas","Carga","Autonomia"];

    const encabezado = document.createElement("tr");
    listaEncabezado.forEach(atributo => {
        const tablaHead = document.createElement("th");
        tablaHead.className = "col-" + atributo.toLowerCase();
        const botonesHead = document.createElement("button");
        botonesHead.style.width = "100%";
        botonesHead.id = "btn-" + atributo.toLowerCase();
        botonesHead.className="col-" + atributo.toLowerCase();
        botonesHead.textContent = atributo;
        tablaHead.appendChild(botonesHead);
        encabezado.appendChild(tablaHead);
        tabla.appendChild(encabezado);
    });

    listaVehiculos.forEach(vehiculo => 
        {
            const fila = document.createElement("tr");

            //ID

            const celdaID = document.createElement("td");
            celdaID.textContent = vehiculo.id;
            celdaID.className = "col-id";
            fila.appendChild(celdaID);

            // Nombre
            const celdaModelo = document.createElement("td");
            celdaModelo.textContent = vehiculo.modelo;
            celdaModelo.className = "col-modelo";
            fila.appendChild(celdaModelo);

            // Apellido
            const celdaAnoFabricacion = document.createElement("td");
            celdaAnoFabricacion.textContent = vehiculo.anoFabricacion;
            celdaAnoFabricacion.className = "col-anofabricacion";
            fila.appendChild(celdaAnoFabricacion);

            // Edad
            const celdaVelMax = document.createElement("td");
            celdaVelMax.textContent = vehiculo.velMax;
            celdaVelMax.className = "col-velmax";
            fila.appendChild(celdaVelMax);

            const celdaCantPuertas = document.createElement("td");
            celdaCantPuertas.textContent = vehiculo.cantidadPuertas;
            celdaCantPuertas.className = "col-cantpuertas";
            fila.appendChild(celdaCantPuertas);


            // DNI
            const celdaAsientos = document.createElement("td");
            celdaAsientos.textContent = vehiculo.asientos;
            celdaAsientos.className = "col-asientos";
            fila.appendChild(celdaAsientos);


            // Pais origen
            const celdaCarga = document.createElement("td");
            celdaCarga.textContent = vehiculo.carga;
            celdaCarga.className = "col-carga";
            fila.appendChild(celdaCarga);

            // Pais origen
            const celdaAutonomia = document.createElement("td");
            celdaAutonomia.textContent = vehiculo.autonomia;
            celdaAutonomia.className = "col-autonomia";
            fila.appendChild(celdaAutonomia);

            tabla.appendChild(fila);
            
        }
    );

    document.getElementById("btn-id").addEventListener("click",function(){ordenarColumnas("id")});
    document.getElementById("btn-modelo").addEventListener("click",function(){ordenarColumnas("modelo")});
    document.getElementById("btn-anofabricacion").addEventListener("click",function(){ordenarColumnas("anofabricacion")});
    document.getElementById("btn-velmax").addEventListener("click",function(){ordenarColumnas("velmax")});
    document.getElementById("btn-cantpuertas").addEventListener("click",function(){ordenarColumnas("cantpuertas")});
    document.getElementById("btn-asientos").addEventListener("click",function(){ordenarColumnas("asientos")});
    document.getElementById("btn-carga").addEventListener("click",function(){ordenarColumnas("carga")});
    document.getElementById("btn-autonomia").addEventListener("click",function(){ordenarColumnas("autonomia")});

    obtenerFilas();

}

function FiltrarSelect()
{
    let valorSeleccionado = selectMain.value;

    if (valorSeleccionado === "Todos")
    {
        deschequearChk();
        MostrarTabla(listaVehiculos);
    }
    else if(valorSeleccionado === "Auto")
    {
        deschequearChk();
        MostrarTabla(listaAutos);
    }
    else if(valorSeleccionado === "Camion")
    {
        deschequearChk();
        MostrarTabla(listaCamiones);
    }
    
    console.log("El valor seleccionado es: " + valorSeleccionado);
}
selectMain.addEventListener("change", FiltrarSelect);


function mostrarColumnaChk(checkbox, claseColumna)
{
    var columnas = document.getElementsByClassName(claseColumna);

    for(var i = 0 ; i < columnas.length; i++)
        {
            columnas[i].style.display = checkbox.checked ? 'none' : '';
        }
}

chkId.addEventListener("change", function(){mostrarColumnaChk(chkId,"col-id");});
chkModelo.addEventListener("change", function(){mostrarColumnaChk(chkModelo,"col-modelo");});
chkAnoFabricacion.addEventListener("change", function(){mostrarColumnaChk(chkAnoFabricacion,"col-anofabricacion");});
chkVelMax.addEventListener("change", function(){mostrarColumnaChk(chkVelMax,"col-velmax");});
chkCantPuertas.addEventListener("change", function(){mostrarColumnaChk(chkCantPuertas,"col-cantpuertas");});
chkAsientos.addEventListener("change", function(){mostrarColumnaChk(chkAsientos,"col-asientos");});
chkCarga.addEventListener("change", function(){mostrarColumnaChk(chkCarga,"col-carga");});
chkAutonomia.addEventListener("change", function(){mostrarColumnaChk(chkAutonomia,"col-autonomia");});

function ordenarColumnas(criterioOrden)
{
    mostrar = [];
    switch(selectMain.value)
    {
        case "Auto":
            mostrar = [...listaAutos];
            break;
        case "Camion":
            mostrar = [...listaCamiones];
            break;
        default:
            mostrar = [...listaVehiculos];
            break;
    }
    switch(criterioOrden)
    {
        case "id":
            mostrar = mostrar.sort((id1,id2) => id1.id-id2.id);
            break;
        case "modelo":
            mostrar = mostrar.sort((modelo1,modelo2) => modelo1.modelo.localeCompare(modelo2.modelo));
            break;
        case "anofabricacion":
            mostrar = mostrar.sort((ano1,ano2) => ano1.anoFabricacion-ano2.anoFabricacion);
            break;
        case "velmax":
            mostrar = mostrar.sort((vel1,vel2) => vel1.velMax-vel2.velMax);
            break;
        case "asientos":
            mostrar = mostrar.sort((asiento1,asiento2) => asiento1.asientos - asiento2.asientos);
            break;
        case "cantpuertas":
            mostrar = mostrar.sort((cant1,cant2) => cant1.cantidadPuertas - cant2.cantidadPuertas);
            break;
        case "carga":
            mostrar = mostrar.sort((carga1,carga2) => carga1.carga - carga2.carga);
            break;
        case "autonomia":
            mostrar = mostrar.sort((autonomia1,autonomia2) => autonomia1.autonomia - autonomia2.autonomia);
            break;
    }
    MostrarTabla(mostrar);

}

function obtenerFilas()
{
    var tabla = document.getElementById("tabla-vehiculos");
    var filas = tabla.getElementsByTagName("tr");

    for(var i = 1; i < filas.length; i++){ 
        filas[i].addEventListener("click",function(){
            formABM.style.display = "block";
            formDatos.style.display  = "none";
            var celdas = this.getElementsByTagName("td");
            var datos = [];
        
            for (var j = 0; j < celdas.length; j++)
            {
                datos.push(celdas[j].textContent);
            }
            for(var k = 0; k < listaInputs.length; k++)
            {
                listaInputs[k].value = datos[k];
            }

            inputId.readOnly = true;
        });
    }
}

function mostrarFormABM()
{
    
    if(formABM.style.display === "none")
    {
        formABM.style.display = "block";
        listaInputs.forEach(input => {input.value  = "";});
        formDatos.style.display = "none";
    }
    else
    {
        formABM.style.display = "none";
    }
    inputId.readOnly = false;
    
}
btnAgregarVehiculos.addEventListener("click",mostrarFormABM);

//#endregion


//#region Form ABM
selectTipo.addEventListener("change",function()
{
    switch(selectTipo.value)
    {
        case "Auto":
            labelTipo.textContent = "Asientos:";
            labelTipo2.textContent = "Cant. de Puertas:";
            break;
        default:
            labelTipo.textContent = "Carga:";
            labelTipo2.textContent = "Autonomía:";
            break;
    }
});


function darAltaOmodificar()
{
var valorSeleccionado = selectTipo.value;
var idUnico = true;

switch(inputId.readOnly)
{
    
    case true: // si el input del id no se puede modificar: Modificamos al vehiculo
        listaVehiculos.forEach(vehiculo => {
            if (inputId.value == vehiculo.id)
            {
                vehiculo.modelo = modeloInput.value;
                vehiculo.anoFabricacion = anoFabricacionInput.value;
                vehiculo.velMax = velMaxInput.value;
                if (vehiculo.anoFabricacion < 1986)
                    {
                        alert("El año de fabricación debe ser mayor a 1985");
                        throw new Error("Vehículo leyenda");
                    }
            }

        })
        
    break;

    default: // El input del id se puede modificar: Agregamos un vehiculo
        listaVehiculos.forEach(vehiculo => 
            {
                if (vehiculo.id == inputId.value)
                    {
                        idUnico = false;
                    }
            });
            if(!idUnico)
                {
                    alert("El ID debe ser único");
                }
            else
            {
                if(valorSeleccionado === "Auto")
                {
                    
                    let auto_nuevo = new Auto(inputId.value,modeloInput.value,anoFabricacionInput.value,velMaxInput.value,parseInt(atrTipoInput.value),parseInt(atrTipoInput2.value));
                    listaAutos.push(auto_nuevo);
                    listaVehiculos.push(auto_nuevo);
                }
                else if(valorSeleccionado === "Camion")
                {
                    let camion_nuevo = new Camion(inputId.value,modeloInput.value,anoFabricacionInput.value,velMaxInput.value,parseInt(atrTipoInput.value),parseInt(atrTipoInput2.value));
                    listaCamiones.push(camion_nuevo);
                    listaVehiculos.push(camion_nuevo);
                }
            }
    break;
    
    }
    MostrarTabla(listaVehiculos);

    formDatos.style.display = "block";
    formABM.style.display = "none";
}

function eliminarVehiculo(id) 
{
    for(let i = 0; i < listaVehiculos.length ; i++)
    {
        if(listaVehiculos[i].id == id)
        {
            listaVehiculos.splice(i,1);
        }
    }
    for(let i = 0; i < listaAutos.length; i++)
    {
        if(listaAutos[i].id == id)
        {
            listaAutos.splice(i,1);
        }
    }
    for(let i = 0; i < listaCamiones.length; i++)
    {
        if(listaCamiones[i].id == id)
        {
            listaCamiones.splice(i,1);
        }
    }

    MostrarTabla(listaVehiculos);

    formDatos.style.display = "block";
    formABM.style.display = "none";
}

btnAceptar.addEventListener("click",darAltaOmodificar);
btnEliminar.addEventListener("click",function(){
    eliminarVehiculo(inputId.value);
});
btnCancelar.addEventListener("click",function(){formABM.style.display = "none";formDatos.style.display = "block"});
//#endregion