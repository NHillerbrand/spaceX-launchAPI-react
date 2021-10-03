import { FC, useEffect, useState } from 'react';
import './styles/app.scss';
import LaunchOverview from './components/launch-overview.component';
import LaunchDataService from './services/launch.service';
import LaunchDetail from './components/launch-detail.component';
import { LaunchDetailsModel, LaunchOverviewModel } from './models/launch.model';
import Search from './utils/search.component';

const App: FC = () => {

  const [currentLaunch, setCurrentLaunch] = useState<LaunchDetailsModel>({
    id: '',
    name: '',
    success: false,
    date_utc: '',
  });
  const [searchSucceeded, setSearchSucceeded] = useState(false);
  const [searchedYet, setSearchedYet] = useState(false);
  const [pastLaunches, setPastLaunches] = useState<Array<LaunchOverviewModel>>([])

  useEffect(() => {
    const getLatestLaunches = () => {
      LaunchDataService.getAll()
        .then(response => {
          const latestLaunches = (response.data as Array<any>)
              .sort(sortByDate)
              .filter(launch => !launch.upcoming)
              .slice(0, 3);
          setPastLaunches(latestLaunches);
          console.log(`Updated latest aunches: data=${latestLaunches.toString()}`);
        })
        .catch(err => console.error(`Updating latest launches failed, msg=${err}`));
    }
    getLatestLaunches();
  }, [])

  /**
   * sorts two dates descending or ascending
   * @param a first Datevalue 
   * @param b second Datevalue
   * @param desc deines sort order
   * @returns number (-1, 0, 1)
   */
  function sortByDate(a: string, b: string, desc = true) {
      const getTime = (date: string) => date != null ? new Date(date).getTime() : 0;
      if(desc) {
        return getTime(b) - getTime(a);
      }
      return getTime(a) - getTime(b);
  }

  /**
   * triggert on pressing the searchbtn 
   * @param searchQuery id of launch 
   * @returns updates CurrentLaunch SearchSuccess props and returns void 
   */
  function onSearch(searchQuery: string): void {
    LaunchDataService.getById(searchQuery)
      .then(response => {
        setSearchSucceeded(true);
        setCurrentLaunch(response.data)
        console.log(response.data);
      })
      .catch(err => {
        setSearchSucceeded(false);
        console.error(err);
      })
      .then(() => setSearchedYet(true));
  }



  return (
    <div className="bg-root">
      <Search
            placeholder="type in launch id..."
            enterButton="Search"
            onSearch={onSearch}
      />
      {searchedYet ? <LaunchDetail data={currentLaunch} searchSucceeded={searchSucceeded}/> : null }
      <LaunchOverview pastLaunches={pastLaunches}/>
    </div>
)};

export default App;
