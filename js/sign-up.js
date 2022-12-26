'use strict';

const signUpBtn = document.querySelector('.sign-up-btn');
const avatarImg = document.querySelector('#avatar');
const avatarFile = document.querySelector('#avatar-file');
const formItems = [...document.getElementsByClassName('sign-up-form__item')];

const mainForm = document.forms.signUp;

window.addEventListener('load', () => {
	document.addEventListener('click', showsignUpForm);
	avatarFile.addEventListener('change', loadAvatar);
	mainForm.addEventListener('click', () => {
		sliderNavigation();
		showCurrentItem()
	});
});

let formItem = 0;

function sliderNavigation() {
	if (
		event.target.closest('.sign-up-form__continue-btn') ||
		event.target.closest('.sign-up-form__buttons-next')
	) {
		formItem++;
	} else if (
		event.target.closest('.sign-up-form__buttons-prev') ||
		event.target.closest('.sign-up-form-avatar__buttons-prev')
	) {
		formItem--;
	}
}

function showCurrentItem() {
	formItems.forEach((item) => {
		item.classList.contains('sign-up-form__item_active') &&
			item.classList.remove('sign-up-form__item_active');
	});
	formItems[formItem].classList.add('sign-up-form__item_active')
}


function showsignUpForm() {
	if (event.target.closest('.sign-up-btn')) {
		mainForm.classList.toggle('sign-up-form_active');
	}
	if (!event.target.closest('.sign-up-btn') && !event.target.closest('.sign-up-form')) {
		mainForm.classList.remove('sign-up-form_active');
	}
}

function loadAvatar() {
	if (this.files && this.files[0]) {
		avatarImg.onload = () => URL.revokeObjectURL(avatarImg.src);
		avatarImg.src = URL.createObjectURL(this.files[0]);
	}
}
