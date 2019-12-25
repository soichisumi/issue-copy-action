const github = require('@actions/github');

const getIssueNumber = () => {
    const issue = github.context.payload.issue;
    if (!issue) {
        throw new Error("No issue provided");
    }
    return issue.number;
};
module.exports.getIssueNumber = getIssueNumber;

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
module.exports.getIssue = getIssue;

const checkKeywords = (keywords, body) => {
    const lowerBody = body.toLowerCase();
    for(let k of keywords) {
        if (lowerBody.toLowerCase().includes(k.toLowerCase())){
            return true;
        }
    }
    return false;
};
module.exports.checkKeywords = checkKeywords;

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
module.exports.createNewIssue = createNewIssue;