import {LoginModel} from "../../Model/LoginModel";
import {UserRepo} from "../../Database/Repos";
import {ActionResultModel} from "../../Model/ActionResultModel";
import { Guid } from "guid-typescript";


export class AccountService{
    public async Login(login: string, password: string): Promise<LoginModel | ActionResultModel>{
        try{
            const user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(!user){
                return new ActionResultModel("404", "user with this login dont found")
            }

            if(user.password !== password){
                return new ActionResultModel("401", "bad password")
            }

            const newToken = this.GenerateToken();

            user.token = newToken

            await user.save()

            return new LoginModel(true,  newToken)
        }catch{
            return new ActionResultModel("401", "cant login into this account")
        }
    }

    public async Register(firstName: string, secondName: string, login: string, password: string): Promise<boolean | ActionResultModel>{
        try{
            const _user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(_user){
                return new ActionResultModel("303", "account with this login already exist")
            }

            const user = UserRepo.create({
                firstName: firstName,
                secondName: secondName,
                login: login,
                password: password
            })

            await user.save()

            return true
        }catch{
            return false
        }
    }

    private GenerateToken(): string{
        return Guid.create().toString()
    }
}