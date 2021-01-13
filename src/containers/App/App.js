import React, {useState,useEffect} from 'react';
import './App.css';
import {FormControl,Select,MenuItem,Card, CardContent} from "@material-ui/core"
import InfoBox from '../../components/InfoBox/InfoBox';
import {sortData} from '../../Utitl'
import Map from '../../components/Map/Map';
import Table from '../../components/Table/Table';
import LineGraph from '../../components/LineGraph/LineGraph';


function App() {
  const [countries,setCountries]= useState([]);
  const [country,setCountry]= useState("IN");
  const [tableData,setTableData]= useState([]);
  const [countryInfo,setCountryInfo]= useState({});
  const[mapCenter,setMapCenter]=useState([24.785,-40.852]);  
  const[mapZoom,setMapZoom]=useState(4);
  const[casesType,setCasesType]=useState("cases");
  const [countriesInfo,setCountriesInfo]= useState([]);
  const[graphData,setGraphData]=useState([]);


  
useEffect(()=>{ const getCountriesData= async()=>{
  await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=150")
  .then((response)=>response.json())
  .then((data)=>setGraphData(data))
  
 
}
getCountriesData();},[]);

 
    const getTableData= async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>setTableData(sortData(data)));
      };
      useEffect(getTableData,[]); 

const CountrySelected= async(countryCode)=>{
 const url = countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":"https://disease.sh/v3/covid-19/countries/"+countryCode;
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
      const mapCenter=[
        data.countryInfo.lat,
        data.countryInfo.long
      ]
      setMapCenter(mapCenter);
      setMapZoom(4);
    }
    );
  }


useEffect(()=>{
  const getCountriesData= async()=>{
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response)=>response.json())
  .then((data)=>{   
    const countries= data.map((country)=>({
      name:country.country,
      value:country.countryInfo.iso2
    }));
    setCountriesInfo(data);
    setCountries(countries);
  });
};
CountrySelected(country);
getCountriesData();
getTableData(); },[]);

const OnCountrySelected=(event)=>{
const country=event.target.value;
CountrySelected(country);
setCountry(country);

}


  return (




    <div className="app">

      <div className="app__left">

        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onClick={OnCountrySelected}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              { countries.map((country)=>(<MenuItem value={country.value}>{country.name}</MenuItem>))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox 
            isRed
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases} 
            active={casesType==="cases"}
            onClick={()=>setCasesType('cases')}/>
          <InfoBox 
            title="Recovered"  
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} 
            active={casesType==="recovered"}
            onClick={()=>setCasesType('recovered')}/>
          <InfoBox 
            isRed
            title="Deaths"  
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} 
            active={casesType==="deaths"}
            onClick={()=>setCasesType('deaths')}/>
        </div>

        <Map mapCenter={mapCenter} mapZoom={mapZoom} countries={countriesInfo} casesType={casesType}/> 
      </div>
    

    <div className="app__right">
    <Card>
      <CardContent>
        <h1>Live Cases by Country</h1>        
        <Table data={tableData}/>
        <h1>WorldWide new Cases</h1>
        <LineGraph casesType={casesType} graphData={graphData}/>
      </CardContent>
    </Card>
    </div>
    </div>
  
   
  );
}

export default App;
