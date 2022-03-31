import moment from "moment";
import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { Rating } from "../../models/rating";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { upd_SR_data , Print_Req_Data , filter_features } from "./request_handle";
import { ServiceRequestsRepository } from "./servicerequests.repository";

export class ServiceRequestsService {
    public constructor(private readonly serviceRequestsRepository: ServiceRequestsRepository) { 
          this.serviceRequestsRepository = serviceRequestsRepository; 
        }

        public async show_ser_duration(ser_Req:ServiceRequest):Promise<string>{

            const sTList = ser_Req.ServiceStartTime.toString().split(':');
            const startTime = sTList[0]+":"+sTList[1]
            if(sTList[1] === "30"){sTList[1] = "0.5"
            }
            else{sTList[1] = "0"
            }
            const endTimeVal = parseFloat(sTList[0]) + parseFloat(sTList[1]) + ser_Req.ServiceHours + ser_Req.ExtraHours;
            const eTList = endTimeVal.toString().split('.');
            if(eTList[1] === '5'){eTList[1] = '30'
            }
            else{eTList[1] = '00'
            }
            const Req_duration = startTime+" - "+eTList[0]+":"+eTList[1];
            return Req_duration;
          } 

        public async give_string_status(status:number):Promise<string | null>{
            let String_st:(string | null);
            if(status === null){String_st = null;
            }
            else if(status === 1){String_st = 'New';
            }
            else if(status === 2){String_st = 'Pending';
            }
            else if(status === 3){String_st = 'Completed';
            }
            else if(status === 4){String_st = 'Cancelled';
            }
            else if(status === 5){String_st = 'Refunded';
            }
            else{String_st = 'Invalid Status';
            }
            return String_st;
          }
      

        public async getAllSR(): Promise<Print_Req_Data[] | null> {
            let Print_Req:Print_Req_Data[] = [];
            let provider:(User | null);
            let ratings:(Rating | null);
            const ser_Req = await this.serviceRequestsRepository.getAllSR();
            if(ser_Req && ser_Req.length>0){
              for(let x in ser_Req){
                const customer = await this.serviceRequestsRepository.getUserInfoById(ser_Req[x].UserId);
                const address = await this.serviceRequestsRepository.get_SR_Address(ser_Req[x].ServiceRequestId);
                if(ser_Req[x].ServiceProviderId){
                    provider = await this.serviceRequestsRepository.getUserInfoById(ser_Req[x].ServiceProviderId);
                }else{
                    provider = null
                }
      
                if(provider){
                  ratings = await this.serviceRequestsRepository.getRatings(customer?.UserId!, provider.UserId, ser_Req[x].ServiceRequestId
                  );
                }else{
                  ratings = null
                }
                const time = await this.show_ser_duration(ser_Req[x]);
                const status = await this.give_string_status(ser_Req[x].Status);
      
                Print_Req.push({
                  ServiceId: ser_Req[x].ServiceRequestId,
                  ServiceDate: {
                    Date: ser_Req[x].ServiceStartDate.toString().split('-').reverse().join('/'),
                    Time: time
                  },
                  CustomerDetails: {
                    Name: customer?.FirstName +" "+ customer?.LastName,UserId: customer?.UserId!,
                    Address: {
                      StreetName  :   address?.AddressLine1,
                      HouseNumber :   address?.AddressLine2,
                      PostalCode  :   address?.PostalCode,
                      City        :   address?.City
                    }
                  },
                  ServiceProvider: {
                    Name: provider?.FirstName +" "+ provider?.LastName,ServiceProviderId: provider?.UserId!,
                    ProfilePicture: provider?.UserProfilePicture,Ratings: ratings?.Ratings
                  },
                  GrossAmount: ser_Req[x].TotalCost,
                  NetAmount: ser_Req[x].TotalCost,
                  Discount: ser_Req[x].Discount,
                  Status: status,
                  PaymentStatus: ser_Req[x].PaymentDone,
                  HasIssue: ser_Req[x].HasIssue
                })
              }
              const format_data = Print_Req.sort(function(a,b){ return a.ServiceId - b.ServiceId;});
              return format_data;
            }else{
              return null;
            }
          }

