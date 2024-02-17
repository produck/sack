import { I } from '@produck/idiom-common';

export const toListString = array => {
	return I.Array.join(I.Array.map(array, name => `'${name}'`), ', ');
};
