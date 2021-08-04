const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
const BASE_URL_1 = 'https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol';
const BASE_URL_2 = 'https://cors-anywhere.herokuapp.com/https://americas.api.riotgames.com/lol';


const getPUUID = async (summonerName) => {
    const response = await fetch(`${BASE_URL_1}/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.puuid;
}

const getMatchIDs = async (puuid) => {
    const response = await fetch(`${BASE_URL_2}/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`, {
        'headers': {
            'origin': 'cors-anywhere'
        }
    })
    const data = await response.json();
    return data
}

const getMatchInfo = async (matchID) => {
    const response = await fetch(`${BASE_URL_2}/match/v5/matches/${matchID}?api_key=${API_KEY}`);
    const data = await response.json();
    return data
}

export { getPUUID, getMatchIDs, getMatchInfo };