          public async getSRById(req_Id:string){
            return this.serviceRequestsRepository.getSRById(+req_Id);
          }

          public SendEmail_for_Add_Upd(userEmail:string, address:upd_SR_data): typeof data
            {
            const data = {
                from: 'no_reply_helperland@gmail.com',
                to: userEmail,
                subject: 'Updated Address of SR',
                html: `
                    <h2>Address of SR with ID ${address.ServiceRequestId} has been changed by admin.</h2>
                    </br>
                    <h3>New Service Address is</h3>
                    </br>
                    <p>Street: ${address.AddressLine1}</p>
                    </br>
                    <p>House Number: ${address.AddressLine2}</p>
                    </br>
                    <p>City: ${address.City}</p>
                    </br>
                    <p>Postal Code: ${address.PostalCode}</p>
                    `
            }
            return data;
          }
      

          public async filter_feature_SR(requests:Print_Req_Data[], filters:filter_features){

            let filter_Info;
            if(filters.ServiceRequestId){
              filter_Info = requests.filter(x => {return x.ServiceId === filters.ServiceRequestId
              });
            }
      
            if(filters.Status){
              if(filter_Info){filter_Info = filter_Info.filter(x => {
                  return x.Status === filters.Status
                });
              }else{
                filter_Info = requests.filter(x => {return x.Status === filters.Status
                });
              }
            }
      
            if(filters.PostalCode){
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {return x.CustomerDetails.Address.PostalCode === filters.PostalCode
                });
              }else{
                filter_Info = requests.filter(x => {return x.CustomerDetails.Address.PostalCode === filters.PostalCode
                });
              }
            }
      
            if(filters.Cust_Name){
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {return x.CustomerDetails.Name === filters.Cust_Name
                });
              }else{
                filter_Info = requests.filter(x => {return x.CustomerDetails.Name === filters.Cust_Name
                });
              }
            }
            if(filters.SP_Name){
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {return x.ServiceProvider.Name === filters.SP_Name
                });
              }else{
                filter_Info = requests.filter(x => {return x.ServiceProvider.Name === filters.SP_Name
                });
              }
            }

            if(filters.HasIssue != null){
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {return x.HasIssue === filters.HasIssue});
              }else{
                filter_Info = requests.filter(x => {return x.HasIssue === filters.HasIssue});
              }
            }
      
            if(filters.FromDate){
              const fromDate = new Date(filters.FromDate.split('-').reverse().join('-'));
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {
                  return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate
                });
              }else{
                filter_Info = requests.filter(x => {return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate
                });
              }
            }
      
            if(filters.ToDate){
              const toDate = new Date(filters.ToDate.split('-').reverse().join('-'));
              if(filter_Info){
                filter_Info = filter_Info.filter(x => {return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) <= toDate
                });
              }else{
                filter_Info = requests.filter(x => {return new Date(x.ServiceDate.Date.split('/').reverse().join('-')) <= toDate
                });
              }
            }
      
            if(filters.Email){
              const us = await this.serviceRequestsRepository.getUserByEmail(filters.Email);
              if(us){
                if(filter_Info){
                  filter_Info = filter_Info.filter(x => {
                    return x.CustomerDetails.UserId === us.UserId || x.ServiceProvider.ServiceProviderId === us.UserId
                  });
                }else{
                  filter_Info = requests.filter(x => {
                    return x.CustomerDetails.UserId === us.UserId || x.ServiceProvider.ServiceProviderId === us.UserId
                  });
                }
              }else{
                filter_Info = [];
              }
            }
            
            return filter_Info;
      
          }

          public SendEmail_For_SR_upd(userEmail:string,address:upd_SR_data): typeof data
            {
            const data = {
                from: 'no_reply_heleperland@gmail.com',
                to: userEmail,
                subject: 'SR is now Updated and rescheduled',
                html: `
                    <h2>SR with ID ${address.ServiceRequestId} has been rescheduled and address is updated by admin.</h2>
                    </br>
                    <h3>New Address is</h3>
                    </br>
                    <p>Street: ${address.AddressLine1}</p>
                    </br>
                    <p>House Number: ${address.AddressLine2}</p>
                    </br>
                    <p>City: ${address.City}</p>
                    </br>
                    <p>Postal Code: ${address.PostalCode}</p>
                    </br>
                    <h3>Changed Time</h3>
                    <p>Date: ${address.ServiceStartDate}</p>
                    </br>
                    <h3>Changed Date</h3>
                    <p>Time: ${address.ServiceTime}</p>
                    `
            }
            return data;
          }

          public async Same_Reschedule_check(body:upd_SR_data):Promise<boolean>{
            let confirm = false;
            const ser_Req = await this.serviceRequestsRepository.getSRById(body.ServiceRequestId);
              if(ser_Req){
                const enteredDate = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
                const srDate = new Date(ser_Req.ServiceStartDate);
                if(enteredDate >srDate || enteredDate<srDate){
                  confirm = false;
                }else{
                  confirm = true;
                }
              }
              return confirm;
          }

          public async reschedule_SR(body:upd_SR_data, us_Id:string):Promise<[number,ServiceRequest[]]>{
            const SR_date = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
            const reschedule_SR = await this.serviceRequestsRepository.reschedule_SR(SR_date, body, +us_Id);
            return reschedule_SR
          }
      

          public ValidatedDate(date: string) {
            const enteredDate = new Date(date.split("/").reverse().join("-"));
            const todayDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
            if (enteredDate > todayDate) {return true;
            } 
            else {return false;
            }
          };

          public SendEmail_for_Reschedule_SR(userEmail:string,body:upd_SR_data): typeof data{
            const data = {
                from: 'no_reply_helperland@gmail.com',
                to: userEmail,
                subject: 'Reschedule SR',
                html: `
                    <h3>Service request with Service ID ${body.ServiceRequestId} has been rescheduled by admin.</h3>
                    <h3>New date and time is ${body.ServiceStartDate} and ${body.ServiceTime}</h3>
                    `
            }
            return data;
          }

          public async upd_SR(req_Id:string, us_Id:string):Promise<[number, ServiceRequest[]]>{
            return this.serviceRequestsRepository.upd_SR(+req_Id,+us_Id);
          }

          public SendEmail(userEmail:string, srId:number): typeof data{
            const data = {
                from: 'no_reply_helperland@gmail.com',
                to: userEmail,
                subject: 'Cancelled SR',
                html: `
                    <h3>Service request with Service Id ${srId} has been cancelled by admin.</h3>
                    `
            }
            return data;
          }

          public async upd_SR_Add(body:upd_SR_data):Promise<[number, ServiceRequestAddress[]] | null>{
            const req_Add = await this.serviceRequestsRepository.get_SR_Address(body.ServiceRequestId);
            let upd_Add;
            if(req_Add){
              if(req_Add.AddressLine1 === body.AddressLine1 && req_Add.AddressLine2 === body.AddressLine2 && req_Add.City === body.City && req_Add.PostalCode === body.PostalCode){
                upd_Add =  null;
              }else{
                upd_Add = await this.serviceRequestsRepository.upd_SR_Add(body);
              }
            }else{
              upd_Add =  null;
            }
            return upd_Add;
          }
      
          public async User_SP_mail(serviceRequest:ServiceRequest):Promise<string[]>{
            const mail_list:string[] = [];
            const user = await this.serviceRequestsRepository.getUserInfoById(serviceRequest.UserId);
            const SP = await this.serviceRequestsRepository.getUserInfoById(serviceRequest.ServiceProviderId);
            if(serviceRequest.UserId && user){
              mail_list.push(user.Email!);
            }
            if(serviceRequest.ServiceProviderId && SP){
              mail_list.push(SP.Email!);
            }
            return mail_list;
          }

          public async Return_refund(srId:number, rf:number, us_Id:number):Promise<[number, ServiceRequest[]] | null>{
            const ser_Req = await this.serviceRequestsRepository.getSRDetailById(srId);
            if(ser_Req && ser_Req.HasIssue === true ){
              return this.serviceRequestsRepository.Return_refund(srId, rf, us_Id);
            }else{
              return null;
            }
          }
}
