import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: "1",
        zipcode: "Zipcode 1",
        city: "City 1",
      },
    };

    const result = usecase.execute(input);

    expect(result).toEqual(output);
  });
});