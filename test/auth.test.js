const UserModel = require("../models/Users");
const {register} = require("./helper/auth.helper")

describe('POST /auth/register - User Registration Endpoint', () => {
    afterEach(async () => {
        await UserModel.deleteMany();
    });
    it('Should be able to register', async () => {
        const userRegistered = await register({
            name: 'Test',
            email: 'test@gmail.com',
            password: 'test123'
        });
        expect(userRegistered.status).toEqual(201);
        expect(userRegistered.body).toEqual({
            success: true,
            message: 'Success Registration',
            data: userRegistered.body.data
        });
    });
})