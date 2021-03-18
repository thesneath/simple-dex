let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 2.33,
        type: ['Grass', 'Poison']
    },
    {
        name: 'Charmander',
        height: 2,
        type: ['Fire']
    },
    {
        name: 'Squirtle',
        height: 1.67,
        type: ['Water']
    },
    {
        name: 'Pikachu',
        height: 1.33,
        type: ['Electric']
    },
    {
        name: 'Eevee',
        height: 1,
        type: ['Normal']
    },
    {
        name: 'Dragonite',
        height: 7.25,
        type: ['Dragon', 'Flying']
    } 
];

// this loops through the pokemonList array and prints a <div> to the DOM containing: "'pokemon name' (height: 'height')" 

document.write("<div class=\"text\">");
for(i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    if(pokemonList[i].height > 5){
        document.write(' - Crikey, look at the size of this one!')
    }
    document.write("<br><br>");
}
document.write("</div>");
