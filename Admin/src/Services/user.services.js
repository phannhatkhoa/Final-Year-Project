const { ObjectId } = require('mongodb');
const TokenManager = require('../Utils/token');
const databaseServices = require('./database.connect');
const passwordHash = require('password-hash');
const tokenManager = require('../Utils/token');

class UserServices {
    async userRegister(body) {
        try {
            const { email, password, full_name, date_of_birth, location, role } = body;
            const hashedPassword = passwordHash.generate(password);

            const newUser = {
                email,
                password: hashedPassword,
                full_name,
                date_of_birth,
                location,
                role
            };

            await databaseServices.userCollection.insertOne(newUser);
            const signToken = tokenManager.generateTokens(newUser);
            const decodedToken = tokenManager.decryptAccessToken(signToken.accessToken);
            const user = {
                id: decodedToken.id,
                email: decodedToken.email,
                full_name: decodedToken.full_name,
                role: decodedToken.role
            };

            return { ...signToken, user };
        } catch (error) {
            console.error('Error during registration:', error.message);
            return null;
        }
    }

    async userLogin(email, password) {
        try {
            const userExist = await databaseServices.userCollection.findOne({ email: email });
            if (!userExist) {
                throw new Error('User not found or invalid credentials.');
            }
            const isPasswordValid = await passwordHash.verify(password, userExist.password);
            if (!isPasswordValid) {
                throw new Error('User not found or invalid credentials.');
            }
            const signToken = tokenManager.generateTokens(userExist);
            const decodedToken = tokenManager.decryptAccessToken(signToken.accessToken);
            const user = {
                id: decodedToken.id,
                email: decodedToken.email,
                full_name: decodedToken.full_name,
                role: decodedToken.role
            };

            return { ...signToken, user };
        } catch (error) {
            console.error('Error during login:', error.message);
            return null;
        }
    }

    async userProfile(id) {
        try {
            const user = await databaseServices.userCollection.findOne({ _id: new ObjectId(id) });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error during login:', error.message);
            return null;
        }
    }
    async updateProfile(id, updatedData) {
        try {
            await databaseServices.userCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            return { message: 'Profile updated successfully' };
        } catch (error) {
            console.error('Error during profile update:', error.message);
            return null;
        }
    }

    async updateUser (id, updatedData) {
        try {
            await databaseServices.userCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            return { message: 'User updated successfully' };
        } catch (error) {
            console.error('Error during user update:', error.message);
            return null;
        }
    }
}

const userServices = new UserServices();
module.exports = userServices;