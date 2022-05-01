const MarketModel = require("../models/Market");
const UserModel = require("../models/Users");
const {
  createMarket,
  getAll,
  getOne,
  deleteMarket,
  updateMarket,
} = require("./helper/market.helper");
const { register, login } = require("./helper/auth.helper");

describe("POST /markets - User Create Market Endpoint", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await MarketModel.deleteMany();
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

  it("Should be able to create a new Market", async () => {
    const result = await createMarket(
      {
        name: "market 1",
      },
      userLogin.accessToken
    );
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: "Success created market..",
      data: result.body.data,
    });
  });
});

describe("GET /markets - Get all of Market Endpoint", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await MarketModel.deleteMany();
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

  beforeAll(async () => {
    const result = await createMarket(
      {
        name: "market 1",
      },
      userLogin.accessToken
    );
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: "Success created market..",
      data: result.body.data,
    });
  });

  beforeAll(async () => {
    const result = await createMarket(
      {
        name: "market 2",
      },
      userLogin.accessToken
    );
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: "Success created market..",
      data: result.body.data,
    });
  });

  it("Should be able to get all of market", async () => {
    const result = await getAll(userLogin.accessToken);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({
      success: true,
      message: "Success find all markets",
      marketsID: result.body.marketsID,
      data: result.body.data,
    });
  });
});

describe("GEt /markets/:id - Get one of Market Endpoint", () => {
  let userLogin = null;
  let market = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await MarketModel.deleteMany();
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

  beforeAll(async () => {
    const result = await createMarket(
      {
        name: "market 1",
      },
      userLogin.accessToken
    );
    market = result.body.data
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: "Success created market..",
      data: result.body.data,
    });
  });

  it("Should be able to get one of market", async () => {
    let marketID = market._id
    const result = await getOne(marketID, userLogin.accessToken)
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Success find market with id : ${marketID}`,
      data: result.body.data,
    });
  });
});

describe("DELETE /markets/:id - Delete Market Endpoint", () => {
    let userLogin = null;
    let market = null;
    afterEach(async () => {
      await UserModel.deleteMany();
    });
    afterEach(async () => {
      await MarketModel.deleteMany();
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
  
    beforeAll(async () => {
      const result = await createMarket(
        {
          name: "market 1",
        },
        userLogin.accessToken
      );
      market = result.body.data
      expect(result.status).toEqual(201);
      expect(result.body).toEqual({
        success: true,
        message: "Success created market..",
        data: result.body.data,
      });
    });
  
    it("Should be able to delete market by id", async () => {
      let marketID = market._id
      const result = await deleteMarket(marketID, userLogin.accessToken);
      expect(result.status).toEqual(201);
      expect(result.body).toEqual({
        success: true,
        message: `Success deleting market with id : ${marketID}`,
      });
    });
  });

  describe("PUT /markets/:id - Update Market Endpoint", () => {
    let userLogin = null;
    let market = null;
    afterEach(async () => {
      await UserModel.deleteMany();
    });
    afterEach(async () => {
      await MarketModel.deleteMany();
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
  
    beforeAll(async () => {
      const result = await createMarket(
        {
          name: "market 1",
        },
        userLogin.accessToken
      );
      market = result.body.data
      expect(result.status).toEqual(201);
      expect(result.body).toEqual({
        success: true,
        message: "Success created market..",
        data: result.body.data,
      });
    });
  
    it("Should be able to update market by id", async () => {
      let marketID = market._id
      let name = {name: 'new name'}
      const result = await updateMarket(marketID, name, userLogin.accessToken);
      expect(result.status).toEqual(201);
      expect(result.body).toEqual({
        success: true,
        message: `Success updating market with id : ${marketID}`,
        data: result.body.data
      });
    });
  });
