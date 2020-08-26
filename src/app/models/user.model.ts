export class User {
    public status: number;
    public companyId: number;
    public companyType: number;
    public permissions: number[];
    public userId: string;
    public isNeedChangePassword: boolean;
    public avatarUrl: string;
    public userConfigurations: { name: string, value: string }[];
    //public mobileUserSetting: { name: string, value: string }[];
    //public hostConfigurations: { name: string, value: string }[];
    public timeServer: Date;
    public accessToken: string;
    public subCustomer: number;
    public isNewUser: boolean;
    public isNeededOtp: boolean;
    public xnCode: number;
    public userName: string;
    public fullName: string;
    public phoneNumber: string;
    public userType: number;
    public tokenExpirationDate: Date;
    constructor(data: any) {
        this.status = +data[0];
        this.companyId = +data[1];
        this.companyType = +data[2];
        this.permissions = data[3];
        this.userId = data[4];
        this.isNeedChangePassword = data[5];
        this.avatarUrl = data[6];
        this.userConfigurations = data[7];
        //this.mobileUserSetting = data[8];
        //this.hostConfigurations = data[9];
        this.timeServer = data[8];
        this.accessToken = data[9];
        this.subCustomer = +data[10];
        this.isNewUser = data[11];
        this.isNeededOtp = data[12];
        this.xnCode = +data[13];
        this.userName = data[14];
        this.fullName = data[15];
        this.phoneNumber = data[16];
        this.userType = +data[17];
    }
    get token() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
        return this.accessToken;
    }
}
