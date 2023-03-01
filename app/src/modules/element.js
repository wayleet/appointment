const templateForm = document.querySelector('.form');

const createComponent = (template) => {
	const component = template.content.cloneNode(true);
	return component;
};

const form = createComponent(templateForm);

const createRoleMenu = (eventButtonPatient, eventButtonAdmin) => {
	const chooseRole = document.createElement('div');
	chooseRole.className = 'choose-role';

	const buttonPatient = document.createElement('button');
	buttonPatient.id = 'patient';
	buttonPatient.textContent = 'Пациент';

	const buttonAdmin = document.createElement('button');
	buttonAdmin.id = 'admin';
	buttonAdmin.textContent = 'Админ';

	buttonPatient.addEventListener('click', eventButtonPatient);
	buttonAdmin.addEventListener('click', eventButtonAdmin);

	chooseRole.append(buttonPatient);
	chooseRole.append(buttonAdmin);

	return chooseRole;
};

const createLoginMenu = () => {
	const loginForm = document.createElement('form');
	loginForm.className = 'login-form';

	const labelEmail = document.createElement('label');
	labelEmail.setAttribute('for', 'email');
	const inputEmail = createInput('login', 'text', 'email', 'Почта');

	const labelPassword = document.createElement('label');
	labelPassword.setAttribute('for', 'password');
	const inputPassword = createInput('login', 'password', 'password', 'Пароль');

	const buttonLogin = document.createElement('button');
	buttonLogin.className = 'button-login';
	buttonLogin.textContent = 'Войти';

	loginForm.append(labelEmail, inputEmail, labelPassword, inputPassword, buttonLogin);

	return loginForm;
};

const createInput = (className, type, name, placeholder, label = 'login', id = '') => {
	const input = document.createElement('input');

	input.className = className;
	input.type = type;
	input.name = name;

	if (label === 'tab') {
		input.setAttribute('aria-controls', className);
		input.id = id;
		return input;
	}

	input.placeholder = placeholder;

	return input;
};

const createAdminPanel = (eventButtonExit) => {
	const divTabset = document.createElement('div');
	divTabset.className = 'tabset';

	const tab1 = createInput('current-appoinments', 'radio', 'tabset', '', 'tab', 'tab1');
	tab1.checked = true;

	const labelTab1 = document.createElement('label');
	labelTab1.setAttribute('for', 'tab1');
	labelTab1.textContent = 'Текущие';

	const tab2 = createInput('archive-appoinments', 'radio', 'tabset', '', 'tab', 'tab2');
	const labelTab2 = document.createElement('label');
	labelTab2.setAttribute('for', 'tab2');
	labelTab2.textContent = 'Архив';

	const buttonExit = document.createElement('button');
	buttonExit.className = 'exit';
	buttonExit.textContent = 'Выйти';
	buttonExit.addEventListener('click', eventButtonExit);

	const divTabPanels = document.createElement('div');
	divTabPanels.className = 'tab-panels';

	const sectionCurrent = document.createElement('section');
	sectionCurrent.className = 'tab-panel';
	sectionCurrent.id = 'current-appointments';

	const sectionArchive = document.createElement('section');
	sectionArchive.className = 'tab-panel';
	sectionArchive.id = 'archive-appointments';

	divTabPanels.append(sectionCurrent);
	divTabPanels.append(sectionArchive);

	divTabset.append(tab1, labelTab1, tab2, labelTab2, buttonExit, divTabPanels);

	return divTabset;
};

export { createComponent, createAdminPanel, createLoginMenu, createRoleMenu, form };
