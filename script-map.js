const dots = document.querySelectorAll('.dots');
const tickets = document.createElement('div');
tickets.id = 'tickets';


for (let i = 0; i < dots.length; i++){
    dots[i].addEventListener('click', () => {
        // clear previous content of tickets div
        tickets.innerHTML = '';

        // fetch data from JSON file
        fetch('destinations-data.json')
            .then(response => response.json())
            .then(data => {
                // filter the data to get the destination corresponding to the clicked dot
                const destination = data.find(dest => dest.id === i + 1);

                // create and append the elements to the tickets div
                const cityCard = document.createElement('div');
                cityCard.innerHTML = `
                    <img class="city-card-img" src="${destination.img}">
                    <div class="destination-cards-description"> 
                        <p class="city">${destination.city}</p>
                        <p class="price">Price from <span>${destination.price}$</span></p>
                    </div>
                `;
                tickets.appendChild(cityCard);
            });

    });
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
            tickets.style.zIndex = '3';
            dot.style.animationPlayState = 'paused';
            tickets.style.display = 'block';
            dot.appendChild(tickets);
    });

    tickets.addEventListener('mouseover', (e) => {
        tickets.style.display = 'block';
        dot.style.animationPlayState = 'paused';
    });

    tickets.addEventListener('mouseout', () => {
        tickets.style.display = 'none';
        dot.style.animationPlayState = 'running';
    });
});