// content of context: https://developer.github.com/v3/activity/events/types/
const github = require('@actions/github');

const getIssueNumber = () => {
    const issue = github.context.payload.issue;
    if (!issue) {
        throw new Error("No issue provided");
    }
    return issue.number;
};
module.exports.getIssueNumber = getIssueNumber;

const getIssueFromContext = async (token) => {
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
module.exports.getIssueFromContext = getIssueFromContext;

const getIssueCommentFromContext = () => {
    const comment = github.context.payload.comment;
    if (!comment) {
        throw new Error("No issue provided");
    }
    return comment;
} 
module.exports.getIssueCommentFromContext = getIssueCommentFromContext;

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
    if (!fromIssue) {
        throw new Error('fromIssue is not provided')
    }
    if (typeof body === 'string' && body !== '') {
        body = body + `\n\ncopiedFrom: ${fromIssue}`;
    }else {
        body = `copiedFrom: ${fromIssue}`
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