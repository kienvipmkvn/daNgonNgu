export const environment = {
  appName: 'gps-client-angular',
  env: 'local',
  production: false,
  endpoints: {
    elasticSearchEndpoint: 'http://192.168.1.57:19200/',
    logIndex:'index_gps_v3',
    logType:'_doc'
  },
  api:{
    baseUrl: 'http://api.bagroup.vn',
    loginRoute: 'http://api.bagroup.vn/api/v3/authentcation/loginaccount',
    signalR: {
      urlBase: 'https://signalr.bagroup.vn:8656',
      hub: 'GPSMobileHub',
      method: 'sendCarSignalR',
      groups: 'JoinGroupByVehicleId'
    },
    languageApi:'https://windy-raceway-260816.firebaseio.com/language/', // Link đến API ngôn ngữ
    landmarkCategory: 'api/landmarkcategory/getalllandmarkcategorybyuserid', // Guid userID
    landmarkByCategory: 'api/landmark/getlandmarkbycategory', // string listLandmarksCategory là danh sách cách nhau = dấu ,
    vehicles: 'api/v2/vehicles/getlistvehicleonline', // Guid userId, int vehicleGroupID
    vehicleGroups: 'api/vehicles/getlistgroups',  // int companyID, Guid userID
    vehicleDetail: 'api/v2/vehicles/getvehicledetail', // Guid UserId, string vehiclePlate, long vehicleID
    alertCount: 'api/v2/alerts/countalert',  // Guid userID
    listAlerts: 'api/alerts/getalert', // AlertGetRequestModel AlertModel
    listAlertType: 'api/alerts/getalerttype', // Guid userID, string cultureName
    getAddressByLatLng: 'api/geocode/getaddressbylatlng', // string lat, string lng
    feeOfVehicles: 'api/vehicles/getallvehiclefree', // Guid userID
    overdueFeeOfVehicles: 'api/vehicles/getlistexpired', // Guid userID
    numberVehicleOverdueFee: 'api/vehicles/countexpired', // Guid userID
    getListCompanyByParent: 'api/vehicles/getlistcompanyid', // int companyID, Guid userID
    getTimeServer: 'api/ping/timeserver', // none param
    handleAlert: 'api/alerts/handlealert', // StatusAlertRequest
  },
  regex: /^[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/  
};
