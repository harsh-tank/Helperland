import bcrypt from 'bcrypt';
import { User } from "../models/user";
import { LoginRepository } from "./login.repository";
import jwt from "jsonwebtoken";

export class LoginService {
    public constructor(private readonly loginRepository: LoginRepository) {
      this.loginRepository = loginRepository;
    }
  
    public async getUserByEmail(userEmail: string): Promise<User | null> {
      return this.loginRepository.getUserByEmail(userEmail);
    }
  
    public async matchPassword(loginPassword:string,Password:string):Promise<boolean>{
      const Confirm = await bcrypt.compare(loginPassword, Password);
      return Confirm;
    }

    public CheckisRegistered(user:User){
      return user.IsRegisteredUser; 
    }
  
    public createToken(userEmail:string):string{
      const token = jwt.sign({userEmail},process.env.SECRET!,{expiresIn:'3h'});
      return token;
    }
  
  }