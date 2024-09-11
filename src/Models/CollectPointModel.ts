import { database } from "../Database/Connection";
import collectPoint from "../Dtos/CollectPoint";
export default class CollectPointModel {
  protected async insert(collectPoint: collectPoint): Promise<boolean | object> {
    try {
      const insert = await database.collectPoint.create({
        data: {
          name: collectPoint.name,
          description: collectPoint.description,
          collectUser_id: collectPoint.collectUser_id,
          workHours_id: collectPoint.workHours_id
        },
        select: {
          id: true
        }
      });
      return insert ? insert : false;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  }
}