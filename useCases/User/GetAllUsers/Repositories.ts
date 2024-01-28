import { DataSource } from "typeorm";
import { Repository } from "../../../data/db";
import { User } from "../../../entities/User";
import { UserDTO } from "./DTOs";

export interface RepositoryInterface {
  findAll: () => Promise<UserDTO[]>;
}
@Repository
export class EntityRepository implements RepositoryInterface {
  private connection: DataSource;
  async findAll(): Promise<UserDTO[]> {
    const userRepo = this.connection.getRepository(User);
    const allUsers = await userRepo.find();
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
