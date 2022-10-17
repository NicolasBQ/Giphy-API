const app_init = () => {
    load_gift();
    dom_elements().form.addEventListener('submit', search_gift);
    dom_elements().random.addEventListener('click', load_gift);
}


const dom_elements = () => {
    const gif_img = document.querySelector('[data-gif-img]');
    const form = document.querySelector('[data-form]');
    const input = document.querySelector('[data-input]');
    const random = document.querySelector('[data-random-button]');


    return {
        gif_img,
        form,
        input,
        random
    }
}

const random_number = (max) => {
    return Math.floor(Math.random() * max);
}


const load_gift = () => {
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=LiFCn1vC66GcD4rHtPDCl65DaoHCuISe', {mode: 'cors'})
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            number = random_number(49);
            dom_elements().gif_img.src = response.data[number].images.original.url;
        })
}


const search_gift = (e) => {
    e.preventDefault();
    let user_input = dom_elements().input.value;
    dom_elements().input.value = '';
    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=LiFCn1vC66GcD4rHtPDCl65DaoHCuISe&q=${user_input}`, {mode: 'cors'})
        .then((response) => {
            return response.json();
        })
        .then((response)=> {
            number = random_number(49)
            dom_elements().gif_img.src = response.data[number].images.original.url;
        })
        .catch((error) => {
            alert('No such gif, try another one!');
        })
}



document.addEventListener('DOMContentLoaded', app_init);