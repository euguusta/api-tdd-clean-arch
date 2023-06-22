import { Customer } from "../db/schemas/Customer.js";

export class UpdateCustomerRepository {
  async edit(customerData) {
    const user = await Customer.updateOne(
      {
        _id: customerData.customerId,
      },
      {
        $set: customerData,
      }
    );
    return user;
  }
}
