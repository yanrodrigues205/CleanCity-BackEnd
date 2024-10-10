interface CollectPoint
{
    id: string;
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    workHours_id:string;
    collectUser_id:string;
    street:string;
    city:string;
    country:string;
    state:string;
    address_number:string;
    created_at:string;
    disabled_at: string;
    updated_at:string;
}

export default CollectPoint;