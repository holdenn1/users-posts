'use strict';
import './../css/index.css'
const commentHeader = document.querySelector('.comments-header');
const commentMain = document.querySelector('.comments-main');
const commentOnLoad = document.getElementsByClassName('comment');
const commentsLoadingBtn = document.querySelector('#load-comments');
const spinner = document.querySelector('.lds-default');
const contantSpinner = document.querySelector('.load-contant');
const err = document.querySelector('.error');

let post;
let observer;

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	post = parseInt(searchParams.get('postId'));
	loadPost();
	loadComments();
});

async function loadPost() {
	try {
		const response = await fetch(`http://localhost:3000/posts?id=${post}`);
		const data = await response.json();
		data.forEach((data) => {
			const { photo, title, body } = data;
			commentHeader.insertAdjacentHTML(
				'beforeend',
				`<div class="post">
				<div class="post__item">
					<img
						class="post__photo"
						src="${photo}"
						alt=""/>
					<div class="post__text-content">
					<h3 class="post__title">${title}</h3>
					<p class="post__description">${body}</p>
					</div>
				</div>
			</div>`,
			);
		});
	} catch (error){
		console.error(error);
		err.style.display = 'flex';
		err.insertAdjacentHTML('afterbegin', `<h4 class="error-text">Error: User not found</h4>`);
	}
}

async function addComments(start) {
	try {
		const limit = 4;
		const response = await fetch(
			`http://localhost:3000/comments?postId=${post}&_start=${start}&_limit=${limit}`,
		);
		const data = await response.json();
		data.forEach((element) => {
			const { email, body } = element;
			commentMain.insertAdjacentHTML(
				'beforeend',
				`<div class="comment">
						<h3 class="user-email">${email}</h3>
						<p class="comment-text">${body}</p>
						
					</div>`,
			);
		});
		return { hasMore: data.length === limit };
	} catch (error) {
		console.error(error);
	}
}

async function loadComments() {
	try {
		spinner.style.display = 'flex';
		const { hasMore } = await addComments(0);
		if (hasMore) {
			observer = observContant();
		}
	} catch (error) {
		console.error(error);
		err.style.display = 'flex';
		err.insertAdjacentHTML('afterbegin', `<h4 class="error-text">Error: Posts not found</h4>`);
	} finally {
		spinner.style.display = 'none';
	}
}

async function loadMoreComments() {
	try {
		contantSpinner.style.height = 'auto';
		const { hasMore } = await addComments(commentOnLoad.length);
		if (!hasMore && observer) {
			observer.disconnect();
		}
	} catch (error) {
		console.error(error);
	} finally {
		contantSpinner.style.height = '0';
	}
}

function observContant() {
	const observer = new IntersectionObserver(([{ isIntersecting }]) => {
		if (isIntersecting) {
			loadMoreComments();
		}
	});
	observer.observe(contantSpinner);
	return observer;
}
