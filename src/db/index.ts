import "reflect-metadata";
import { DataSource } from "typeorm";
import { entities, entityTablePair } from "../entity";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any || 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities,
  migrations: [],
  subscribers: [],
});

export const initializeDB = () => {
  return new Promise(async (res, rej) => {
    AppDataSource.initialize()
      .then(async () => {
        // AppDataSource.synchronize(true)
        createTablesIfNotExists().then(console.log, console.error);
        res(true);
      })
      .catch(async (error) => {
        console.error(error);
        res(error);
      });
  });
};

export const createTablesIfNotExists = async () => {
  try {
    for (let { entity, table } of entityTablePair) {
      try {
        const repository = AppDataSource.getRepository(entity);

        const data = await repository.findOne({
          where: {},
          order: {
            id: "ASC",
          },
        });
        console.log(`${table.name} table initialized`);
      } catch (err) {
        if (err.code === "ER_NO_SUCH_TABLE") {
          await createTable(table);
          console.log(`${table.name} table created`);
        }
      }
    }
    return "All Tables properly initalized";
  } catch (error) {
    console.error(error);
  }
};

export const createTable = async (table: any) => {
  try {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.dropTable(table.name, true);
    await queryRunner.createTable(table, true);
    await queryRunner.release();
  } catch (error) {
    console.error(error);
  }
};
