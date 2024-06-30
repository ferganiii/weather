const apiKey='d3fd4973f64148d4939212200242306';
const search =document.querySelector('.search')

search.addEventListener('change' , function(){
getWeather(search.value)

})

async function getWeather(current){
    try{
        let response =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d3fd4973f64148d4939212200242306&q=${current}&days=3`);
    const final=await response.json()
console.log(final);
display(final)
    }catch(err){
        console.log(err);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter Valid Location..",
         
          });
    }
}



function display(data){
    const DataArry=data.forecast.forecastday;
    



     
     let weatherBox=``
     for (let i = 0; i < DataArry.length; i++) {
        const date=new Date(DataArry[i].date)
     const wkDay=date.toLocaleDateString('en-us' , {weekday:"long"})
     const DateNum=date.toLocaleDateString('en-us' , {weekDay:'narrow'})

         weatherBox +=`
         <div class="col-md-4 p-0 col-lg-4">
            <div class="card">
                <div class="d-flex justify-content-between bg-black">
                    <div class="day p-1">${wkDay}</div>
                    <div class="date p-1">${DateNum}</div>
                </div>
              <div class="d-flex justify-content-center mt-5">  <div class="num fs-1 fw-bold">${DataArry[i].day.avgtemp_c}<sup>o</sup>C</div> </div>
                <div class="forecast-icon ms-5">
                    <img src="https:${DataArry[i].day.condition.icon}" alt="" width="50">
                </div>
                <div class="custom text-primary m-1">${DataArry[i].day.condition.text}</div>
    
            </div>
        </div>
         `
     }
     
     document.querySelector('.weather').innerHTML=weatherBox;
      document.querySelector('.city').innerHTML=`
      <div class="city">
              

    <div class="m-auto text-center mb-5">
        <h2 class="h2">${data.location.name}</h2>
        <h3 class="h1">${data.current.temp_c} <sup>o</sup></h3>
<div class="forecast-icon ms-5">
                    <img src="https:${data.current.condition.icon}" alt="" width="50">
                </div>
        <h4>${data.current.condition.text} </h4>


        <span class="m-1"><img src="imgs/icon-umberella.png" alt="">  ${data.current.humidity}%</span>
                <span class="m-1"><img src="imgs/icon-wind.png" alt="">  ${data.current.wind_kph}km/h</span>
        
    </div>
   </div>
      `

}


function myLocation(position){
console.log(position);
const latitude=position.coords.latitude;
const longitude=position.coords.longitude;

const MyPostion=`${latitude},${longitude}`;
getWeather(MyPostion);
console.log(latitude , longitude);

}

navigator.geolocation.getCurrentPosition(myLocation)


// getWeather()