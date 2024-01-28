
    import Controller from "./Controller";
    import Service from "./Service";
    import { EntityRepository } from "./Repositories";
    
    const repository = new EntityRepository();
    
    const service = new Service(repository);
    const controller = new Controller(service);
    
    export default controller.handle.bind(controller);
    