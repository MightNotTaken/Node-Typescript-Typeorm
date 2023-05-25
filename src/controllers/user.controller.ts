import { Request, Response } from "express";
import { User } from "../entity/User";
import { UserInterface } from "../interfaces/user.interface";
import { AppDataSource, createTable } from "../db";
import userTable from "../entity/tables/user.table";
import wss from "./../ws"; // use ws.emit to notifiy the concerned people

const UserRepository = AppDataSource.getRepository(User);

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const userData: UserInterface = req.body;
      const user = new User(userData);
      await UserRepository.save(user);
      res.status(201).json(user);
    } catch (err) {
      if (err.code === "ER_NO_SUCH_TABLE") {
        await createTable(userTable);
        return await this.createUser(req, res);
      }
      res.status(500).json(err);
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.find({
        order: {
          id: "DESC",
        },
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findOneBy({ id: +req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async updateUserById(req: Request, res: Response) {
    try {
      const updates = req.body;
      const response = await UserRepository.update(+req.params.id, updates);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async deleteUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findOneBy({ id: +req.params.id });
      await UserRepository.remove(user);
      res.status(204).send();
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default UserController;
