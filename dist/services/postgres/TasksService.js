const { UserModel, ArticleModel } = require('../../models');
const bcrypt = require("bcrypt");
const { nanoid } = require('nanoid');

const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');


class UsersService {
    constructor(StorageService){
        this._StorageService = StorageService;
        this._User = UserModel;
        this._Article = ArticleModel;

        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    async createUser ({ name, email, password, role }) {
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

    async updateUser({name, about}, profilePicture, userUuid){
        const user = await this.getUserByUuid(userUuid);

        user.name = name;
        user.about = about;
        
        if(profilePicture != null){
            this._StorageService.deleteFileByFileName(user.profilePicture);
            user.profilePicture = `/uploads/${profilePicture}`;
        }
       
        await user.save();
    }

    async updatePassword(userUuid, oldPassword, newPassword){
        const user = await this.getUserByUuid(userUuid);

        // hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.hashed = hashedPassword;

        await user.save();
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

    async verifyUserByUuid (uuid) {
        const user = await this._User.findOne({
            where: {uuid},
            raw: true
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

    async userLogin ({email, password}) { 
        const user = await this._User.findOne({
            where: {email: email},
            raw: true
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
    
    async userDashboard (uuid) {
        const userArticles = await User.findOne({
            where: {
                uuid: uuid
            },
            include : [{        
                model: this._Article,
                required: true,
                right: false,
            }],
            raw: true  
        })
    
        return userArticles;
    }

    async getUserAndArticlesByUuid(uuid){
        const user = this._User.findOne({
            where: {uuid},
            order: [
                [{ model: this._Article, as: 'articles' }, 'createdAt', 'DESC' ]
            ],
            include:[{
                model: this._Article,
                as: 'articles'
            }]
        })

        return user;
    }

    async getAllUsers({limit, createdAt, role, status}){
        if(!limit || !createdAt || !role || !status){
            return [];
        }

        if(role!='admin' && role!='writer' && role!='reader'){
            role = ['admin', 'writer', 'reader']
        }

        createdAt = createdAt=='newest'? 'DESC': 'ASC';

        const users = await this._User.findAll({
            where: {
                role
            },
            order: [['role', createdAt]],
            limit: limit,
        })

        return users;
    }

    async updateUserRole(uuid, role){
        const user = await this.getUserByUuid(uuid);

        user.role = role;

        user.save();
    }
}

module.exports = UsersService;