import { WasteClassificationTypes, UnitOfMeasureTypes } from "@prisma/client";
interface Wastes
{
    id : string;
    type : string;
    description : string;
    classification : WasteClassificationTypes;
    unit_of_measure : UnitOfMeasureTypes;
    value : string;
    collectUser_id : string;
    created_at : Date;
    disabled_at : Date;
    updated_at : Date;
}

export default Wastes;