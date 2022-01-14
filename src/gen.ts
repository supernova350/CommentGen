import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import readdirp from 'readdirp';

export interface IGenOptions {
	fileExts: string[];
	name: string;
	section: string;
	assignment: string;
	date: Date;
	desc: string;
	overwrite: boolean;
}

export default async function genComments({ fileExts, name, section, assignment, date, desc, overwrite }: IGenOptions) {
	const getCommentText = () =>
		`/****************************************\n - Name: ${name}\n - Section: ${section}\n - Assignment: ${assignment}\n - Date: ${date.toLocaleDateString()}\n - Description: ${desc}\n****************************************/\n`;

	const files = readdirp(join(process.cwd(), 'input'), {
		fileFilter: fileExts.map((v) => '*.' + v),
	});

	for await (const entry of files) {
		const { fullPath } = entry;

		console.log(fullPath);

		const data = readFileSync(fullPath).toString().split('\n');

		if (data[0] === '/****************************************') {
			// comment has already been generated for file

			if (!overwrite) {
				continue;
			}

			data.splice(
				0, // beginning of file
				getCommentText().split('\n').length, // delete existing comment
				getCommentText(),
			);
		} else {
			data.splice(
				0, // beginning of file
				0, // don't delete anything
				getCommentText(),
			);
		}

		const text = data.join('\n');
		writeFileSync(fullPath, text);
	}
}
