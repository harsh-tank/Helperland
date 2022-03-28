export type filter_features= {
    ServiceRequestId: number,
    PostalCode : string |null,
    Email: string | null,
    UserId: number | null,
    ServiceProviderId: number | null,
    Status: string | null,
    PaymentStatus: number | null,
    PenaltyStatus: number | null,
    HasIssue: boolean,
    FromDate:string | null,
    ToDate: string | null
}

export type upd_SR_data= {
    AddressLine1: string,
    AddressLine2: string,
    City: string,
    Notes: string|null,
    PostalCode : string,
    RescheduleReason: string | null,
    ServiceRequestId: number,
    ServiceStartDate: string,
    ServiceTime: string
}

export type Print_Req_Data= {
    ServiceId: number,
    ServiceDate:{Date:string,Time:string},
    CustomerDetails:{Name: string,
        UserId: number | null,
        Address: {StreetName: string | undefined,
            HouseNumber: string | undefined,
            PostalCode : string | undefined,
            City: string | undefined}
    },
    ServiceProvider:{Name: string | undefined,
        ServiceProviderId: number | null,
        ProfilePicture: string | undefined,
        Ratings: number | undefined,
    }
    GrossAmount:number
    NetAmount: number,
    Discount:number,
    Status: string | null,
    PaymentStatus:boolean,
    HasIssue:boolean
}