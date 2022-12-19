'use strict';

const userPageHeader = document.querySelector('.peage__header');
const postsLoadingBtn = document.querySelector('#load-posts');
const postsOnLoad = document.getElementsByClassName('posts__link');
const posts = document.querySelector('.posts');
const spinner = document.querySelector('.lds-default');
const contantSpinner = document.querySelector('.load-contant');

let observer;
let user;

window.addEventListener('load', () => {
	const pageUrl = document.location.search;
	const searchParams = new URLSearchParams(pageUrl);
	user = parseInt(searchParams.get('id'));
	loadUserTitle();
	loadUserPosts();
});

async function loadUserTitle() {
	try {
		const response = await fetch(`http://localhost:3000/users/${user}`);
		const data = await response.json();
		const {
			id,
			name,
			photo,
			address: { city },
			website,
		} = data;
		userPageHeader.insertAdjacentHTML(
			'beforeend',
			`<div id=${id} class="user">
								<img src="${photo}" alt="" class="avatar">
								<div class="user__description">
									<h4 class="user__name">${name}</h4>
									<p class="user__city">City: ${city}</p>
									<a class="user__website" href="#">${website}</a>
								</div>
							</div>
						</div>
						<div class="pege__main">`,
		);
	} catch {
		console.error(e);
		alert('Error: User not found');
	} 
}

async function addPosts(start) {
	try {
		let limit = 4;
		const response = await fetch(
			`http://localhost:3000/posts?userId=${user}&_start=${start}&_limit=${limit}`,
		);
		const data = await response.json();
		data.forEach((element) => {
			const { id, photo, title, body } = element;
			posts.insertAdjacentHTML(
				'beforeend',
				`<a class="posts__link"
					target="_blank"
					href="./comments.html?postId=${id}">
						<div class="posts__item">
							<img id='${id}' class="posts__photo" src="${photo}" alt="">
							<h3 class="posts__title">${title}</h3>
							<p class="posts__description">${body}</p>
						</div>
					</a>`,
			);
		});
		return { hasMore: data.length === limit };
	} catch (error) {
		console.error(error);
	}
}

async function loadUserPosts() {
	try {
		spinner.style.display = 'flex';
		const { hasMore } = await addPosts(0);
		if (hasMore) {
			observer = observContant();
		}
	} catch (error) {
		console.error(error);
		alert('Error: Posts not found');
	} finally {
		spinner.style.display = 'none';
	}
}

async function loadMorePosts() {
	try {
		contantSpinner.style.height = 'auto';
		const { hasMore } = await addPosts(postsOnLoad.length);
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
			loadMorePosts();
		}
	});
	observer.observe(contantSpinner);
	return observer;
}
