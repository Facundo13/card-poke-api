document.addEventListener('DOMContentLoaded', ()=>{
    let idPokemon = getRandomInt(1,152);
    fetchData(idPokemon);
});

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async(idPokemon) =>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const data = await res.json();

        const pokemon = { 
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            tipo: data.types
        }
        dibujarCard(pokemon);
    }catch(e){
        console.log(e);
    }
}

const dibujarCard = (pokemon) =>{
    const flex = document.querySelector(".flex");
    const template = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment();
    let types;
    pokemon.tipo.forEach(typePokemon => {
        if (types == undefined){
            types = typePokemon.type.name;
        }else{
            types += ', ' + typePokemon.type.name;
        }
    });

    template.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    template.querySelector('.card-body-name').innerHTML = `<h3 class="card-body-name">${pokemon.name}<span> ${pokemon.hp} HP</span></h3>`
    template.querySelector('.card-body-text').textContent = `${pokemon.exp} Exp`;
    template.querySelector('.card-body-types').innerHTML = `<b>Tipo</b>: ${types}`;
    template.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque; 
    template.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defensa; 
    template.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.velocidad; 

    fragment.appendChild(template);
    flex.appendChild(fragment);
    
}


