import { User } from './user.model';

export class LanguageObject {
  constructor(
    public id: string,
    public culture: string,
    public key: string,
    public value: string,
    public createdDate: Date,
    public createdUser: User,
    public updatedDate: Date,
    public updatedUser: User,
  ) {}
}