'use strict';

const signUpBtn = document.querySelector('.sign-up-btn');
const avatarImg = document.querySelector('#avatar');
const avatarFile = document.querySelector('#avatar-file');
const errMessage = document.querySelector('.sign-up-form__error');
const formItems = [...document.getElementsByClassName('sign-up-form__item')];

const mainForm = document.forms.signUp;
const emailInput = mainForm.email;
const passwordInput = mainForm.password;
const nameInput = mainForm.name;

window.addEventListener('load', () => {
	document.addEventListener('click', showsignUpForm);
	avatarFile.addEventListener('change', loadAvatar);
	mainForm.addEventListener('click', () => {
		sliderNavigation();
		showCurrentItem();
	});
});

let formItemCount = 0;
const validateForm = [
	[
		{
			validateId: 'emailInput',
			validate: () => {
				if (!checkEmail(emailInput)) {
					emailInput.classList.add('invalid');
					errMessage.textContent = emailInput.value ? 'Email is invalid' : 'Email is requred field';
					errMessage.style.top = '10px';
					setTimeout(() => {
						errMessage.style.top = '-70px';
					}, 3000);
					return false;
				}
				return true;
			},
		},
		{
			validateId: 'passwordInput',
			validate: () => {
				if (!checkPassword(passwordInput)) {
					passwordInput.classList.add('invalid');
					errMessage.textContent = passwordInput.value
						? 'Password must contain at least 6 characters, at least one letter, one number and one special character'
						: 'Password is requred field';
					errMessage.style.top = '10px';
					setTimeout(() => {
						errMessage.style.top = '-70px';
					}, 3000);
					return false;
				}
				return true;
			},
		},
	],
	[
		{ validateId: 'nameInput', validate: () => console.log('Hi3!') },
		{ validateId: 'ganderChoose', validate: () => console.log('Hi4!') },
		{ validateId: 'birthDate', validate: () => console.log('Hi5!') },
	],
	[{ validateId: 'orientationChoose', validate: () => console.log('Hi6!') }],
	[{ validateId: 'demandsChoode', validate: () => console.log('Hi6!') }],
	[{ validateId: 'uploadPhoto', validate: () => console.log('Hi6!') }],
];

function sliderNavigation() {
	if (
		event.target.closest('.sign-up-form__continue-btn') ||
		event.target.closest('.sign-up-form__buttons-next')
	) {
		if (test()) {
			formItemCount++;
		}
	} else if (
		event.target.closest('.sign-up-form__buttons-prev') ||
		event.target.closest('.sign-up-form-avatar__buttons-prev')
	) {
		formItemCount--;
	}
}

const validateArr = validateForm[formItemCount];

function test() {
	let checkValue = validateArr.every((i) => i.validate());
	return checkValue;
}

/* regular expression on cheks */
function checkOnEmptyRow(name) {
	return /^\s*$/.test(name.value);
}

function checkEmail(email) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email.value,
	);
}

function checkPassword(pass) {
	return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(pass.value);
}

/* Check email and passworn on focus */
emailInput.addEventListener('focus', () => {
	if (emailInput.classList.contains('invalid')) {
		emailInput.classList.remove('invalid');
	}
});

passwordInput.addEventListener('focus', () => {
	if (passwordInput.classList.contains('invalid')) {
		passwordInput.classList.remove('invalid');
	}
});

/* Check email and password on input */
emailInput.addEventListener('input', () => {
	if (!checkEmail(emailInput)) {
		emailInput.classList.add('invalid');
	}
	if (checkEmail(emailInput)) {
		emailInput.classList.remove('invalid');
	}
});

passwordInput.addEventListener('input', () => {
	if (!checkPassword(passwordInput)) {
		passwordInput.classList.add('invalid');
	}
	if (checkPassword(passwordInput)) {
		passwordInput.classList.remove('invalid');
	}
});
//=========================================================================================
function showCurrentItem() {
	formItems.forEach((item) => {
		item.classList.contains('sign-up-form__item_active') &&
			item.classList.remove('sign-up-form__item_active');
	});
	formItems[formItemCount].classList.add('sign-up-form__item_active');
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
