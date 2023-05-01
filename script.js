function getOffer(p) {
    let form = document.querySelector('form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    let overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
    document.addEventListener('click', function(e) {
        if (!form.contains(e.target) && e.target !== p) {
            form.style.display = 'none';
            overlay.style.display = 'none';
        }
        else {
            overlay.style.display = 'block';
            form.style.display = 'block';
        }
    });
}

let header = document.querySelector('.main-header'),
    scrollPrev = 0;

 window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;

    if (scrolled > 100 && scrolled > scrollPrev ) {
        header.classList.add('out');
    } else {
        header.classList.remove('out');
    }
    scrollPrev = scrolled;
});


const carouselItems = document.querySelector('.carousel-items');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

fetch('destinations-data.json')
    .then(response => response.json())
    .then(data => {
        let cityCards = "";

        for (let i = 0; i < 6; i++) {
            const city = data[i].city;
            const price = data[i].price;
            const img = data[i].img;

            cityCards += `
        <div class="city-cards">
          <img class="city-card-img" src="${img}">
          <div class="city">${city}</div>
          <div class="price">Price from ${price}$</div>
        </div>
      `;
        }

        carouselItems.innerHTML = cityCards;
        let currentPosition = 0;
        let slideIndex = 0;
        let autoSlideInterval;

        function autoAdvance() {
            slideIndex++;
            if (slideIndex >= document.querySelectorAll('.city-cards').length) {
                slideIndex = 0;
            }
            document.querySelector('.carousel-items').style.transform = `translateX(-${slideIndex * 10}%)`;
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(autoAdvance, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        prevButton.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                carouselItems.style.transform = `translateX(-${currentPosition * 10}%)`;
            }
            stopAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            if (currentPosition < 6 - 1) {
                currentPosition++;
                carouselItems.style.transform = `translateX(-${currentPosition * 10}%)`;
            }
            stopAutoSlide();
        });

        startAutoSlide();

        window.addEventListener('load', function () {
            document.querySelector('.carousel').classList.add('loaded');
        });
    })

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            observer.unobserve(entry.target);
        }
    });
});
window.addEventListener('load', function () {
    document.querySelector('.navigation').classList.add('loaded');
});
const myDivs = document.querySelectorAll('section');
myDivs.forEach(myDiv => {
    observer.observe(myDiv);
});




