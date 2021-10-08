import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoProyectos = () => {

    //extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //obtener proyectos cuando cargue el componenete
    useEffect(() => {
        //si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
        //la siguiente linea es para decirle a react que no necesitamos una dependencia
        //eslint-disable-next-line
    }, [mensaje])

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay Proyectos, comienza creando uno</p>;

    

    return ( 

        <ul className='listado-proyectos'>

            { alerta ? (
                <div className={`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                </div>
                
                )               
            
            : null}
            <TransitionGroup>
            {proyectos.map(p => 
                <CSSTransition
                    key={p._id}
                    timeout={200}
                    classNames='proyecto'
                >
                    <Proyecto 
                        proyecto={p} 
                    />
                </CSSTransition>
            )}
            </TransitionGroup>
        </ul>

     );
}
 
export default ListadoProyectos;