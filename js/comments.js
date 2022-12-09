'use strict';

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('postId'));
	const postsUrl = `http://localhost:3000/posts?id=${post}`;
	const commentsUrl = `http://localhost:3000/comments?postId=${post}`;
	const commentHeader = document.querySelector('.comments-header');
	const commentMain = document.querySelector('.comments-main');

	fetch(postsUrl)
		.then((response) => response.json())
		.then((postData) => {
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
		</div>`,
			);
		});

	fetch(commentsUrl)
		.then((response) => response.json())
		.then((commentsData) => {
			commentsData.forEach((element) => {
				commentMain.insertAdjacentHTML(
					'beforeend',
					`<div postId="${element.postId}" class="comment">
						<h3 class="user-email">${element.email}</h3>
						<p class="comment-text">${element.body}</p>
					</div>`,
				);
			});
		});
});
