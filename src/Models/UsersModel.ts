import Users from "../Dtos/User";
import { hash } from "bcryptjs";
import { database } from "../Database/Connection";
export default class UsersModel {
  protected async emailExists(email: string): Promise<boolean> {
    try {
      const verify = await database.users.findUnique({
        where: { email: email }
      });
      return verify ? true : false;
    }
    catch (err) {
      console.log(err);
      return false;
    }
  }
  protected async insert(user: Users): Promise<boolean> {
    try {
      let cryptPass = await hash(user.password, 10);
      const createUser = await database.users.create({
        data: {
          name: user.name,
          email: user.email,
          password: cryptPass
        }
      });
      return createUser ? true : false;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
  protected async updateCollectUser(collectUser_id: string, user_id: string) {
    try {
      const updateUser = await database.users.update({
        where: {
          id: user_id
        },
        data: {
          collectUser_id
        }
      });
      return updateUser ? true : false;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
}