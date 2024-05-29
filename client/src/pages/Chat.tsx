import { useEffect, useState } from "react"
import io from "socket.io-client"

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("")
  const [chat, setChat] = useState<string[]>([])
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const newSocket: any = io("http://localhost:3000/")
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (socket == null) return

    socket.on("chat-message", (msg: string) => {
      addMessage(msg)
    })
  }, [socket])

  function addMessage(msg: string) {
    setChat((prev) => [...prev, msg])
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    socket.emit("send-chat-message", message)
    addMessage(message)
    setMessage("")

    console.table(chat)
  }

  return (
    <section className="w-full h-screen flex flex-col items-center">
      <h1 className="mb-4 text-4xl font-bold bg-gray-900 text-white w-full text-center py-4">
        Chat
      </h1>

      <section className="h-full w-full mb-28 px-20 ">
        <section className="h-full w-full rounded-xl border-2 border-black">
          {chat.map((msg, index) => {
            return (
              <p key={index} className="text-xl">
                {msg}
              </p>
            )
          })}
        </section>
      </section>

      <form
        onSubmit={sendMessage}
        className="absolute bottom-10 flex justify-center w-full"
      >
        <input
          type="text"
          placeholder="Text here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-xl border-2 border-black rounded-xl p-2 w-1/2"
        />
        <button className="bg-black text-white w-20 rounded-xl ml-2">
          Send
        </button>
      </form>
    </section>
  )
}

export default Chat
