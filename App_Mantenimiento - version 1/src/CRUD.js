import {
    saveTask, 
    getTasks, 
    onGetTasks, 
    deleteTask,
    getTask,
    updateTask

} from "./firebase.js";

const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
//const tasksCont = document.getElementById('prueba-conte')

let editStatus =false;

let id= '';

/* 
equipoDoc.get().then((doc) => {
    if (doc.exists) {
        // Accede a los datos del documento
        const datosEquipo = doc.data();
        
        // Muestra el dato en tu HTML (por ejemplo, en un elemento con el ID 'datoEquipo')
        document.getElementById('datoEquipo').innerHTML = `Nombre del Equipo: ${datosEquipo.nombre}`;
    } else {
        console.log("No se encontró el documento");
    }
}).catch((error) => {
    console.log("Error al obtener el documento:", error);
});
*/

window.addEventListener('DOMContentLoaded',async()=>{
    //console.log('works')

    //const querySnapshot = await getTasks()
    onGetTasks((querySnapshot)=>{
        let html = "";//constante html

        querySnapshot.forEach((doc) =>{
            //console.log(doc.data())
            const task = doc.data();//traer datos de la BD
            html += ` 
            <div>
                <h3>Titulo: ${task.title}</h3>
                <p>id: ${task.description} &nbsp
                Campamento: ${task.campamento} &nbsp
                <button class='btn-delete'data-id="${doc.id}">Delete</button>
                <button class='btn-edit'data-id="${doc.id}">Edit</button>
                
                <div class="container-fluid px-4">
                        <h1 class="mt-4">ACTIVOS</h1>
                <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Mantenimiento Preventivo DHO - Calidad de Vida</li>
                        </ol>
                        
                <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Mostrar Activos
                            </div>
                            <div class="card-body">
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Campamento</th>
                                            <th>Tipo Lugar</th>
                                            <th>Lugar Exacto</th>
                                            <th>Nombre de Activo</th>
                                            <th>Propietario</th>
                                            <th>Condición</th>
                                            <th>CodInterno</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Serie</th>
                                            <th>Tipo de Activo</th>
                                            <th>Mantenimiento</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td>${task.title}</td>
                                            <td>${task.description}</td>
                                            <td>${task.campamento}</td>
                                            <td>Comedor Principal</td>
                                            <td>Cocina</td>
                                            <td>Bateas</td>
                                            <td>Buena</td>
                                            <td>2021345261</td>
                                            <td>Reeef</td>
                                            <td>XHA453</td>
                                            <td>D344423F2</td>
                                            <td>Cocina</td>
                                            <td><a class="btn btn-primary" href="Registrar_Mantenimiento.html" role="button">+</a></td>
                                        </tr>
                                          
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


            </div>

            `;       //relleno el html
                    //cada boton delete tendra sy id con data-id=doc.id
        });
        tasksContainer.innerHTML = html //lo coloco en el tasl container
        //tasksCont.innerHTML=querySnapshot."12"
        const btnsDelete =tasksContainer.querySelectorAll('.btn-delete')
    
        //console.log(btnsDelete)
        //Para Eliminar en la Base de Datos
        btnsDelete.forEach(btn=>{
            btn.addEventListener('click',({target:{dataset}})=>{
                deleteTask(dataset.id)
                //console.log(dataset.id)//target dataset es para sacar el id //estructuramos el objeto
                //console.log('deleting')
            })
        })
        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')//selecciona todos los botones edit
        btnsEdit.forEach((btn)=>{
            btn.addEventListener('click',async (e)=>{
                //console.log(e.target.dataset.id)// me muestra el id
                const doc = await getTask(e.target.dataset.id)//esto hara la consulta a firestore
                //console.log(doc.data())//doc.data me trae los datos tal cual
                const task = doc.data()
                
                //Pasamos a rellenar los datos con taskForm:
                taskForm['task-title'].value = task.title
                taskForm['task-description'].value = task.description
                taskForm['task-campamento'].value = task.campamento

                editStatus = true;//cuando se ejecute ese formularo se cambia el estado.
                id = doc.id //actualizamos el id segun la BD

                taskForm['btn-task-save'].innerText = 'Update'


            })//con ese id mandare a la BD una consulta si tiene ese Id que me traiga esos datos a pantalla para editarlos.
            //console.log(btn)
        })
    });
    //console.log(querySnapshot)
});

taskForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    //console.log('enviado')
    const title = taskForm['task-title']
    const description = taskForm['task-description']
    const campamento = taskForm['task-campamento']
    
    //console.log(title.value,description.value)
    
    // si no tiene el estado guardar  y si si tiene  editar
    if(!editStatus){
        saveTask(title.value, description.value,campamento.value);
        //console.log("updating")
    } else {//tiene estado editStatus-> editar
        updateTask(id,{
            title: title.value,
            description: description.value,
            campamento: campamento.value,
    });
    
        editStatus = false;
    }

    taskForm.reset();//reseteamos para que este en blanco
    
})