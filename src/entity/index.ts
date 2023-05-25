import { User } from "./User";
import tables from "./tables";
export const entities = [
  User,
];

export const entityTablePair = [
  {
    entity: User,
    table: tables.userTable,
  },
];
