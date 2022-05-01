const request = require("supertest");
const APP = require("../../app");

const updateMarket = async (id, name, token) => {
    const result = await request(APP)
        .put(`/markets/${id}`)
        .set({
            "access_token": token
        })
        .send(name);
    return result;
}

const deleteMarket = async (id, token) => {
    const result = await request(APP)
        .delete(`/markets/${id}`)
        .set({
            "access_token": token
        })
    return result;
}

const getOne = async (id, token) => {
    const result = await request(APP)
        .get(`/markets/${id}`)
        .set({
            "access_token": token
        })
    return result
}

const createMarket = async (name, token) => {
    const result = await request(APP)
        .post('/markets')
        .set({
            "access_token": token
        })
        .send(name);
    return result;
};

const getAll = async (token) => {
    const result = await request(APP)
        .get('/markets')
        .set({
            "access_token": token
        })
    return result;
}

module.exports = { createMarket, getAll, getOne, deleteMarket, updateMarket };