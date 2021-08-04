import './App.css';
import NavigationBar from './components/Navbar';
import { useState } from 'react';
import BigSearchComponent from './components/BigSearchComponent';
import ChartComponent from './components/ChartComponent';
import { getPUUID, getMatchIDs, getMatchInfo } from './api/RiotAPI';


function App() {
    const [deadData, setDeadData] = useState(null);

    const populateDeadData = async (summonerToSearch) => {
        const puuid = await getPUUID(summonerToSearch);
        const matchIDs = await getMatchIDs(puuid);

        // matchIDs --> matchObjs
        let promises = [];
        for (const matchID of matchIDs) {
            promises.push(getMatchInfo(matchID));
        }
        const matchObjs = await Promise.all(promises);

        // matchArrays = array containing arrays which contain individual summoner Obj
        let matchArrays = [];
        for (const matchObj of matchObjs) {
            if ('info' in matchObj) {
                matchArrays.push(matchObj.info.participants)
            }
        }

        // now populates deadData
        let deadDataTemp = {};
        for (const matchArr of matchArrays) {
            for (const summoner of matchArr) {
                const summonerName = summoner.summonerName;
                if (summonerName.toLowerCase() !== summonerToSearch.toLowerCase()) continue;

                const championName = summoner.championName;
                const totalTimeSpentDead = summoner.totalTimeSpentDead;

                if (championName in deadDataTemp) {
                    deadDataTemp[championName][0] += totalTimeSpentDead;
                    deadDataTemp[championName][1] += 1;
                } else {
                    deadDataTemp[championName] = [totalTimeSpentDead, 1];
                }
            }
        }

        for (const [championName, [totalTimeSpentDead, championCount]] of Object.entries(deadDataTemp)) {
            deadDataTemp[championName] = totalTimeSpentDead / championCount;
        }

        setDeadData(deadDataTemp);
    }

    return (
        <div>
            <NavigationBar />
            <BigSearchComponent populateDeadData={populateDeadData} />
            {deadData && <ChartComponent deadData={deadData} />}
        </div>
    );
}

export default App;
