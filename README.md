# Issue Copy Action

This action copies issue to another repository by any keyword.

## Inputs

### `targetRepository`

**Required** The repository to which generated issue is copied. format: $OWNER/$REPO_NAME.

### `githubToken`

**Required** Set GITHUB_TOKEN to this input.

### `keyword`

**optioal** Pass ${{ secrets.GITHUB_TOKEN }}.

Default: `/copy`

## Outputs

### `created`

The issue which is created by this action.

## Example usage

### workflow.yaml

```yaml
uses: soichisumi/issue-copy-action@v0.1.0
with:
  keyword: "/copy"
  targetRepository: soichisumi/issue-copy-action
  githubToken: ${{ secrets.GITHUB_TOKEN }}
  contentOfNewIssue: 'prefix of newly created issue'
```

### Screen Shot

#### Base issue
<img width="1003" alt="スクリーンショット 2019-12-25 18 05 22" src="https://user-images.githubusercontent.com/30210641/71440662-44de5380-2741-11ea-837d-d0204ed5fa8f.png">

#### Copied issue
<img width="1002" alt="スクリーンショット 2019-12-25 18 05 11" src="https://user-images.githubusercontent.com/30210641/71440638-28dab200-2741-11ea-9ce2-73282a5d4ff3.png">