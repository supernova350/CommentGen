import config from './config.json';
const { fileExts, name, section, assignment, date, desc } = config;
import gen, { type IGen } from './gen';

// TODO: config validation

const genOptions: IGen = {
	fileExts,
	name,
	section,
	assignment,
	date: date.toLowerCase() === 'today' ? new Date() : new Date(Date.parse(date)),
	desc,
};

await gen(genOptions);
