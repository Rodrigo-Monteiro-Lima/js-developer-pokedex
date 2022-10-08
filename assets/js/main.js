const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const poke = `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
        <div class="details">
            <p class='text'>Experiência: ${pokemon.baseExp}</p>
            <ul class="abilities"> Habilidades:
                ${pokemon.abilities.map((abilitie) => `<li class='ability' >${abilitie}</li>`).join('')}
            </ul>
            <br/>
            <ul class='stats'> Status:
            ${pokemon.stats.map((stat) => `<li class='stat' >${stat}</li>`).join('')}
            </ul>
        </div>
    </li>
`
    return poke;
}
 
const algo = () => {
    const list = document.querySelectorAll('.pokemon');
    list.forEach((item)=> {
        item.addEventListener('click', showDetails);
    })
}


const showDetails = ({target}) => {
    if (target.className.includes('pokemon')) {
        target.childNodes[7].classList.toggle('active')
      }
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        algo();
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})