import { FC } from "react";
import Countdown from "antd/lib/statistic/Countdown";
import './launch-detail.component.sass';
import { LaunchDetailsModel, SearchLaunchResultModel } from "../models/launch.model";

const LaunchDetail: FC<SearchLaunchResultModel> = ({data, searchSucceeded}) => {
    const {id, name, date_utc, success}: LaunchDetailsModel = data as LaunchDetailsModel;
    let searchResult;
    if(searchSucceeded) {
        searchResult =  <div className="bg-searchResult">
                            <div className="bg-searchResult-row">
                                <span className="bg-searchResult-title">{name}</span>
                                <div className={`bg-indicator bg-indicator-${success === null || success === undefined  ? 'notDefined' : success ? 'success': 'failure'}`}/>
                            </div>
                            <div className="bg-searchResult-row">
                                <Countdown className="bg-Countdown" title="Elapsed time since launch" value={date_utc}/>
                                <span className="bg-searchResult-tag">#{id}</span>
                            </div>
                        </div>
    } else {
        searchResult = <span className="bg-launchDetail-errorMsg">Search result is not valid</span>
    }
    return (
        <div className='bg-launchDetail'>
        <div className="bg-container-title">Search result</div>
            <div className={`bg-container ${searchSucceeded? '' : 'bg-result-error'}`}>
                {searchResult}
            </div>
        </div>

         
    )
}

export default LaunchDetail;