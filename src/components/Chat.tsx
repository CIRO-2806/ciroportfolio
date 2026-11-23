import './Chat.css';
import {useEffect,useRef,useState} from "react";

type ChatProps = {
  chatAbierto: boolean;
  cerrarChat: () => void;
};
type Msg = {role: "user" | "assistant"; text: string};
function Chat({ chatAbierto, cerrarChat }: ChatProps) {
  const[messages,setMessages] = useState<Msg[]>([]);
  const[input,setInput] = useState("");
  const[loading,setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages,loading])

  async function send(){
    const text = input.trim();
    if(!text || loading) return;

    const next:Msg[] = [...messages,{role:"user",text}];
    setMessages(next);
    setInput("");
    setLoading(true);
    try{
      const res = await fetch("/api/chat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          messages:next.map((m) => ({role: m.role, content: m.text})),
        }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Error");
      setMessages([...next,{role:"assistant",text:data.reply}]);

    }catch{
      setMessages([
        ...next,
        {role:"assistant",text:"Hubo un error al responder, intentá otra vez."},
      ]);
    }finally{
      setLoading(false);
    }
  }

    return (
      <div id="chat-sect" className={chatAbierto ? "abierto" : "cerrado"}>
        <div id='chat' className={chatAbierto ? "abierto" : "cerrado"}>
          <button id='chat-button-back'  onClick={cerrarChat}>&lt;</button>

          <div id="chat-msg">
            {messages.map((m,i)=>(
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="msg assistant">Pensando...</div>}
            <div ref={endRef}/>
          </div>

          <input type="text" id="chat-input" 
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && send()}
          disabled={loading}
          placeholder="Preguntame algo" 
          />
        </div>
        
      </div>
    );
  }

export default Chat;