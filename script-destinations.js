
const cityItems = document.querySelector('.main');


fetch('destinations-data.json')
    .then(response => response.json())
    .then(data => {
        let cityCards = "";

        for (let i = 0; i < data.length; i++) {
            const city = data[i].city;
            const price = data[i].price;
            const img = data[i].img;
        if (i % 2 === 0 || i === 0) {
            cityCards += `
        <div class="destination-cards animate__animated animate__fadeInLeft">
          <img class="city-card-img" src="${img}">
          <div class="destination-cards-description"> 
            <p class="city">Warsaw - ${city}</p>
            <p class="price">Price from <span>${price}$</span> <p/>
          </div>
        
        </div>
      `;
        }
        else {
            cityCards += `
        <div class="destination-cards animate__animated animate__fadeInRight">
          <img class="city-card-img" src="${img}">
          <div class="destination-cards-description"> 
            <p class="city">Warsaw - ${city}</p>
            <p class="price">Price from <span>${price}$</span> <p/>
          </div>
        
        </div>
      `;
        }
        }


        cityItems.innerHTML = cityCards;
    })