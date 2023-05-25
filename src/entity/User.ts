import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserInterface } from "../interfaces/user.interface";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  constructor(body: Partial<UserInterface>) {
    if (!body) {
      return;
    }
    this.name = body.name;
    this.username = body.username;
    this.password = body.password;
  }
}
