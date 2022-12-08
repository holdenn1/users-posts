'use strict';

const userItem = document.querySelector('.users__item');
const users = document.querySelector('.users');
const userName = document.querySelector('.users__name');
const userCity = document.querySelector('.users__city');
const userWebsite = document.querySelector('.users__website');

const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url)
	.then((respose) => respose.json())
	.then(data => {
		data.forEach(element => {
			users.insertAdjacentHTML(
				'beforeend',
				`<a class="users__link"
				href="./user-page.html?${element.id}">
				<div id=${element.id} class="users__item">
							<div class="users__header">
								<img
									class="users__img"
									src="https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png"
									alt=""
								/>
							</div>
							<div class="users__main">
								<h4 class="users__name">${element.name}</h4>
								<p class="users__city">City: ${element.address.city}</p>
								<p class="users__website">${element.website}</p>
							</div>
							</div>
							</a>`
			);
		});
	})

