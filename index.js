const core = require('@actions/core');
const lib = require('./lib');

async function run() {
  try {
    const keyword = core.getInput('keyword', {required: true});
    const repo = core.getInput('targetRepository', {required: true}); // format: $OWNER/$REPO_NAME
    const contentOfNewIssue = core.getInput('contentOfNewIssue', {require: true});

    const splitted = repo.split('/');
    const owner = splitted[0];
    const repoName = splitted[1];

    const token = core.getInput('githubToken');
    const issue = await lib.getIssueFromContext(token);

    if (!lib.checkKeywords([keyword], lib.getIssueCommentFromContext().body)){
      console.log(`Keyword not included. keyword: ${keyword}, ${issue.data.body}`);
      return;
    }

    const created = await lib.createNewIssue(token, owner, repoName, issue.data.title, contentOfNewIssue, ['soichisumi'], [], issue.data.html_url);

    core.setOutput('created', created);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();