import React from 'react';



export default class Appservices extends React.Component{

    getDataFromAPI=async(value)=>{
        if(!value){
          return
        }
        let val=value.split(' ').join('+');
        let url=`http://www.omdbapi.com/?apikey=fd4e62ba&t=${val}`;
        return await fetch(url).then((response)=>{return response.json()});
}
}