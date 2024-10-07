import { WasteClassificationTypes } from "@prisma/client";

export default class WasteClassificationService
{
    private readonly _wasteClassification : typeof WasteClassificationTypes;
    private _value : string | null;

    constructor(value : string | null = null)
    {
        this._wasteClassification = WasteClassificationTypes;
        this._value = value;
    }

    public setValue(value : string) : void
    {
        this._value = value;
    }

    public isValid() : false | WasteClassificationTypes
    {
        if(!this._value)
        {
            return false;
        }

        const validValue = Object.values(this._wasteClassification).find((unit) => unit === this._value ) as WasteClassificationTypes | false;

        return validValue || false;
    }
}