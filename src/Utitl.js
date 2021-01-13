import {Circle,Popup} from 'react-leaflet'
import React from 'react'
import numeral from 'numeral'
const caseTypeColors={
    cases:{
        hex:"#CC1034",
        multipler:500
    },
    recovered:{
        hex:"#7dd71d",      
        multipler:600
    },
    deaths:{
        hex:"#fb4443",
        multipler:700
    },
}

export const printStyleStats=(stat)=> stat?`+${numeral(stat).format("0.0a")}`:"+0"


export const sortData=(data)=>{
    const sortedData=[...data];
    return sortedData.sort((a,b)=> a.cases>b.cases?-1:1);
   
}
export const showDataOnMap=(data,casesType='recovered')=>
data.map((country)=>(
    <Circle
    key={country.countryInfo._id}
    center={[country.countryInfo.lat,country.countryInfo.long]}
    fillOpacity={0.4}
    color={caseTypeColors[casesType].hex}
    fillColor={caseTypeColors[casesType].hex}
    radius={
        Math.sqrt(country[casesType])*caseTypeColors[casesType].multipler
    }

  >
<Popup>
    <div className='info-container'>
    <div className='info-flag'
    style={{backgroundImage:`url(${country.countryInfo.flag})`}}
    ></div>
    
<div className='info-name'>{country.country}</div>
<div className='info-confirmed'>Cases:{numeral(country.cases).format("0,0")}</div>
<div className='info-recovered'>Recovered:{numeral(country.recovered).format("0,0")}</div>
<div className='info-deaths'>Deaths:{numeral(country.deaths).format("0,0")}</div>


    </div>
</Popup>
    </Circle>
))
