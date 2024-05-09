export default class VerifyHour
{
    constructor()
    {

    }

    public static isCorrect(value: string): boolean
    {
        const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

        if(regex.test(value))
            return true;
        else
            return false;
    }
}