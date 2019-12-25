# Issue Copy Action

This action copies issue to another repository by any keyword.

## Inputs

### `targetRepository`

**Required** Pass ${{ secrets.GITHUB_TOKEN }}.

### `githubToken`

**Required** Set GITHUB_TOKEN to this input.

### `keyword`

**optioal** Pass ${{ secrets.GITHUB_TOKEN }}.

Default: `/copy`

## Outputs

### `created`

The issue which is created by this action.

## Example usage

```yaml
uses: soichisumi/issue-copy-action@v0.1.0
with:
  keyword: "/copy"
  targetRepository: soichisumi/issue-copy-action
  githubToken: ${{ secrets.GITHUB_TOKEN }}
```