import './Main.css'
import Chat from './Chat'
import {useState} from 'react';

function Main(){
    
    const [chatAbierto, setChatAbierto] = useState(false);
    function toggleChat(){
    setChatAbierto(prev => !prev);
    }
    return <section id="main">
            <div id='main-section'>
                <div id="main-card">
                <h2>Ciro Cabral Reami</h2>
                <p>Analista de Sistemas Junior, en constante formación, aportando creatividad, resolución de problemas y lógica computacional para
                    analizar, crear y mantener sistemas.
                </p>
                <button type='button' id='button-toggle-chat' onClick={toggleChat}>Conoceme</button>
                </div>
            </div>
                <div id="projects">
                    <div id='project 1'></div>
                    <div id='project 2'></div>
                    <div id='project 3'></div>
                    <div id='project 4'></div>
                </div>
            <Chat 
            chatAbierto={chatAbierto}
            cerrarChat={() => setChatAbierto(false)}
            />
            </section>

            
    

}




export default Main;