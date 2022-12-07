'use strict';

const userItem = document.querySelector('.users__item');
const users = document.querySelector('.users');
const userName = document.querySelector('.users__name');
const userCity = document.querySelector('.users__city');
const userWebsite = document.querySelector('.users__website');

const url = 'https://jsonplaceholder.typicode.com/users';

fetch(url)
	.then((respose) => respose.json())
	.then((data) => {
		for (let key in data) {
			users.insertAdjacentHTML(
				'beforeend',
				`<a href="./user-page.html">
						<div id=${data[key]['id']} class="users__item">
							<div class="users__header">
								<img
									class="users__img"
									src="https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png"
									alt=""
								/>
							</div>
							<div class="users__main">
								<h4 class="users__name">${data[key]['name']}</h4>
								<p class="users__city">City: ${data[key]['address']['city']}</p>
								<a class="users__website" href="#">${data[key]['website']}</a>
							</div>
						</div>
					</a>`,
			);
		}
	})
	.then((data) => console.log(data));
