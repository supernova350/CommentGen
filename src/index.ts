import genComments, { type IGenOptions } from './gen';
import yargs from 'yargs';

const args = yargs(process.argv.slice(2))
	.option('fileExts', {
		alias: ['exts'],
		describe: 'File extensions to write comments on (format: .js|.ts)',
		default: '.js|.ts',
		type: 'string',
		demandOption: true,
	})
	.option('name', {
		alias: ['n'],
		describe: 'Name to comment as',
		type: 'string',
		demandOption: true,
	})
	.option('section', {
		alias: ['class'],
		describe: 'Section to comment as',
		type: 'string',
		demandOption: true,
	})
	.option('assignment', {
		alias: ['a'],
		describe: 'Assignment to comment as',
		type: 'string',
		demandOption: true,
	})
	.option('date', {
		describe: 'Date to comment as',
		type: 'string',
		demandOption: false,
	})
	.option('desc', {
		alias: ['description'],
		desc: 'Description of assignment',
		type: 'string',
		demandOption: true,
	})
	.option('overwrite', {
		alias: ['o'],
		desc: 'To overwrite existing comments (true) or not (false)',
		type: 'boolean',
		demandOption: true,
	})
	.parseSync();

const { fileExts, name, section, assignment, date, desc, overwrite } = args;

const options: IGenOptions = {
	fileExts: fileExts.split('|'),
	name,
	section,
	assignment,
	date: date !== undefined && date.toLowerCase() === 'today' ? new Date(Date.parse(date)) : new Date(),
	desc,
	overwrite,
};

try {
	await genComments(options as IGenOptions);
	console.info('[+] finished writing comments');
} catch (e) {
	const error = e as Error;
	console.error(error);
}
