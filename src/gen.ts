import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import readdirp from 'readdirp';

import IGenOptions from './interfaces/IGenOptions';

export default async function genComments({
	fileExts,
	name,
	section,
	assignment,
	date,
	desc,
	overwrite,
}: IGenOptions): Promise<void> {
	const commentText = `/${'*'.repeat(
		40,
	)}\n - Name: ${name}\n - Section: ${section}\n - Assignment: ${assignment}\n - Date: ${date.toLocaleDateString()}\n - Description: ${desc}\n${'*'.repeat(
		40,
	)}/\n`;

	const files = readdirp(join(process.cwd(), 'input'), {
		fileFilter: fileExts.map(v => '*.' + v),
	});

	return new Promise<void>(async (resolve, reject) => {
		try {
			for await (const entry of files) {
				const { fullPath } = entry;
				const data = readFileSync(fullPath, 'utf-8').split('\n');

				if (data[0][0] === '/') {
					if (!overwrite) continue;
					data.splice(0, commentText.split('\n').length, commentText);
					return;
				} else {
					data.splice(0, 0, commentText);
				}

				const text = data.join('\n');
				writeFileSync(fullPath, text);

				return resolve();
			}
		} catch (e) {
			const error = e as Error;
			return reject({ error });
		}
	});
}
