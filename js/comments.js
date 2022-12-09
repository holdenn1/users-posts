'use strict'

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('post'));
	const postsUrl = `http://localhost:3000/posts?id=${post}`;
	const commentHeader = document.querySelector('.comment-header')
	fetch(postsUrl)
	.then(response => response.json())
	.then(postData => {
		console.log(postData[0]['id'])
		commentHeader.insertAdjacentHTML(
			'beforeend',
			`<div class="post">
			<div class="post__item">
				<img
					class="post__photo"
					src="${postData[0]['photo']}"
					alt=""
				/>
				<div>
				<h3 class="post__title">${postData[0]['title']}</h3>
				<p class="post__description">${postData[0]['body']}</p>
				</div>
			</div>
		</div>`
		)
	})
})