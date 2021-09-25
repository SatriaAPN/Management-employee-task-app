const { UserModel, TaskModel } = require('../../models');
const bcrypt = require("bcrypt");
const { nanoid } = require('nanoid');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');


class UsersService {
    constructor(StorageService){
        this._StorageService = StorageService;

        this._User = UserModel;
        this._Task = TaskModel;
    }

    async createUser (name, email, password, role) {
        // Checking if the email already registered
        await this.verifyEmail(email);

        // hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user in the database
        const user = await this._User.create({
            uuid: nanoid(16),
            name: name,
            email: email,
            hashed: hashedPassword,
            role: role
        });

        // returning the data
        return user;
    }

    async userLogin(email, password) { 
        const user = await this._User.findOne({
            where: { email }
        });

        if(!user){
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }

        // check if the password are the same
        const checkPassword = await bcrypt.compare(password, user.hashed);
        if(checkPassword){
            return user;
        }else{
            throw new AuthenticationError('Kredensial yang Anda berikan salah');
        }
    }
 
    async verifyEmail(email){
        const userFound = await this._User.findOne({
            where: { email }
        });

        if(userFound){
            throw new InvariantError(
                'Gagal menambahkan user. email sudah digunakan.',
            );
        }
    }

    async getUserWithTasks(uuid){
        const user = await this._User.findOne({
            where: { uuid },
            include : [{        
                model: this._Task,
                as: "tasks"
            }],
        })

        return user;
    }

    async verifyUserByUuid (uuid) {
        const user = await this._User.findOne({
            where: { uuid }
        })

        if(!user){
            throw new AuthenticationError('user did not found');
        }
    }

    async verifyUserByUuidAndPass(uuid, password){
        const user = await this._User.findOne({
            where: {uuid},
            raw: true
        });

        if(!user){
            throw new AuthenticationError('user tidak ditemukan');
        }

        // check if the password are the same
        const checkPassword = await bcrypt.compare(password, user.hashed);
        if(!checkPassword){
            throw new AuthenticationError('the password that you input is wrong');
        }
    }

    async getUserByUuid (uuid) {
        const user = await this._User.findOne({
            where: {uuid}
        })

        if (!user) {
            throw new AuthenticationError('User tidak ditemukan');
        }
      
        return user;
    }
}

module.exports = UsersService;