import { FC } from "react";
import { LaunchOverviewModel } from "../models/launch.model";
import './launch-overview.component.sass';

type LaunchOverviewType = {
    pastLaunches: Array<LaunchOverviewModel>
};
const LaunchOverview: FC<LaunchOverviewType> = ({pastLaunches}) => {

const launchPreview = pastLaunches.map((launch: LaunchOverviewModel, index: number) => <Launch key={index} id={launch.id} name={launch.name}/>);
console.log(launchPreview);
return (
    <div className="bg-launchOverview">
        <div className="bg-container-title">Past launches</div>
        <div className="bg-launches">
            {launchPreview}
        </div>
    </div>
)}

const Launch: FC<LaunchOverviewModel> = ({id, name}) => {
    return (
        <div className="bg-container bg-launch">
            <span className="bg-launch-title">{name}</span>
            <span className="bg-launch-id">#{id}</span>
        </div>
    )
}

export default LaunchOverview;