const root = document.querySelector('#root');

const setMinAttributeDateNow = (component, idDate) => {
	const today = new Date().toISOString().split('T')[0];
	component.querySelector(`#${idDate}`).setAttribute('min', today);
};

const render = (component, where = root) => {
	where.replaceChildren();
	where.append(component);
};

export { render, setMinAttributeDateNow };
