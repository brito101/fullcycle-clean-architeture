import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1", "Customer 1");
const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});