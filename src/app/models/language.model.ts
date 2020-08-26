import { User } from './user.model';

export class LanguageObject {
  constructor(
    public languageTypeId: number,
    public name: string,
    public appID: number,
    public value: string,
    public created: Date,
    public createdUser: string,
    public updated: Date,
    public updatedUser: string,
    public isActive: boolean = true,
    public version: number = 1
  ) {}
}