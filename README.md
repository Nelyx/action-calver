# Set Calver javascript action

This action determines a Calver version number based on a UTC date and the branch name. The version is stored in the environment variables `PACKAGE_VERSION` and `PACKAGE_SUFFIX`.

## Inputs

### `version_prefix`

String to prefix the version string with. Default `""`.

### `default_branch`

Name of the default branch. For builds from other branches, the branch name is used as a pre-release suffix in the environment variable and output. Default `refs/heads/main`.

### `format`

**Required** Day.js compatible date format string.
Default `YY.M.D`. Below is a table of formats and what their output version would be for the date 2022-10-09 with a build number of 1. Notice that the first one has 4 parts and others have 3 parts.
| Format | Result |
|----------|-------------|
| YY.M.D | 22.10.9.1 |
| YY.MDD | 22.1009.1 |
| YYMM.D | 2210.9.1 |
| YYYY.MDD | 2022.1009.1 |

## Outputs

### `package_version`

The determined version string. Also stored in the environment variable `PACKAGE_VERSION`.

### `package_suffix`

If the action is triggered on a non-default branch its assumed to be a prerelease and the suffix will be the branch name. Otherwise it will be an empty string. Also stored in the environment variable `PACKAGE_SUFFIX`.

## Example usage

```yaml
- name: Set Calver Version
  uses: Nelyx/action-calver@v1.0.0
  id: setcalver
  with:
    default_branch: 'refs/heads/main'
    format: 'YY.M.D'
    version_prefix: ''
```
