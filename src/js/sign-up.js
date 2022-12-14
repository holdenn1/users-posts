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
const ganderChoose = mainForm.gender;
const birthDateChoose = mainForm.birthDate;
const orientationChoose = mainForm.orientation;
const demandsChoose = [...mainForm.demand];
const photoFile = mainForm.photoFile;
const submitBtn = mainForm.submit;

let formItemCount = 0;
let userInfo = {};

window.addEventListener('load', () => {
	document.addEventListener('click', showsignUpForm);
	avatarFile.addEventListener('change', loadAvatar);
	mainForm.addEventListener('click', () => {
		sliderNavigation();
		showCurrentItem();
	});
	submitBtn.addEventListener('click', () => {
		if (validateArr[validateArr.length - 1][0].validate()) {
			setLocation();
			console.log(userInfo);
			mainForm.classList.remove('sign-up-form_active');
			formItemCount = 0;
			clearForm();
		}
	});
});

const validateArr = [
	[
		{
			validateId: 'emailInput',
			validate: () => {
				if (!checkEmail(emailInput)) {
					emailInput.classList.add('invalid');
					showErrorMassage('Email is invalid', 'Email is requred field');
					return false;
				}
				userInfo.email = emailInput.value;
				return true;
			},
		},
		{
			validateId: 'passwordInput',
			validate: () => {
				if (!checkPassword(passwordInput)) {
					passwordInput.classList.add('invalid');
					showErrorMassage(
						'Password must contain at least six characters, at least one letter, one number and one special character',
					);
					return false;
				}
				userInfo.password = passwordInput.value;
				return true;
			},
		},
	],
	[
		{
			validateId: 'nameInput',
			validate: () => {
				if (checkOnEmptyRow(nameInput)) {
					nameInput.classList.add('invalid');
					showErrorMassage('Name is requred field');
					return false;
				}
				userInfo.name = nameInput.value;
				return true;
			},
		},
		{
			validateId: 'ganderChoose',
			validate: () => {
				if (ganderChoose.value == '') {
					showErrorMassage('Choose your gender please, this is requred field');
					return false;
				}
				userInfo.gander = ganderChoose.value;
				return true;
			},
		},
		{
			validateId: 'birthDate',
			validate: () => {
				if (birthDateChoose.value == '') {
					showErrorMassage('Please indicate your birthday');
					return false;
				}
				if (birthDateChoose.value > subtractYears(6)) {
					showErrorMassage('You cannot be younger than six years old');
					return false;
				}
				userInfo.birth = birthDateChoose.value;
				return true;
			},
		},
	],
	[
		{
			validateId: 'orientationChoose',
			validate: () => {
				if (orientationChoose.value == '') {
					showErrorMassage('This field is required');
					return false;
				}
				userInfo.orientation = orientationChoose.value;
				return true;
			},
		},
	],
	[
		{
			validateId: 'demandsChoode',
			validate: () => {
				if (findDemand().length < 1) {
					showErrorMassage('You must choose at least one demand');
					return false;
				}
				userInfo.demands = findDemand().map((i) => i.id);
				return true;
			},
		},
	],
	[
		{
			validateId: 'uploadPhoto',
			validate: () => {
				if (photoFile.value == '') {
					showErrorMassage('Upload photo');
					return false;
				}
				userInfo.photo = photoFile.value;
				return true;
			},
		},
	],
];

function sliderNavigation() {
	if (
		event.target.closest('.sign-up-form__continue-btn') ||
		event.target.closest('.sign-up-form__buttons-next')
	) {
		if (validateForm(formItemCount)) {
			formItemCount++;
		}
	} else if (
		event.target.closest('.sign-up-form__buttons-prev') ||
		event.target.closest('.sign-up-form-avatar__buttons-prev')
	) {
		formItemCount--;
	}
}

function validateForm(index) {
	let validateArrItem = validateArr[index];
	let checkValue = validateArrItem.every((i) => i.validate());
	return checkValue;
}

function setLocation() {
	navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&addressdetails=1&accept-language=en`,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				userInfo.address = data;
			});
	});
}

function clearForm() {
	emailInput.value = '';
	passwordInput.value = '';
	nameInput.value = '';
	ganderChoose[0].checked = false;
	ganderChoose[1].checked = false;
	birthDateChoose.value = '';
	orientationChoose[0].checked = false;
	orientationChoose[1].checked = false;
	orientationChoose[2].checked = false;
	orientationChoose[3].checked = false;
	demandsChoose[0].checked = false;
	demandsChoose[1].checked = false;
	demandsChoose[2].checked = false;
	demandsChoose[3].checked = false;
	demandsChoose[4].checked = false;
	demandsChoose[5].checked = false;
	avatarImg.src = './assets/img/icons/avatar.webp';
	photoFile.value = '';
}

function showErrorMassage(text1, text2) {
	errMessage.textContent = emailInput.value ? text1 : text2;
	errMessage.style.top = '10px';
	setTimeout(() => {
		errMessage.style.top = '-70px';
	}, 3000);
}

function subtractYears(numOfYears, date = new Date()) {
	date.setFullYear(date.getFullYear() - numOfYears);
	let month = date.getUTCMonth() + 1;
	let day = date.getUTCDate();
	let year = date.getUTCFullYear();
	return year + '-' + month + '-' + day;
}

/* check function on cheks */
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

function findDemand() {
	return demandsChoose.filter((i) => i.checked == true);
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

nameInput.addEventListener('focus', () => {
	if (nameInput.classList.contains('invalid')) {
		nameInput.classList.remove('invalid');
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

nameInput.addEventListener('input', () => {
	if (checkOnEmptyRow(nameInput)) {
		nameInput.classList.add('invalid');
	}
	if (!checkOnEmptyRow(nameInput)) {
		nameInput.classList.remove('invalid');
	}
});
//=========================================================================================
function showCurrentItem() {
	formItems.forEach((item) => {
		if (item.classList.contains('sign-up-form__item_active')) {
			item.classList.remove('sign-up-form__item_active');
		}
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
