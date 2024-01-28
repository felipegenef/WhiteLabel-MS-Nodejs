import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1669995416589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "name", type: "string" },
            { name: "hashed_password", type: "string", isNullable: false },
            { name: "created_at", type: "timestampz" },
            { name: "updated_at", type: "timestampz" },
            { name: "deleted_at", type: "timestampz", isNullable: true },
          ],
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([queryRunner.dropTable("users")]);
  }
}
