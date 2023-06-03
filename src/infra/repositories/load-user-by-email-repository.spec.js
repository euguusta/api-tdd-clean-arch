import { connect, cleanData, disconnect } from '../helper/mongo-in-memory-server'
import { User } from '../../infra/db/schemas/Users'
import { LoadUserByEmailRepository } from './load-user-by-email-repository';

const makeSut = () => {
  const sut = new LoadUserByEmailRepository();
  return {
    sut,
  };
};


describe("LoadUserByEmail Repository", () => {
  beforeAll(async () => {
    await connect()
  });

  afterAll(async () => {
    await disconnect()
  });

  beforeEach(async () => {
    await User.deleteMany({})
  });

  test("Should return null if user is not found", async () => {
    const { sut } = makeSut();
    const user = await sut.load("valid_mail@gmail.com");
    expect(user).toBe(null);
  });

  test("Should return null if user is not found", async () => {
    await User.create({ 
      email: "valid_mail@gmail.com",
     })
    const { sut } = makeSut();
    const user = await sut.load("valid_mail@gmail.com");
    expect(user.email).toBe("valid_mail@gmail.com");
  });

});