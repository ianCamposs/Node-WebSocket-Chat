import {io} from '../http' 
import { ConnectionService } from '../services/ConnectionsService'
import { MessagesService } from '../services/messagesService'
import { UserService } from '../services/UsersService'

interface IParams {
  text: string,
  email: string
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService()
  const userService = new UserService()
  const messageService = new MessagesService()

  let user_id = null

  socket.on('client_first_acess', async (params) => {
    
    const socket_id = socket.id
    const {text, email} = params as IParams

    const userExits = await userService.findByEmail(email)
    
    if (!userExits) {
      const user = await userService.create(email)

      await connectionService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id

    } else {
      user_id = userExits.id

      const connection = await connectionService.findByUserId(userExits.id)

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExits.id
        })
      } else {
        connection.socket_id = socket_id

        await connectionService.create(connection)
      }
    }

    await messageService.create({
      text,
      user_id
    })
  })
})