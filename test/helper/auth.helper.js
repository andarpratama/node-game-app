const request = require("supertest");
const APP = require("../../app");

const login = async (user) => {
  const userRegistered = await request(APP).post("/auth/login").send(user);
  return userRegistered;
};

const register = async (user) => {
  const userLogged = await request(APP).post("/auth/register").send(user);
  return userLogged;
};

module.exports = { login, register };
