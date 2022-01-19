# CommentGen
Automatic comment generator

## Usage
`npm i && npm run compile`

`node . <flags>`

### Example

`node . <flags>`
## Flags
| Flag           | Description                   | Usage                          | Example                  |
| -------------  | ----------------------------- | -----------------------------  | ------------------------ | 
| `--fileExts`   | File extensions to comment on | `--fileExts <lang1\|lang2...>` | `--fileExts js\|ts`      |
| `--name`       | Name to comment as            | `--name <name>`                | `--name John`            |
| `--section`    | Section to comment as         | `--section <section>`          | `--section Meta`         |
| `--assignment` | Assignment to comment as      | `--assignment <assignment>`    | `--assignment Verse`     |
| `--date`       | Date of assignment            | `--date <today/date>`          | `--date today`           |
| `--desc`       | Description of assignment     | `--desc <desc>`                | `--desc Metaverse Clone` |
| `--overwrite`  | Overwrite existing comments   | `--overwrite <true\|false>`    |  `--overwrite true`      |
