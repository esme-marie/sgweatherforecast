import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useFetchUser } from "../utils/user";
import Router from "next/router";
import Chart from "chart.js/auto";
import useSwr from "swr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard:NextPage = () => {
    const { user, loading } = useFetchUser()

    let [forecastDate, setForecastDate] = useState(new Date())
    let today = new Date().toISOString().slice(0, 10)
    let [startdate, setStartDate] = useState([today]);
    let url = `https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${startdate}`

    const fetcher = (url: RequestInfo) => fetch(url).then(res => res.json())
    const { data: weather, error, mutate } = useSwr(url, fetcher);

    console.log('weather: ', weather)

    const forecastStartDate = () => {
        let formatDate: any = forecastDate.toISOString().slice(0, 10);
        setStartDate(formatDate);
    }

    useEffect(() => { // Only call the update api function once setForecastDate is done
        forecastStartDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[forecastDate]); // Function is called once there is a state update for forecastDate

    const canvasEl = useRef(null);

    useEffect(() => {
        try {
            const ctx = canvasEl.current.getContext("2d");
            const labels: any = [];
            const tempHigh: any = [];
            const tempLow: any = [];

            weather.items[0].forecasts.map((item: any) => {
                labels.push(item.date)
            })

            weather.items[0].forecasts.map((item: any) => {
                tempHigh.push(item.temperature.high)
            })

            weather.items[0].forecasts.map((item: any) => {
                tempLow.push(item.temperature.low)
            })

            console.log(labels, tempHigh, tempLow)

            const data = {
                labels: labels,
                datasets: [{
                    data: tempHigh,
                    borderColor: "red",
                    backgroundColor: "rgba(163,231,214,0.3)",
                    fill: true,
                    label: "Temperature ºC (High)"
                }, {
                    data: tempLow,
                    borderColor: "blue",
                    backgroundColor: "rgba(32,178,170,0.3)",
                    fill: true,
                    label: "Temperature ºC (Low)"
                }]
            };

            const config: any = {
                type: "line",
                data: data
            };

            const myLineChart = new Chart(ctx, config);

            return function cleanup() {
                myLineChart.destroy();
            };
        } catch(error) {
            console.log(error);
        }
    });

    if (!user && !loading) {
        Router.replace('/')
    }

    if (error) {
        console.log(error);
    }
    
    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="startdate">
                <div className="forecastlabel bold">
                    Enter Forecast Start Date:
                </div>
                <div className="datepicker">
                    <DatePicker dateFormat="yyyy-MM-dd" placeholderText="yyyy-MM-dd" selected={forecastDate} onChange={(date: any) => setForecastDate(date)} />
                </div>
            </div>
            <div className="linechart">
                <canvas id="myChart" ref={canvasEl} height="100"></canvas>
            </div>
            <div className="table">
                <table id="forecasts">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Forecast</th>
                            <th>Temperature (High)</th>
                            <th>Temperature (Low)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Conditional rendering when there is no api data */}
                        {weather.items[0] ? weather.items[0].forecasts.map((item: any, index: any) => <tr key={index}>
                            <td className="center">{item.date}</td>
                            <td>{item.forecast}</td>
                            <td className="center">{item.temperature.high}</td>
                            <td className="center">{item.temperature.low}</td>
                        </tr>) : 
                        <div>No data available, please select another date. <button onClick={() => Router.reload()}>OK</button></div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
