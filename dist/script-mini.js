let pokemonRepository = function () { let t = []; function e(e) { t.push(e) } function n() { return t } return document.querySelector("#modal-container"), { add: e, getAll: n, addListItem: function t(e) { let n = document.querySelector(".pokemon-list"), o = document.createElement("li"), i = document.createElement("button"); o.classList.add("col-md-3"), i.classList.add("btn", "btn-primary"), i.innerText = e.name, i.dataset.toggle = "modal", i.dataset.target = "#modal-container", o.appendChild(i), n.appendChild(o), i.addEventListener("click", function (t) { (function t(e) { pokemonRepository.loadDetails(e).then(function () { var t; let n, o, i, a, r, p; t = e, n = $(".modal-body"), o = $(".modal-title"), o.empty(), n.empty(), i = $(`<h2>${t.name}</h2>`), a = $(`<img src="${t.imageUrl}"/>`), r = $(`<p>Height: ${t.height}</p>`), p = $(`<p>Types: ${t.types.map(t => t.type.name)}</p>`), o.empty(), n.empty(), o.append(i), n.append(a), n.append(r), n.append(p) }) })(e) }) }, loadList: function t() { return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function (t) { return t.json() }).then(function (t) { t.results.forEach(function (t) { e({ name: t.name, detailsURL: t.url }) }) }).catch(function (t) { console.error(t) }) }, loadDetails: function t(e) { return fetch(e.detailsURL).then(function (t) { return t.json() }).then(function (t) { e.imageUrl = t.sprites.front_default, e.height = t.height, e.types = t.types }).catch(function (t) { console.error(t) }) } } }(); pokemonRepository.loadList().then(function () { pokemonRepository.getAll().forEach(function (t) { pokemonRepository.addListItem(t) }) });