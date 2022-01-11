import config from './config.json';
const { fileExts, name, section, assignment, date, desc, overwrite } = config;
import gen, { type IGen } from './gen';

// TODO: config validation
// TODO: CLI

const genOptions: IGen = {
	fileExts,
	name,
	section,
	assignment,
	date: date.toLowerCase() === 'today' ? new Date() : new Date(Date.parse(date)),
	desc,
	overwrite,
};

try {
	await gen(genOptions);
	console.info('done');
} catch (e) {
	const error = e as Error;
	console.error(error);
}
