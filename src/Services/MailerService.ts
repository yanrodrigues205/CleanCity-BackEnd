import transport from "../Config/MailerConfig";
export default class MailerService {
  private _email: string;
  private _subject: string;
  private _body: string;
  constructor() {
    this._email = "";
    this._subject = "";
    this._body = "";
  }
  protected async sendMailer() {
    if (this._email.length == 0 || this._subject.length == 0 || this._body.length == 0) {
      console.error("Set the email, text and subject properties to complete the sending!");
      return false;
    }
    let mailerOptions = {
      from: process.env.SMTP_MAIL,
      to: this._email,
      subject: this._subject,
      html: this._body
    };
    let return1 = await transport.sendMail(mailerOptions, (err, result) => {
      if (err) {
        console.error("Error sending mail: " + err);
        return false;
      }
      console.log("Sent mail: " + result.response);
      return true;
    });
    return return1;
  }
  protected setEmail(email: string) {
    this._email = email;
  }
  protected setSubject(subject: string) {
    this._subject = subject;
  }
  protected setBody(text: string) {
    this._body = text;
  }
}