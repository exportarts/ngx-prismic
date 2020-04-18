# Publishing a new version

## 1. Change version

Change the version in `package.json` and `lib/package.json`.

## 2. Build the library and update changelog

- `yarn build:lib`
- `yarn changelog`

## 3. Commit and Tag

- Perform a commit with the new version as the message (e.g `0.4.2`)
- Get the commit's hash with `git log`
- Tag the commit with `git tag -a "vX.Y.Z" -m "vX.Y.Z" <COMMIT_HASH>`
- Push the tags with `git push origin --tags vX.Y.Z`

## 4. Publish library

- `cd dist/lib`
- `npm publish`
