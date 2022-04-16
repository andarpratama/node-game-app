const UserModel = require("../models/Users");
const { register, login } = require("./helper/auth.helper");

describe("POST /auth/register - User Registration Endpoint", () => {
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  it("Should be able to register", async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(201);
    expect(userRegistered.body).toEqual({
      success: true,
      message: "Success Registration",
      data: userRegistered.body.data,
    });
  });

  it("Should be able show error message when user not input name", async () => {
    const userRegistered = await register({
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(422);
    expect(userRegistered.body).toEqual({
      success: false,
      message: "Name Required: Your name is required to perform this action",
      error: { name: "Name Required" },
    });
  });

  it("Should be able show error message when user not input email", async () => {
    const userRegistered = await register({
      name: "Test",
      password: "test123",
    });
    expect(20).toEqual(20);
    expect(userRegistered.status).toEqual(422);
    expect(userRegistered.body).toEqual({
      success: false,
      message: "Emai Required: Your email is required to perform this action",
      error: { email: "Email Required" },
    });
  });

  it("Should be able show error message when user not input password", async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
    });
    expect(20).toEqual(20);
    expect(userRegistered.status).toEqual(422);
    expect(userRegistered.body).toEqual({
      success: false,
      message:
        "Password Required: Your Password is required to perform this action",
      error: { password: "Password Required" },
    });
  });

  it("Should be able show error message when user input invalid email", async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(422);
    expect(userRegistered.body).toEqual({
      success: false,
      message: "Emai Invalid: Your email is invalid",
      error: { email: "Email Invalid" },
    });
  });
});

describe("POST /auth/login - User Login Endpoint", () => {
  beforeEach(async () => {
    const userRegistered = await register({
      name: "Test",
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userRegistered.status).toEqual(201);
  });
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  it("Should be able to login", async () => {
    const userLogged = await login({
      email: "test@gmail.com",
      password: "test123",
    });
    expect(userLogged.status).toEqual(200);
    expect(userLogged.body).toEqual({
      success: true,
      message: "Success Login",
      data: userLogged.body.data,
      accessToken: userLogged.body.accessToken,
    });
  });

  it(`Should can handle the error, if user doesn't input their email`, async () => {
    const userLogged = await login({
      password: "test123",
    });
    expect(userLogged.status).toEqual(422);
    expect(userLogged.body).toEqual({
      success: false,
      message: "Emai Required: Your email is required to perform this action",
      error: { email: "Email Required" },
    });
  });

  it(`Should can handle the error, if user doesn't input their password`, async () => {
    const userLogged = await login({
      email: "test@gmail.com",
    });
    expect(userLogged.status).toEqual(422);
    expect(userLogged.body).toEqual({
      success: false,
      message:
        "Password Required: Your Password is required to perform this action",
      error: { password: "Password Required" },
    });
  });

  it(`Should can handle the error, if user doesn't input their valid email address`, async () => {
    const userLogged = await login({
      email: "tes",
      password: "test123",
    });
    expect(userLogged.body).toEqual({
      success: false,
      message: "Emai Invalid: Your email is invalid",
      error: { email: "Email Invalid" },
    });
  });

  it(`Should can handle the error, if user input wrong email and correct password`, async () => {
    const userLogged = await login({
      email: "test123@gmail.com",
      password: "test123",
    });
    // console.log(userLogged.body)
    expect(userLogged.status).toEqual(401);
    expect(userLogged.body).toEqual({
      success: false,
      message: "Login failed, email is not registered",
    });
  });
});
