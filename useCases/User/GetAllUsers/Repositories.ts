import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Repository } from "../../../data/db";
import { UserDTO } from "./DTOs";
import { users } from "../../../entities/User";
import { isNull } from "drizzle-orm";

export interface RepositoryInterface {
  findAll: () => Promise<UserDTO[]>;
}
@Repository
export class EntityRepository implements RepositoryInterface {
  private db: NodePgDatabase;
  async findAll(): Promise<UserDTO[]> {
    const allUsers = await this.db
      .select({
        id: users.id,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt,
      })
      .from(users)
      .where(isNull(users.deletedAt));

    return allUsers.map(
      (item) =>
        new UserDTO(
          item.id,
          item.name,
          item.createdAt,
          item.updatedAt,
          item.deletedAt
        )
    );
  }
}
