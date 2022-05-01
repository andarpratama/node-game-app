const FarmModel = require("../models/Farm");
const UserModel = require("../models/Users");
const { createFarm, getAll, getOne, deleteFarm, updateFarm } = require("./helper/farm.helper");
const { register, login } = require("./helper/auth.helper");

describe("POST /farms - User Create Farm Endpoint", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await FarmModel.deleteMany();
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
    userLogin = userLogged.body
  });

  it("Should be able to create a new Farm", async () => {
    const newFarm = await createFarm({
      name: "farm 1"
    }, userLogin.accessToken)
    expect(newFarm.status).toEqual(201);
    expect(newFarm.body).toEqual({
      success: true,
      message: 'Success creating new Farm',
      data: newFarm.body.data
    })
  });

  
});

describe("GET /farms - Get All the Farm", () => {
  let userLogin = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await FarmModel.deleteMany();
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
    userLogin = userLogged.body
  });

  beforeAll(async () => {
    const newFarm = await createFarm({
      name: "farm 1"
    }, userLogin.accessToken)
    expect(newFarm.status).toEqual(201);
    expect(newFarm.body).toEqual({
      success: true,
      message: 'Success creating new Farm',
      data: newFarm.body.data
    })
  })


  it("Should be able to get all the farm", async () => {
    const foundFarm = await getAll(userLogin.accessToken)
    expect(foundFarm.status).toEqual(201);
    expect(foundFarm.body).toEqual({
      succes: true,
      message: 'Success find all farms',
      data: foundFarm.body.data
    })
  })
})

describe("GET /farms/id - Get One of Farm", () => {
  let userLogin = null;
  let farm = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await FarmModel.deleteMany();
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
    userLogin = userLogged.body
  });

  beforeAll(async () => {
    const newFarm = await createFarm({
      name: "farm 1"
    }, userLogin.accessToken)
    expect(newFarm.status).toEqual(201);
    expect(newFarm.body).toEqual({
      success: true,
      message: 'Success creating new Farm',
      data: newFarm.body.data
    })
    farm = newFarm.body
  })

  it("Should be able to get one of farm", async () => {
    let farmId = farm.data._id
    let token = userLogin.accessToken
    const result = await getOne(farmId, token);
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Success find farm with id : ${farmId}`,
      data: result.body.data
    })
  })
})

describe("DELETE /farms/id - Delete Farm with ID", () => {
  let userLogin = null;
  let farm = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await FarmModel.deleteMany();
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
    userLogin = userLogged.body
  });

  beforeAll(async () => {
    const newFarm = await createFarm({
      name: "farm 1"
    }, userLogin.accessToken)
    expect(newFarm.status).toEqual(201);
    expect(newFarm.body).toEqual({
      success: true,
      message: 'Success creating new Farm',
      data: newFarm.body.data
    })
    farm = newFarm.body
  })

  it("Should be able to delete farm with id", async () => {
    let farmId = farm.data._id
    let token = userLogin.accessToken
    const result = await deleteFarm(farmId, token);
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Success deleted farm with id : ${farmId}`
    })
  })
})

describe("PUT /farms/id - Update Farm with ID", () => {
  let userLogin = null;
  let farm = null;
  afterEach(async () => {
    await UserModel.deleteMany();
  });
  afterEach(async () => {
    await FarmModel.deleteMany();
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
    userLogin = userLogged.body
  });

  beforeAll(async () => {
    const newFarm = await createFarm({
      name: "farm 1"
    }, userLogin.accessToken)
    expect(newFarm.status).toEqual(201);
    expect(newFarm.body).toEqual({
      success: true,
      message: 'Success creating new Farm',
      data: newFarm.body.data
    })
    farm = newFarm.body
  })

  it("Should be able to update farm with id", async () => {
    let farmId = farm.data._id
    let token = userLogin.accessToken
    const result = await updateFarm(farmId, {name: 'newName'}, token);
    expect(result.status).toEqual(201);
    expect(result.body).toEqual({
      success: true,
      message: `Success updated farm with id : ${farmId}`,
      data: result.body.data
    })
  })
})
