# Issue Copy Action

This action copies issue to another repository by any keyword.

## Example usage

### Screen Shot

#### Base issue

<img width="751" alt="スクリーンショット 2019-12-25 18 05 22 2" src="https://user-images.githubusercontent.com/30210641/71442391-fc2a9880-2748-11ea-926a-a62793dc93ea.png">

#### Copied issue

<img width="739" alt="スクリーンショット 2019-12-25 18 05 11 2" src="https://user-images.githubusercontent.com/30210641/71442377-eae18c00-2748-11ea-8b64-c751e257ebf1.png">

### workflow.yaml

```yaml
uses: soichisumi/issue-copy-action@v0.2.0
with:
  keyword: "/copy"
  targetRepository: soichisumi/issue-copy-action
  githubToken: ${{ secrets.GITHUB_TOKEN }}
  contentOfNewIssue: 'prefix of newly created issue'
```

## Inputs

### `targetRepository`

**Required** The repository to which generated issue is copied. format: \$OWNER/\$REPO_NAME.

### `githubToken`

**Required** Set GITHUB_TOKEN to this input.

### `keyword`

**optional** Keyword to trigger this action. The action is executed in the case of lowercased issue comment matched with lowercased keyword.

Default: `/copy`

### `contentOfNewIssue`

**optional** Content of newly created issue.

Default: `''`

## Outputs

### `created`

The issue which is created by this action.
