import React, { Fragment, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;
    

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto; 

    //Elimina un proyecto
    const onClickELiminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0 
                    ? <li className='tarea'><p>No hay tareas</p></li>
                    :<TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                            key={tarea.nombre}
                                timeout={200}
                                classNames='tarea'
                            >
                                <Tarea    
                                    key={tarea.id}
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }

            
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={onClickELiminar}
            >ELiminar Proyecto &times;</button>
            
        </Fragment>
     );
}
 
export default ListadoTareas;