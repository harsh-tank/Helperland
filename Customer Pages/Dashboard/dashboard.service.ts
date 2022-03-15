import moment from "moment";
import { DashboardRepository } from "./dashboard.repository";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class DashboardService {
  public constructor(private readonly dashboardRepository: DashboardRepository) 
  {
    this.dashboardRepository = dashboardRepository;
  };

  public async getSRDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.dashboardRepository.getSRDetailById(srId);
  };

  public async getAllSROfProvider(providerId: number): Promise<ServiceRequest[] | null> 
  {
    return this.dashboardRepository.getAllSROfProvider(providerId);
  };

  public async rescheduleSR(date:Date, time:string, srId:number): Promise<[number, ServiceRequest[]]> 
  {
    return this.dashboardRepository.rescheduleSR(date, time, srId);
  };

  public async getProviderById(providerId:number):Promise<User | null>{
    return this.dashboardRepository.getProviderById(providerId);
  };

  public async getAllSRByUserId(userId: number): Promise<ServiceRequest[] | null> 
  {
    return this.dashboardRepository.getAllSRByUserId(userId);
  };

  public async updateSR(srId:number): Promise<[number, ServiceRequest[]]> 
  {
    return this.dashboardRepository.updateSR(srId);
  };

  public TimeConflictOfProvider(date: string,serviceRequest: ServiceRequest[],
    totalHour: number,time: string) 
  {
      let Ser_Req_Date;
      let startTime;
      let endTime;
      const User_Time = time.split(":");

      if(User_Time[1] === '30'){ User_Time[1] = '0.5';}

      const enteredTime = parseFloat(User_Time[0]) + parseFloat(User_Time[1]);
      const enteredDate = new Date(date.split("-").reverse().join("-"));
      let conflict;
      for (let count in serviceRequest) 
      {
        if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) 
        {
            conflict = false;
        } 
        else if (new Date(serviceRequest[count].ServiceStartDate) < enteredDate) 
        {
            conflict = false;
        } 
        else 
        {

          const sTime =serviceRequest[count].ServiceStartTime.toString().split(":");
          if(sTime[1] === '30')
          {
            sTime[1] = '0.5';
          }
          const bookedStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
          const bookedTotalHour =
            serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
          console.log(enteredTime);
          console.log(totalHour)
          console.log(bookedStartTime);
          console.log(bookedTotalHour);
          if (enteredTime + totalHour < bookedStartTime || bookedStartTime + bookedTotalHour < enteredTime) 
          {
            conflict = false;
          }
          else
          {
            Ser_Req_Date = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");

            const srTime = bookedStartTime.toString().split('.');
            if(srTime[1] === '5'){
              srTime[1] = '30'
            }else{
              srTime[1] = '00'
            }
            startTime = srTime.join(':');

            const eTime = (bookedStartTime + bookedTotalHour).toString().split('.');
            if(parseInt(eTime[1]) === 5)
            {
              eTime[1] = '30';
            }else
            {
              eTime[1] = '00';
            }
            endTime = eTime.join(':');
            conflict = true;
            break;
          }
          
        }
      }
      return {conflict, Ser_Req_Date, startTime, endTime};
  };

  public Confirm_valid_date(date: string) {
    const updateDate = new Date(date.split("-").join("-"));
    console.log(updateDate);
    const todayDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
    if (updateDate > todayDate) {return true;}
    else {return false;}
  };

  public createData(date:string,time:string,userEmail:string,srId:string): typeof data{
    const data = {
        from: 'no_reply_helperland@gmail.com',
        to: userEmail,
        subject: 'Rescheduled service',
        html: `
            <h2>“Service Request with ID : ${srId} has been rescheduled by customer.Therefore Service is scheduled on ${date} at ${time}”.</h2>
            `
    }
    return data;
  };

  public cancelData(userEmail:string,srId:string): typeof data{
    const data = {
        from: 'no_reply_helperland@gmail.com',
        to: userEmail,
        subject: 'Service Request is Cancelled now',
        html: `
            <h1>“Service Request with ID : ${srId} has been Cancelled by customer".</h1>
            `
    }
    return data;
  };


}