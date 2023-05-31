import { MongoClient } from "mongodb";
import { MemoryServerMongo } from "./helper/mongo-in-memory-server";

let userModel;
const helper = new MemoryServerMongo();

class LoadUserByEmailRepository {
  async load(email) {
    const user = (await helper.getCollection("users")).findOne({ email })
    return user;
  }
}

describe("LoadUserByEmail Repository", () => {
  beforeAll(async () => {
    helper.connect();
    userModel = await helper.getCollection("users");
  });

  afterAll(async () => {
    helper.disconnect();
  });

  beforeEach(async () => {
    (await helper.getCollection("users")).deleteMany({})
  })

  test("Should return null if user is not found", async () => {
    const sut = new LoadUserByEmailRepository();
    const user = await sut.load("valid_mail@gmail.com");
    expect(user).toBe(null);
  });

  test("Should return null if user is not found", async () => {
   (await helper.getCollection("users")).insertOne({
      email: 'valid_mail@gmail.com'
    })
    const sut = new LoadUserByEmailRepository();
    const user = await sut.load("valid_mail@gmail.com");
    expect(user.email).toBe('valid_mail@gmail.com');
  });
});
