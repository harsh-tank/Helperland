import moment from "moment";
import { db } from "../../models/index";
import { ServiceHistoryRepository } from "./servicehistory.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";

export class ServiceHistoryService {

  public constructor(private readonly serviceHistoryRepository: ServiceHistoryRepository) 
  {
    this.serviceHistoryRepository = serviceHistoryRepository;
  };

  public async getSRDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.serviceHistoryRepository.getSRDetailById(srId);
  };

  public async getSRHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> 
  {
    return this.serviceHistoryRepository.getSRHistoryOfUser(userId);
  };

  public async FetchRatingsBySR_Id(srId: number): Promise<Rating | null> 
  {
    return this.serviceHistoryRepository.FetchRatingsBySR_Id(srId);
  };

  public async Input_Ratings(ratings:{[key: number|string]:Rating}): Promise<Rating> 
  {
    return this.serviceHistoryRepository.Input_Ratings(ratings);
  };

  public Confirm_valid_date(requestHistory:ServiceRequest[]) {
    const srHistory:ServiceRequest[] = [];
    const curr_date = new Date(moment(new Date()).format("YYYY-MM-DD"));
    for(let sr in requestHistory){
      const date = requestHistory[sr].ServiceStartDate;
      const Ser_Start_Date = new Date(moment(date).format("YYYY-MM-DD"));
      if (Ser_Start_Date < curr_date) {
        srHistory.push(requestHistory[sr]);
      }
    }
    return srHistory;
     
  };

  public get_avg_Ratings(body: any){
    const Avg_Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService)/3
    return Avg_Ratings;
  }

  public async Format_Time(serviceRequest:ServiceRequest):Promise<string>{

    const sTArray = serviceRequest.ServiceStartTime.toString().split(':');
    const sT = sTArray[0]+":"+sTArray[1]
    if(sTArray[1] === "30"){
        sTArray[1] = "0.5"
    }else{
        sTArray[1] = "0"
    }
    const endTimeInt = parseFloat(sTArray[0]) + parseFloat(sTArray[1]) + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
    const endTimeArray = endTimeInt.toString().split('.');
    if(endTimeArray[1] === '5'){
      endTimeArray[1] = '30'
    }else{
      endTimeArray[1] = '00'
    }

    const time = sT+" - "+endTimeArray[0]+":"+endTimeArray[1];
    return time;
  }

  public async Push_Service_Data(serviceRequest: ServiceRequest[]): Promise<Object[]>{
    let PushHistory: Object[] = [];
    let status:string;

    for (let history in serviceRequest) {
      let user = await this.serviceHistoryRepository.getUser_DetailById(serviceRequest[history].ServiceProviderId);
      let time = await this.Format_Time(serviceRequest[history]);
      if(serviceRequest[history].Status === 4){
        status = "Cancelled";
      }else{
        status = "Completed";
      }
      PushHistory.push({
        ServiceId: serviceRequest[history].ServiceRequestId,
        StartDate: serviceRequest[history].ServiceStartDate.toString().split('-').reverse().join('/') +" "+ time,
        ServiceProvider: user?.FirstName! + " " + user?.LastName!,
        Payment: serviceRequest[history].TotalCost,
        Status: status 
      });
    }
    return PushHistory;
  }
}

