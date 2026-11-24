import './Main.css'
import Chat from './Chat'
import {useState} from 'react';
import clem from '../assets/clementina-prev.png'
import nut from '../assets/encuesta-nutricion.png'

import js from '../assets/DeviconPlainJavascript.png'
import ja from '../assets/DeviconPlainJava.png'
import ht  from '../assets/DeviconPlainHtml5.png'

import py from '../assets/DeviconPlainPython.png'
import da from '../assets/SolarChartLinear.png'
import sp  from '../assets/SolarSparklesOutline.png'


import sd from '../assets/SolarSsdRoundLinear.png'
import wf from '../assets/SolarWiFiRouterOutline.png'
import cu from '../assets/SolarCpuLineDuotone.png'



function Main(){
    
    const [chatAbierto, setChatAbierto] = useState(false);
    function toggleChat(){
    setChatAbierto(prev => !prev);
    }
    return <section id="main">
            <div id='main-section'>
                <div id="main-card">
                <h2 id='main-h2'>Ciro Cabral Reami</h2>
                <p id='main-p'>Analista de Sistemas Junior, en constante formación, aportando creatividad, resolución de problemas y lógica computacional para
                    analizar, crear y mantener sistemas.
                </p>
                <button type='button' id='button-toggle-chat' onClick={toggleChat}>Conoceme</button>
                </div>
            </div>
            
                <div id="projects">
                    <h2 id='projects-h2'>Proyectos</h2>
                    <div className='project a'>
                        <img src={clem} id='project-image'></img>
                        <div id='project-text-section'>
                            <h2>Clementina</h2>
                            <p>Sistema de gestión académica del ISFT N.º 182 que permite a los alumnos consultar notas, inscribirse a finales y empadronarse en una carrera.
Desarrollamos una nueva versión en un equipo de cinco personas con PHP, MySQL, HTML, CSS y JavaScript, bajo una arquitectura modelo-vista-controlador (MVC).
Durante las pruebas en el servidor, trabajé con apoyo de IA en la corrección de errores de interfaz, lógica y base de datos.</p>
                        </div>
                    </div>
                    <div className='project b'>
                        <div id='project-text-section'>
                            <h2>Encuesta Nutricional</h2>
                            <p>Sistema de Encuesta nutricional para los estudiantes de distintas carreras, que permite responder formularios, y como
                                docente crear,modificar o eliminar formularios. Muestra un resumen de estadísticas y permite visualizar los datos en base a distintos filtros. Usa una arquitectura MVC, con PHP,MySQL, HTML, CSS y JavaScript.</p>
                        </div>
                        <img src={nut} id='project-image'></img>
                    </div>
                </div>
            <Chat 
            chatAbierto={chatAbierto}
            cerrarChat={() => setChatAbierto(false)}
            />
            <h2 id='services-h2'>Servicios</h2>
            <section id='services'>
                <div id='service-box'>
                    <h2>Desarrollo Web y Programación</h2>
                    <p>Desarrollo sitios y aplicaciones web con React, JavaScript y PHP. También programo en Python y Java y trabajo con bases de datos MySQL.</p>
                    <div id='service-images'>
                        <img src={ja}></img>
                        <img src={js}></img>
                        <img src={ht}></img>
                    </div>
                </div>
                <div id='service-box'>
                    <h2>Automatización con IA</h2>
                    <p>Integro IA para simplificar tareas repetitivas, como responder preguntas frecuentes, organizar información o analizar grandes volúmenes de datos.</p>
                    <div id='service-images'>
                        <img src={py}></img>
                        <img src={da}></img>
                        <img src={sp}></img>
                    </div>
                </div>
                <div id='service-box'>
                    <h2>Redes y Mantenimiento</h2>
                    <p>Armo computadoras de escritorio y realizo mantenimiento preventivo de PC y notebooks, con limpieza interna y cambio de pasta térmica. También armo cables de red UTP con conectores RJ45.</p>
                    <div id='service-images'>
                        <img src={sd}></img>
                        <img src={wf}></img>
                        <img src={cu}></img>
                    </div>
                </div>
            </section>
            </section>

            
    

}




export default Main;