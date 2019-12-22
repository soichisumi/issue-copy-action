const core = require('@actions/core');
const github = require('@actions/github');
const wait = require('./wait');

const getPRNumber = () => {
    const pr = github.context.payload.pull_request;
    if (!pr) {
        return undefined;
    }
    return pr.number;
};

const getIssueNumber = () => {
    core.debug('getIssueNumber');
    const issue = github.context.payload.issue;
    if (!issue) {
        return undefined;
    }
    return issue.number;
}

const getRepo = () => {
    const repo = github.context.repo;
    return repo;
}

const getIssue = async (token) => {
    core.debug('getIssue');
    let octocat = new github.GitHub(token);
    const issueNum = getIssueNumber();

    if (!issueNum) {
        throw new Error("No issue provided");
    }
    const repo = getRepo();
    const issue = await octocat.issues.get({
        owner: repo.owner,
        repo: repo.repo,
        num: issueNum,
    });
    
    return issue;
};

const checkKeywords = (keywords, title, body) => {
    core.debug('checkKeyword');
    const lowerBody = body.toLowerCase()
    for(let k of keywords) {
        if (k.toLowerCase().includes(k)){
            return true;
        }
    }
    return false;
}

const createNewIssue = async (token, owner, repoName, title, body, assignees, labels, fromIssue) => {
    core.debug('createNewIssue');
    const octokit = new github.GitHub(token);
    if (!!fromIssue) {
        body = body + `\n\ncopiedFrom: ${fromIssue}`
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
    )
    return [res.id, res.number].join(':')
};

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const keyword = core.getInput('keyword', {required: true});
    const repo = core.getInput('repo', {required: true}); // owner/repoName
    
    const splitted = repo.split('/')
    const owner = splitted[0];
    const repoName = splitted[1];

    const token = core.getInput('github-token');
    const issue = await getIssue(token);

    if (!checkKeywords([keyword], issue.data.title, issue.data.body)){
      console.log("Keyword not included");
      return;
    }

    const created = await createNewIssue(token, owner, repoName, issue.data.title, 'this is body', ['soichisumi'], '', issue.data.url);

    core.setOutput('created', created);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run().then(()=>{})