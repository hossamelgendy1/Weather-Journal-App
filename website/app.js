/* Global Variables */
const end_point = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const API_KEY = '&appid=6c97d7fd1d1b7d3da07feed3637dcbba&units=metric';


//Get the date
let day = new Date();
let newDate = (day.getMonth() + 1) + '-'+ day.getDate()+'-'+ day.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getData);

/* Function called by event listener */
function getData(e) {
  const zip_code = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeather(end_point, zip_code, API_KEY)
    .then(function (Data) {
      addData('/post', { date: newDate, temp: Data.main.temp, content })
    }).then(function (newData) {
      updatePage();
    })

}

/* Function to GET Web API Data*/
const getWeather = async (end_point, zip_code, API_KEY) => {
  const result = await fetch(end_point + zip_code + API_KEY);
  try {
    const userData = await result.json();
    return userData;
  } catch (error) {
    console.log(error);
  }
}

/* Function to POST data */
const addData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp ,
      content: data.content
    })
  })

  try {
    const newData = await request.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updatePage = async () => {
  const request = await fetch('/get');
  try {
    const data = await request.json()
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
    document.getElementById('content').innerHTML = `Feelings: ${data.content}`;
  }
  catch (error) {
    console.log(error);
  }
};


