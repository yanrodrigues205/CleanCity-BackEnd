import { WasteClassificationTypes, UnitOfMeasureTypes } from "@prisma/client";

interface WastesDTO
{
    readonly type : string;
    readonly description : string;
    classification : WasteClassificationTypes;
    unit_of_measure : UnitOfMeasureTypes;
    readonly value : string;
    collectUser_id : string;
}

export default WastesDTO;