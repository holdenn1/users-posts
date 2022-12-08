'use strict';

window.addEventListener('load', () => {
	const userPageHeader = document.querySelector('.peage__header');
	const posts = document.querySelector('.posts');
	const pageUrl = document.location.search;
	const searchParams = new URLSearchParams(pageUrl);
	const user = parseInt(searchParams.get('item'));
	const usersUrl = `https://jsonplaceholder.typicode.com/users/${user}`;
	const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
	fetch(usersUrl)
		.then((response) => response.json())
		.then((data) => {
			userPageHeader.insertAdjacentHTML(
				'beforeend',
				`
				<div id=${data['id']} class="user">
								<img src="https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png" alt="" class="avatar">
								<div class="user__description">
									<h4 class="user__name">${data['name']}</h4>
									<p class="user__city">City: ${data['address']['city']}</p>
									<a class="user__website" href="#">${data['website']}</a>
								</div>
							</div>
						</div>
						<div class="pege__main">
				`,
			);
		});
	fetch(postsUrl)
		.then((response) => response.json())
		.then((postData) => {
			postData.forEach((element) => {
				posts.insertAdjacentHTML(
					'beforeend',
					`<a 
					class="posts__link"
					href="./comments.html?post=${element.id}">
						<div id='${element.id}' class="posts__item">
							<img class="posts__photo" src="https://klike.net/uploads/posts/2018-12/1544870354_1.jpg" alt="">
							<p class="posts__description">${element.title}</p>
						</div>
					</a>`,
				);
			});
		});
});
