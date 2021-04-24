import { Request, Response } from "express";
import { UserService } from '../services/UsersService'


class UserController {

  async create(request:Request, response: Response): Promise<Response> {
    const {email} = request.body

    const userService = new UserService()

    
    const user = await userService.create(email)
    
    return response.status(200).json(user)

  }

}

export {UserController}