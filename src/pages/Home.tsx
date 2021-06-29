import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { useHistory } from 'react-router-dom'
import { database } from '../services/firebase'
 
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import enterRoomImg from '../assets/images/enter-room-icon.svg'

import '../styles/global.scss'
import '../styles/auth.scss'
import { Button } from '../components/Button'


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('')
  const { theme, toggleTheme} = useTheme();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(even: FormEvent) {
    even.preventDefault()

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get()

    if (!roomRef.exists()) {

      //to do add react-hot-toast later
      alert("Room does not exist.")
      return;
    }

    if (roomRef.val().endedAt) {
      alert("This room is already closed.")
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração representando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <button className='theme-toggle' onClick={toggleTheme}>
            <img src="https://img.icons8.com/ios/50/000000/crescent-moon.png"/>
          </button>
          <img src={logoImg} alt="Letmeask logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <img src={enterRoomImg} alt="Enter the room icon" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}