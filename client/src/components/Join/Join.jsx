import React, {useRef} from 'react'
import io from 'socket.io-client'
import "../Join/join.css"

export default function Join({setChatVisibility, setSocket}) {

    const usernameRaf = useRef()

    const handleSubmit = async () => {
        const username = usernameRaf.current.value
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    const getEnterKey = (e) => {
      if(e.key === 'Enter')
        handleSubmit()
    }

  return (
    <div className='Join'>
        <h1>Login</h1>
        <div className='join-footer'>
          <input type="text" ref={usernameRaf} onKeyDown={(e)=>getEnterKey(e)} placeholder='Nome de usuário'/>
          <button onClick={()=>handleSubmit()}>Entrar</button>
        </div>
    </div>
  )
}
