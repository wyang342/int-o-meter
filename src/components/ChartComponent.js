import Chart from "react-google-charts";


function ChartComponent({ deadData }) {
    const loadDataIntoChart = () => {
        const arrToReturn = [];
        arrToReturn.push([
            'ChampionName',
            'AvgSecsDead',
            { role: 'style' },
        ])
        for (const [championName, avgTimeDead] of Object.entries(deadData)) {
            arrToReturn.push([championName, avgTimeDead, 'blue'])
        }
        return arrToReturn;
    }

    const getHeight = () => {
        return Object.keys(deadData).length * 70;
    }

    return (
        <Chart
            height={getHeight()}
            className='int-chart'
            chartType="BarChart"
            loader={<div>Loading Your Int-O-Meter...</div>}
            data={loadDataIntoChart()}
            options={{
                title: 'Average Seconds Spent Dead Per Champion (Last ~30 Games)',
                bar: { groupWidth: '75%' },
                legend: { position: 'none' },
                vAxis: {
                    title: 'Champion',
                },
                hAxis: {
                    title: 'Average Time Spent Dead (s)',
                    minValue: 0,
                },
                chartArea: { 'width': '80%', 'top': 60, 'bottom': 100 },
            }}
        />
    )
}

export default ChartComponent;