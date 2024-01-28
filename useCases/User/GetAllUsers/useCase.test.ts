import { randomUUID } from "crypto";
import { UserDTO } from "./DTOs";
import { EntityRepository } from "./Repositories";
import Service from "./Service";

let repository: EntityRepository;
let service: Service;
const mock: UserDTO[] = [
  {
    id: "b008b42f-44a8-4f1f-9eb1-61e0831458b4",
    name: "Usuário '1",
    updatedAt: new Date(),
    createdAt: new Date(),
    deletedAt: null,
  },
];
describe("New Test Description", () => {
  beforeEach(async () => {
    repository = new EntityRepository();
    service = new Service(repository);
    jest.spyOn(repository, "findAll").mockImplementation(async () => mock);
  });
  it("Should get the same object as mock", async () => {
    const serviceResponse = await service.execute();
    expect(serviceResponse).toBe(mock);
  });
});
