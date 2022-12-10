'use strict';

window.addEventListener('load', () => {
	const pageUrl = document.location.search;
	const searchParams = new URLSearchParams(pageUrl);
	const user = parseInt(searchParams.get('id'));
	const usersUrl = `http://localhost:3000/users/${user}`;
	const postsUrl = `http://localhost:3000/posts?userId=${user}`;
	const userPageHeader = document.querySelector('.peage__header');
	const posts = document.querySelector('.posts');

	async function loadUserTitle(url) {
		const response = await fetch(url);
		const data = await response.json();
		userPageHeader.insertAdjacentHTML(
			'beforeend',
			`<div id=${data.id} class="user">
							<img src="${data.photo}" alt="" class="avatar">
							<div class="user__description">
								<h4 class="user__name">${data.name}</h4>
								<p class="user__city">City: ${data.address.city}</p>
								<a class="user__website" href="#">${data.website}</a>
							</div>
						</div>
					</div>
					<div class="pege__main">`,
		);
	}
	loadUserTitle(usersUrl);

	async function loadUserPosts (url){
		const response = await fetch(url)
		const data = await response.json()
		data.forEach((element) => {
			posts.insertAdjacentHTML(
				'beforeend',
				`<a 
				class="posts__link"
				href="./comments.html?postId=${element.id}">
					<div class="posts__item">
						<img id='${element.id}' class="posts__photo" src="${element.photo}" alt="">
						<h3 class="posts__title">${element.title}</h3>
						<p class="posts__description">${element.body}</p>
					</div>
				</a>`,
			);
		});
	}
	loadUserPosts(postsUrl)
});
