import { RepositoryInterface } from "./Repositories";
import Service from "../../../Global/interfaces/Service";

export default class GetAllUsersService implements Service {
  private repository: RepositoryInterface;
  constructor(repository: RepositoryInterface) {
    this.repository = repository;
  }
  async execute() {
    const users = await this.repository.findAll();
    return users;
  }
}
