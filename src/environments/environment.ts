export const environment = {
  production: false,
  api:{
    loginRoute: 'http://192.168.1.48:9001/api/v2/authentication/login',

    languageApi:'http://192.168.1.48:9004/api/v1/language', // Link đến API ngôn ngữ
    cultureApi:'http://192.168.1.48:9004/api/v1/culture', // Link đến API ngôn ngữ
    appTypeApi:'http://192.168.1.48:9004/api/v1/language/appType', // Link đến API ngôn ngữ
    userApi:'http://192.168.1.48:9004/api/v1/language/user', // Link đến API ngôn ngữ
  },
  errorList: ["Cannot insert duplicate key in object"],
  regex: /^[^<>]*$/  
};
