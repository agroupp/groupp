import { ObjectId } from 'mongodb';

export interface MongoStorageObject {
  _id: ObjectId;
  created: number;
}
