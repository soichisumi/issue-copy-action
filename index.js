const core = require('@actions/core');
const github = require('@actions/github');

const getIssueNumber = () => {
    const issue = github.context.payload.issue;
    if (!issue) {
        throw new Error("No issue provided");
    }
    return issue.number;
};

// getIssue from context
const getIssue = async (token) => {
    let octocat = new github.GitHub(token);
    const issueNum = getIssueNumber();

    const repo = github.context.repo;
    const issue = await octocat.issues.get({
        owner: repo.owner,
        repo: repo.repo,
        issue_number: issueNum,
    });
    
    return issue;
};

const checkKeywords = (keywords, body) => {
    const lowerBody = body.toLowerCase();
    for(let k of keywords) {
        if (lowerBody.toLowerCase().includes(k)){
            return true;
        }
    }
    return false;
};

const createNewIssue = async (token, owner, repoName, title, body, assignees, labels, fromIssue) => {
    const octokit = new github.GitHub(token);
    if (fromIssue) {
        body = body + `\n\ncopiedFrom: ${fromIssue}`;
    }

    const res = await octokit.issues.create(
        {
            owner: owner,
            repo: repoName,
            title: title,
            body: body,
            assignees: assignees,
            labels: labels,
        }
    );
    return [res.id, res.number].join(':');
};

async function run() {
  try { 
    const keyword = core.getInput('keyword', {required: true});
    const repo = core.getInput('repo', {required: true}); // format: $OWNER/$REPO_NAME
    
    const splitted = repo.split('/');
    const owner = splitted[0];
    const repoName = splitted[1];

    const token = core.getInput('github-token');
    const issue = await getIssue(token);

    if (!checkKeywords([keyword], issue.data.body)){
      console.log("Keyword not included");
      return;
    }

    const created = await createNewIssue(token, owner, repoName, issue.data.title, 'this is body', ['soichisumi'], [], issue.data.html_url);

    core.setOutput('created', created);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();