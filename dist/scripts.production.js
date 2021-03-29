let pokemonRepository=function(){let e=[],t='https://pokeapi.co/api/v2/pokemon/?limit=151';function n(t){e.push(t)}function o(e,t){e.addEventListener('click',function(){i(t)})}function i(e){l(e).then(function(){a(e)})}function l(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types}).catch(function(e){console.error(e)})}function a(e){let t=document.querySelector('.modal-body'),n=document.querySelector('.modal-title');n.innerText='',t.innerText='';let o=document.createElement('h1');o.innerText=e.name;let i=document.createElement('img');i.classList.add('modal-img'),i.style='width: 40%',i.src=e.imageUrl;let l=document.createElement('p');l.innerText=`Height: ${e.height}`;let a=document.createElement('div');a.classList.add('types-container'),e.types.forEach(e=>{let t=document.createElement('div'),n=document.createElement('p');n.innerText=e.type.name,t.classList.add('type'),t.classList.add(e.type.name),t.appendChild(n),a.appendChild(t)}),n.appendChild(o),t.appendChild(a),t.appendChild(l),t.appendChild(i)}return{add:n,getAll:function(){return e},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:l,addListItem:function(e){let t=document.querySelector('.pokemon-list'),n=document.createElement('li');n.classList.add('group-list-item');let i=document.createElement('button');i.innerText=e.name,i.classList.add('button'),i.classList.add('btn'),i.classList.add('col'),i.setAttribute('data-bs-target','#pokeModal'),i.setAttribute('data-bs-toggle','modal'),i.type='button',n.appendChild(i),t.appendChild(n),o(i,e)},addDetailsListener:o,showDetails:i,showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(e=>{pokemonRepository.addListItem(e)})});