# Set Calver javascript action

This action determins a CalVer version number based on a UTC date and the branch name. The version is stored in the environment variable `PACKAGE_VERSION`.

## Inputs

### `version_prefix`

String to prefix the version string with. Default `""`.

## Outputs

### `package_version`

The determined version string. Also stored in the environment variable `PACKAGE_VERSION`.  

## Example usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
```