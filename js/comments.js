'use strict'

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('post'));
	const postsUrl = `https://jsonplaceholder.typicode.com/posts/${post}`;
	const commentHeader = document.querySelector('.comment-header')
	fetch(postsUrl)
	.then(response => response.json())
	.then(postData => {
		commentHeader.insertAdjacentHTML(
			'beforeend',
			`<div class="post">
			<div class="post__item">
				<img
					class="post__photo"
					src="https://klike.net/uploads/posts/2018-12/1544870354_1.jpg"
					alt=""
				/>
				<p class="post__description">${postData['title']}</p>
			</div>
		</div>`
		)
	})
})