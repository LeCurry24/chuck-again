'use strict';

const categoryform = document.createElement('form');

document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Ready")
    const app = document.querySelector('#app')

    fetch('https://api.chucknorris.io/jokes/categories').then(function(response){
        return response.json()
    }).then(function(data){
        const filteredCategories = data.filter(function(category){
            if (category !== 'explicit' && category !== 'reliigon' && category !== 'politocal') {
                return category
            }
        });
        generateCategorylist(filteredCategories);
        getQuote()
    })
    .catch(function (error){
        console.error('ERROR!!', error);
    });
    app.appendChild(categoryform)

    const submitbutton = document.createElement('button');
    submitbutton.type = 'submit';
    submitbutton.innerText = 'Get Quote'

    categoryform.appendChild(submitbutton);

    categoryform.addEventListener('select', function (event){
        event.preventDefault();
        const newCategoty = this.querySelector('select').value;
        getQuote(newCategoty)
    })
});
function getQuote(category){
    if (!category){
        category = 'dev';
    }

    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then (function (response) {
            return response.json();
        }
        ).then(function(data) {
            return showQuote(data.value);
        });    
}
function showQuote(quote) {
    const app = document.querySelector('#app');

    const  quoteDisplay = document.createElement('p');
    quoteDisplay.innerText = quote

    app.appendChild(quoteDisplay);
}


function generateCategorylist(categories){
    const app = document.querySelector('#app');
    const selectEl = document.createElement('select');

    categories.map(function (category){
        const optionEl = document.createElement('option');
        
        optionEl.value = category;
        optionEl.text = category;

        selectEl.appendChild(optionEl);
    });
    categoryform.appendChild(selectEl)
}