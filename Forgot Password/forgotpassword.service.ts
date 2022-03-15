import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { ForgotPasswordRepository } from "./forgotpassword.repository";
require("dotenv").config();



export class ForgotPasswordService {
  public constructor(private readonly forgotpasswordRepository: ForgotPasswordRepository) {
    this.forgotpasswordRepository = forgotpasswordRepository;
  }

  public async getUserByEmail(userEmail:string):Promise<User|null>{
    return this.forgotpasswordRepository.getUserByEmail(userEmail);
  }


  public createData(userEmail:string, link:string): typeof temp{
    const temp = {
        from: 'support_helperland@gmail.com',
        to: userEmail,
        subject: 'Reset Password link',
        html: `<h2>Please click here to reset your password</h2>
              <a href="${process.env.Company_URL}/reset/${link}">Please click here to reset your password</a>`
    }
    return temp;
  }

  public createToken(userEmail:string):string{
      const token = jwt.sign({userEmail},process.env.FORGOT_PASSWORD!,{expiresIn:'1h'});
      return token;
  }

  public async updateUser(userPassword:string, userEmail:string):Promise<[number, User[]]>{
    return this.forgotpasswordRepository.updateUser(userPassword, userEmail);
}
}