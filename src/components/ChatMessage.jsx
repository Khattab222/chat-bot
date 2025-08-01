import { Bot } from 'lucide-react'
import React from 'react'

const ChatMessage = ({chat}) => {
  return (
    !chat.hideInChat &&(
  <div className={`message ${chat.role === "model"?"bot" :"user"}-message ${chat.isError ? 'error' : ''}`}>
    {
          
      chat.role === "model" &&  <Bot color='#6d4fc2' size={20} />
    }
      <p className='message-text'>{chat.text}</p>
    </div>
  ))
}

export default ChatMessage