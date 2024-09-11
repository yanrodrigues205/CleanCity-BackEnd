export default class VerifyHour {
  public static isCorrect(value: string): boolean {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(value);
  }
}