const request = require("supertest");
const APP = require("../../app");

// const updateFarm = async (id, name, token) => {
//     const result = await request(APP)
//         .put(`/farms/${id}`)
//         .set({
//             "access_token": token
//         })
//         .send(name);
//     return result;
// }

// const deleteFarm = async (id, token) => {
//     const result = await request(APP)
//         .delete(`/farms/${id}`)
//         .set({
//             "access_token": token
//         })
//     return result;
// }

// const getOne = async (id, token) => {
//     const result = await request(APP)
//         .get(`/farms/${id}`)
//         .set({
//             "access_token": token
//         })
//     return result
// }

// const createFarm = async (name, token) => {
//     const result = await request(APP)
//         .post('/farms')
//         .set({
//             "access_token": token
//         })
//         .send(name);
//     return result;
// };

const updateUser = async (id, data, token) => {
    // console.log("id : " + id)
    // console.log(data)
    // console.log(token)
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