import { UnitOfMeasureTypes } from "@prisma/client";
export default class UnitOfMeasureService
{
    private readonly _unitOfMeasure : typeof UnitOfMeasureTypes;
    private _value : string | null;

    constructor(value : string | null = null)
    {
        this._unitOfMeasure = UnitOfMeasureTypes;
        this._value = value;
    }

    public setValue(value : string) : void
    {
        this._value = value;
    }

    public isValid() : false | UnitOfMeasureTypes
    {
        if(!this._value)
        {
            return false;
        }

        const validValue = Object.values(this._unitOfMeasure).find((unit) => unit === this._value ) as UnitOfMeasureTypes | false;

        return validValue || false;
    }
}