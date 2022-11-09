# Set Calver javascript action

This action determins a Calver version number based on a UTC date and the branch name. The version is stored in the environment variable `PACKAGE_VERSION`.

## Inputs

### `version_prefix`

String to prefix the version string with. Default `""`.

### `default_branch`

Name of the default branch. Default `refs/heads/main`.

### `format`

*Required* Day.js compatible date format string. Default `YY.M.D`.

## Outputs

### `package_version`

The determined version string. Also stored in the environment variable `PACKAGE_VERSION`.  

## Example usage

```yaml
      - name: Set Calver Version
        uses: Nelyx/action-calver@v1.0.0
        id: setcalver
        with:
          default_branch: 'refs/heads/main'
          format: "YY.M.D"
          version_prefix: ""
```