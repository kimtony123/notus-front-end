import { Tab, TabList, TabPanel, TabPanels, Tabs, Button} from "@chakra-ui/react";
//@ts-ignore
import moment from "moment";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import { useEffect, useState } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import {
    WiBarometer,
    WiDaySunny,
    WiSandstorm,
    WiThermometer,
} from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import { WeatherData } from "../../assets/models";
import WeatherIconService from "../../services/weatherIconService";
import { saveWeatherData } from "../store/weatherSlice";
const ADDRESS_STORAGE_PREFIX = "weather_address_";


const WeatherDescCard = (props: { weatherData: WeatherData }) => {
    const [saved, setSaved] = useState(false);
    const { weatherData: initialWeatherData } = props;
    //@ts-ignore
    const [selectedDay, setSelectedDay] = useState<WeatherDay>(
        initialWeatherData.days[0]
    );





    //@ts-ignore
    const savedAddresses = useSelector((state) => state.weather.savedData);

    useEffect(() => {
        setSelectedDay(initialWeatherData.days[0]);
    }, [initialWeatherData]);
    //@ts-ignore
    const onSelectDay = (day: WeatherDay) => () => {
        setSelectedDay(day);
    };
    const dispatch = useDispatch();

    const onSaveStorage = () => {
        if (
            !savedAddresses.some(
                (data) =>
                    data.resolvedAddress === initialWeatherData.resolvedAddress
            )
        ) {
            //@ts-ignore
            dispatch(saveWeatherData(initialWeatherData));
            setSaved(true);
        }
        setSaved(false);
    };
    
    const ctrlLocal = () => {
        const storedData = localStorage.getItem(
            ADDRESS_STORAGE_PREFIX + initialWeatherData.resolvedAddress
        );

        return !!storedData;
    };


    return (
        <div className="grid grid-cols-12 gap-5 mt-4">
            <div className="col-span-12 xs:col-span-12 md:col-span-8 lg:col-span-8  rounded-lg">
                <div className="grid grid-cols-12">
                    <div className=" col-span-8 flex flex-col justify-start">
                        <div className="flex flex-row items-center gap-4">
                            <div className=" grow sm:grow-0">
                                <h2 className=" text-2xl font-extrabold text-left">
                                    {initialWeatherData.resolvedAddress}
                                </h2>
                            </div>
                            <div>
                                <BsFillBookmarkStarFill
                                    size={30}
                                    onClick={() => {
                                        //@ts-ignore
                                        onSaveStorage(initialWeatherData)();
                                        setSaved(true);
                                    }}
                                    className={
                                        ctrlLocal() || saved
                                            ? "text-yellow-400 hover:text-yellow-400"
                                            : "hover:text-yellow-400"
                                    }
                                ></BsFillBookmarkStarFill>
                            </div>
                        </div>

                        <div className="flex flex-row mt-[100px] items-center">
                            <p className=" text-7xl font-bold text-left ">
                                {selectedDay.temp}
                            </p>
                            <WiThermometer
                                size={45}
                                color="gray"
                            ></WiThermometer>
                        </div>
                    </div>
                    <div className=" col-span-4 flex justify-center items-center">
                        {WeatherIconService.getIconByCondition(
                            selectedDay.conditions,
                            150
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-5">
                    <div className="bg-slate-100 rounded-lg">
                        <h2 className="text-left text-slate-500 font-bold p-4 uppercase text-sm">
                            Today's forecasts
                        </h2>
                        <div className="flex flex-row overflow-x-scroll px-6 py-5">
                            {selectedDay.hours.map((hour) => (
                                <div className=" border-e border-gray-200 space-y-4 px-[2rem] flex flex-col py-4 ">
                                    <p className=" text-gray-400 font-semibold">
                                        {hour.datetime.slice(0, 5)}
                                    </p>
                                    <div className="flex justify-center">
                                        {WeatherIconService.getIconByCondition(
                                            hour.conditions,
                                            55
                                        )}
                                    </div>
                                    <p className=" font-extrabold text-2xl">
                                        {Math.round(hour.temp)}&deg;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-5 bg-slate-100 rounded-lg p-4 space-y-3">
                    <h2 className="text-left text-slate-500 font-bold p-4 uppercase text-sm">
                        Air
                    </h2>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col items-start">
                                    <div className="col-span-1 p-2 bg-gray-100 flex flex-row items-center space-x-5">
                                        <WiThermometer
                                            size={28}
                                        ></WiThermometer>
                                        <p className="text-left font-semibold text-slate-400 text-2xl">
                                            Real Fell
                                        </p>
                                    </div>
                                    <p className=" font-semibold text-3xl ps-3">
                                        {selectedDay.feelslike}&deg;
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="col-span-1 p-2 bg-gray-100 flex flex-row items-center space-x-3">
                                        <WiSandstorm size={28}></WiSandstorm>
                                        <p className="text-left font-semibold text-slate-400 text-2xl">
                                            Wind
                                        </p>
                                    </div>
                                    <p className=" font-semibold text-3xl ps-3">
                                        {selectedDay.windspeed}{" "}
                                        <span className=" font-extrabold  text-xl">
                                            km/h
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-12">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col items-start">
                                    <div className="col-span-1 p-2 bg-gray-100 flex flex-row items-center space-x-3">
                                        <WiBarometer size={28}></WiBarometer>
                                        <p className="text-left font-semibold text-slate-400 text-2xl">
                                            Pressure
                                        </p>
                                    </div>
                                    <p className=" font-semibold text-3xl ps-3">
                                        {selectedDay.pressure}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="col-span-1 p-2 bg-gray-100 flex flex-row items-center space-x-3">
                                        <WiDaySunny size={28}></WiDaySunny>
                                        <p className="text-left font-semibold text-slate-400 text-2xl">
                                            Uv index
                                        </p>
                                    </div>
                                    <p className=" font-semibold text-3xl ps-3">
                                        {selectedDay.uvindex}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-5 bg-slate-100 rounded-lg p-4 space-y-2">

                    <h1 className="text-center text-slate-500 font-bold p-4 uppercase text-sm"> TRADE</h1>
                    <div  className=" text-slate-500 font-bold p-4 uppercase text-sm" style={{ display: 'flex', justifyContent: 'right' }}>
                        <div className=" text-right  col-span-5">
                            <div className="grid grid-cols-2 gap-2">
                                <input 
                                    type="number"
                                    placeholder=" AO-CRED AMOUNT"
                                    className="input input-bordered input-warning w-full max-w-xs mt-8 mb-3"/>
                            </div>
                        </div>
                    </div>

                    <div  className=" text-slate-500 font-bold p-4 uppercase text-sm" style={{ display: 'flex', justifyContent: 'right' }}>
                        <div className=" text-right  col-span-8">
                            <div className="grid grid-cols-2 gap-2">
                                <input 
                                    type="number"
                                    placeholder="Contract Expiry in Days"
                                    className="input input-bordered input-warning w-full max-w-xs mt-8 mb-3"/>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 ">
                        <div className="col-span-12">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col items-start text-center" >
                                <p className="text-center font-semibold text-slate-400 text-2xl">
                                            Higher than Today.
                                            <Button colorScheme='green'> Call.</Button>
                                </p>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="col-span-1 p-2 bg-gray-100 flex flex-row items-center space-x-3">
                                        <p className="text-center font-semibold text-slate-400 text-2xl">
                                            Lower than Today.
                                            <Button colorScheme='red'>Put</Button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="flex flex-col mt-5 bg-slate-100 rounded-lg p-4 space-y-2">

                    <h1 className="text-center text-slate-500 font-bold p-4 uppercase text-sm"> Trade Positions</h1>
                 
                    <TableContainer>
  <Table size='sm' variant='striped' colorScheme='green'>
    <Thead>
      <Tr>
        <Th color={"black"} fontSize={15}>Wallet Id.</Th>
        <Th color={"black"} fontSize={15}> Location.</Th>
        <Th color={"black"} fontSize={15}> Contract Created.</Th>
        <Th color={"black"} fontSize={15}>Trade Amount.</Th>
        <Th color={"black"} fontSize={15}>Buy Temp.</Th>
        <Th color={"black"} fontSize={15}>Contract Expiry Date.</Th>
        <Th color={"black"} fontSize={15}>Contract Close Temp.</Th>
        <Th color={"black"} fontSize={15}>Contract Ended(1= true, 0=false)</Th>
        <Th color={"black"} fontSize={15}>Contract Type(1= call, 0=Put) </Th>
        <Th color={"black"} fontSize={15}>Contract Value.(+ = won ,-= lost)</Th>
        <Th color={"black"} fontSize={15}>Close Position</Th>
        <Th color={"black"} fontSize={15}>Closed Position(1= true ,0= false)</Th>
 
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>rD0J_Nv0X321WG4gYOU7dbiNNSrCLU4eT9yD1xjG3zk</Td>
        <Td> {initialWeatherData.resolvedAddress}  </Td>
        <Td isNumeric> {selectedDay.datetime}</Td>
        <Td isNumeric>10</Td>
        <Td>{selectedDay.temp}</Td>
        <Td>{selectedDay.datetime} + 1</Td>
        <Td>{selectedDay.temp} </Td>
        <Td>1</Td>
        <Td>1</Td>
        <Td> {10 *1.8}</Td>
        <Td isNumeric><Button colorScheme='green'> Close position</Button></Td>
        <Td>1</Td>
      </Tr>


      <Tr>
        <Td>i0PITA1jhOWA_PIb-Zqk5N9JzcQibDJDHDOpr0yqZIM</Td>
        <Td> {initialWeatherData.resolvedAddress}  </Td>
        <Td isNumeric> {selectedDay.datetime}</Td>
        <Td isNumeric> </Td>
        <Td>{selectedDay.temp}</Td>
        <Td>{selectedDay.datetime} + 1</Td>
        <Td>{selectedDay.temp} </Td>
        <Td>0</Td>
        <Td>1</Td>
        <Td> {10 * 0.9}</Td>
        <Td isNumeric><Button colorScheme='red'> Close position</Button></Td>
        <Td>0</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
                </div>
            </div>
            <div className="col-span-7 xs:col-span-7 md:col-span-4 lg:col-span-4 bg-slate-100 p-4 rounded-lg ">
                <Tabs variant="soft-rounded" colorScheme="orange">
                    <TabList>
                        <Tab>7 Days</Tab>
                        <Tab>14 Days</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="overflow-y-scroll pr-5 mt-10  ">
                                {initialWeatherData.days
                                    .slice(0, 17)
                                    .map((day) => (
                                        <div className="space-y-2 mt-4">
                                            <div
                                                onClick={onSelectDay(day)}
                                                className="flex flex-row hover:bg-slate-200 rounded-lg p-3 items-center"
                                            >
                                                <p className=" w-1/3 text-left">
                                                    {moment(
                                                        day.datetime
                                                    ).format("dddd")}
                                                </p>
                                                <div className=" w-1/3 flex justify-center">
                                                    {WeatherIconService.getIconByCondition(
                                                        day.conditions,
                                                        40
                                                    )}
                                                </div>
                                                <p className=" w-1/3 text-right">
                                                    <strong>
                                                        {Math.round(
                                                            day.tempmax
                                                        )}
                                                    </strong>
                                                    {" / " +
                                                        Math.round(day.tempmin)}
                                                </p>
                                            </div>
                                            <hr className="h-px my-5  bg-gray-200 border-0 w-full"></hr>
                                        </div>
                                    ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="overflow-y-scroll pr-5 max-h-[40rem] mt-10">
                                {initialWeatherData.days.map((day) => (
                                    <div className="space-y-2 mt-4 ">
                                        <div
                                            onClick={onSelectDay(day)}
                                            className="flex flex-row hover:bg-slate-200 rounded-lg p-3"
                                        >
                                            <p className=" w-1/3 text-left">
                                                {moment(day.datetime).format(
                                                    "dddd"
                                                )}
                                            </p>
                                            <div className=" w-1/3 flex justify-center">
                                                {WeatherIconService.getIconByCondition(
                                                    day.conditions,
                                                    40
                                                )}
                                            </div>
                                            <p className=" w-1/3 text-right">
                                                <strong>
                                                    {Math.round(day.tempmax)}
                                                </strong>
                                                {" / " +
                                                    Math.round(day.tempmin)}
                                            </p>
                                        </div>
                                        <hr className="h-px my-5 bg-gray-200 border-0 w-full"></hr>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    );
};

export default WeatherDescCard;
