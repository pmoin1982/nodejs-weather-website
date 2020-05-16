// fetch('http://puzzle.mead.io/puzzle')
//   .then(response => response.json())
//   .then(data => console.log(data));

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {return response.json()})
// .then((data) => {console.log(data)});

// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/neulpur.json?access_token=pk.eyJ1IjoicG1vaW4xOTgyIiwiYSI6ImNrOXl4cGFzbjAyd20zbG1kd2NtNjYyYXYifQ.oDH5zQir9qewd_hhd9elhQ')
// .then((response) => {return response.json()})
// .then((data) => {console.log(data)});

fetch('http://localhost:3000/weather?address=neulpur')
.then((response) => {return response.json()})
.then((data) => {
  if (data.error) {
    console.log(data.error)  
  } else {
    console.log(data)
  }
});

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(searchText.value);
  fetch('http://localhost:3000/weather?address='+searchText.value)
  .then((response) => {return response.json()})
  .then((data) => {
    if (data.error) {
      console.log(data.error) 
      document.getElementById("error").innerText =  data.error;
      document.getElementById("temp").innerText =  '';
      document.getElementById("weather").innerText =  '';
    } else {
      console.log(data)
      document.getElementById("error").innerText =  '';
      document.getElementById("temp").innerText =  data.currentTemp;
      document.getElementById("weather").innerText =  data.weatherDesc;
    }
  })
})