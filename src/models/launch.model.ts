export interface LaunchDetailsModel {
    id: string,
    name: string,
    success: boolean,
    date_utc: string,
}

export interface LaunchOverviewModel {
    id: string,
    name: string,
}

export type SearchLaunchResultModel  = {
    data: LaunchDetailsModel,
    searchSucceeded: boolean
}
