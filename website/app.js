/* Global Variables */
const appKey = "&appid=139a49efea3ff71d2dd2cfb40a6cfbee";
const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
//submitButton
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener('click' , () => {
    const zip = document.getElementById("zip").value;
    const fealing = document.getElementById("feeling").value;
    getWeatherData(baseUrl,zip,appKey)
    .then((data)=>{
        console.log(data);
        postData('/add',{
            date : newDate,
            temp : data.list[0].main.temp,
            entry : fealing
        })
        updateUI();
    })
})
//post function
const postData = async (url = '', data = {})=>{
    const res = await fetch (url,{
        method : "POST",
        credentials : "same-origin",
        headers :{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

    try {
        const newData = res.json;
        return newData
    } catch (error) {
        console.log("error",error);
    }
}
//get weather
const getWeatherData = async (baseUrl , zip, appKey) =>{
    const res = await fetch (baseUrl+zip+appKey)
    try {
        const data = await res.json();
        return data
    } catch (error) {
        console.log("error",error);
    }
}
//updat the UI function
const updateUI = async ()=>{
    const req = await fetch ('/all');
    try {
        const allData = await req.json();
        let CTemp = Math.round(allData[0].temp - 273);
        document.getElementById("entry").innerHTML = allData[0].entry;
        document.getElementById("temp").innerHTML = CTemp + "C";
        document.getElementById("date").innerHTML = allData[0].date;
    } catch (error) {
        console.log("error",error);
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();