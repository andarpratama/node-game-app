const UserModel = require("../models/Users");
const { register, login } = require("./helper/auth.helper");
const { getAll, detailUser, updateUser } = require("./helper/user.helper");

describe("GET /users - Get All the User", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });

  beforeAll(async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(201);
  });

  beforeAll(async () => {
    const userLogged = await login({
      email: "test@gmail.com",
      password: "test123",
    });
    userLogin = userLogged.body;
  });

  it("Should be able to get all the user", async () => {
    const result = await getAll(userLogin.accessToken);
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: "Success get all users",
      data: result.body.data,
    });
  });
});

describe("GET /users - Get the Detail of user logged", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });

  beforeAll(async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(201);
  });

  beforeAll(async () => {
    const userLogged = await login({
      email: "test@gmail.com",
      password: "test123",
    });
    userLogin = userLogged.body;
  });

  it("Should be able to get all the user", async () => {
    const result = await detailUser(userLogin.accessToken);
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Detail resource of townhall`,
      data: result.body.data,
    });
  });
});

describe("PUT /users - Update data of user logged", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });

  beforeAll(async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(201);
  });

  beforeAll(async () => {
    const userLogged = await login({
      email: "test@gmail.com",
      password: "test123",
    });
    userLogin = userLogged.body;
  });

  it("Should be able to update user", async () => {
    let userId = userLogin.data._id
    let data = { name: "new name", email: 'newemail@gmail.com', password: '1234' }
    const result = await updateUser(userId, data, userLogin.accessToken)
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Success update the user`,
      data: result.body.data,
    });
  });
});
