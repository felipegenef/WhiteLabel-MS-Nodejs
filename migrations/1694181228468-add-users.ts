// Migration generated at 2023-09-08T13:53:48.468Z

import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { User } from "../entities/User";

export class add_users1694181228468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.connection;
    const userRepo = connection.getRepository(User);
    await Promise.all([
      userRepo.save([
        userRepo.create({
          hashedPassword: "senha teste",
          name: "Usuário 1",
          id: "98f94936-5ced-41a8-9452-2fd7902d65e4",
        }),
        userRepo.create({
          hashedPassword: "senha teste2",
          name: "Usuário 2",
          id: "a3389647-dfa9-4cbb-ba16-4425ecd3ca97",
        }),
      ]),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const connection = queryRunner.connection;
    const userRepo = connection.getRepository(User);
    await Promise.all([
      userRepo.delete("98f94936-5ced-41a8-9452-2fd7902d65e4"),
      userRepo.delete("a3389647-dfa9-4cbb-ba16-4425ecd3ca97"),
    ]);
  }
}
