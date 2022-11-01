export const convertObjToReactSelectArr = obj => {
	if (!obj) return [];

	const options = Object.entries(obj)?.map(([value, label]) => ({ value, label }));

	return options;
};
