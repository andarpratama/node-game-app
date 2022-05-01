const request = require("supertest");
const APP = require("../../app");

const updateUser = async (id, data, token) => {
    const result = await request(APP)
        .put(`/users/${id}`)
        .set({
            "access_token": token
        })
        .send(data)
    return result
}

const detailUser = async (token) => {
    const result = await request(APP)
        .get('/users/detail')
        .set({
            "access_token": token
        })
    return result;
}

const getAll = async (token) => {
    const result = await request(APP)
        .get('/users')
        .set({
            "access_token": token
        })
    return result;
}

module.exports = { getAll, detailUser, updateUser };