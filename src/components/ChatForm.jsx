import { ArrowUp } from "lucide-react"
import { useRef } from "react"


const ChatForm = ({chatHistory,setChatHistory,generateBotResponse}) => {
  const inputRef = useRef()

const handleSubmit = (e) =>{
  e.preventDefault()
  const userMessage = inputRef.current.value.trim();
  if (!userMessage)return;

  inputRef.current.value=""
  // update chat history with user's message
  setChatHistory(history=>[...history,{role:"user",text:userMessage}])

// add thinking message to chat history
  setTimeout(() => {
    setChatHistory(history=>[...history,{role:"model",text:'Thinking......'}])
      generateBotResponse([...chatHistory,{role:"user",text:userMessage}])
  }, 600)


}

  return (
    <form action="#" className='flex items-center rounded gap-2 chat-form' onSubmit={handleSubmit}>
            <input ref={inputRef} className='border-0 outline-none  rounded message-input ' type="text" placeholder='Type your message here...' required />
            <button className='material-symbols-reounded' type="submit"><ArrowUp /></button>
          </form>
  )
}

export default ChatForm