export const getFullName = (firstName: string, lastName?: string): string => {
	return lastName ? `${firstName} ${lastName}` : firstName;
};
