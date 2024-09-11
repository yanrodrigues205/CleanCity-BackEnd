import { database } from "../Database/Connection";
import MailerService from "../Services/MailerService";
import generateOTP from "../Services/OPTService";
import OTP from "../@Types/OTP";
export default class TwoFactorsModel extends MailerService {
  constructor() {
    super();
  }
  protected async create(email: string, user_id: string): Promise<OTP | false> {
    let opt: string = generateOTP();
    let now = new Date();
    let expiry = new Date(now.getTime() + 10 * 60000);
    super.setEmail(email);
    super.setSubject("CÓDIGO DE ACESSO AO SISTEMA - Clean City");
    super.setBody(`Este código é referente a sua tentativa de authenticação no sistema: <strong>${opt}</strong>`);
    try {
      await super.sendMailer();
      const insert: OTP = await database.twoFactors.create({
        data: {
          user_id: user_id,
          expiry: expiry,
          OPT: opt,
          verify: false
        },
        select: {
          id: true,
          expiry: true
        }
      });
      return insert ? insert : false;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
  protected async verify(id_receiver: string, OTP_receiver: string): Promise<boolean> {
    try {
      let today = new Date();
      const verify = await database.twoFactors.findUnique({
        where: {
          id: id_receiver
        }
      });
      if (verify!.expiry >= today) {
        console.log("esta no tempo")
      }
      if (verify && verify.OPT == OTP_receiver && verify.expiry >= today) {
        const update = await database.twoFactors.update({
          where: {
            id: id_receiver
          },
          data: {
            verify: true
          }
        });
        return update ? true : false;
      }
      else {
        return false;
      }
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }
}