---
title: "Git"
description: "Useful git commands"
tags: ["git"]
weight: 1
Victor_Hugo: true
Focus_Keyword: "git checkout clone"
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---

## Cloning and getting remote changes

### Clone a repository
```sh
git clone <gitRepositoryURL>
```

### Clone a repository with limited history
```sh
git clone --depth n <gitRepositoryURL>
```
{{% notice info %}}
where n is the number of revisions you want in the history
{{% / notice %}}

### Clone specific branch
```sh
git clone -b <branchName> --single-branch <gitRepositoryURL>
```

### Clone with all submodules
```sh
git clone <gitRepositoryURL> --recursive
```

### Pull remote changes
```sh
git pull
```

### Pull remote changes without generating a merge commit
```sh
git pull --rebase
```

## Discarding changes

### Discard changes to a file
```sh
git checkout <filePath>
```
{{% notice warning %}}
You will loose all the changes to that file
{{% / notice %}}

### Discard some commit
```sh
git reset --hard HEAD~n
```
{{% notice note %}}
where n is number of last commits which you want to discard
{{% / notice %}}
{{% notice warning %}}
You will loose all the changes
{{% / notice %}}

## Tags

### List all tags
```sh
git tag -l
```

### Create a local tag
```sh
git tag <tagName>
```

### Create a remote tag
```sh
git tag <tagName>
git push origin <tagName>
```

### Push all local tags to remote
```sh
git push origin --tags
```

### Delete a tag
```sh
git tag --delete <tagName>
```

## Branches

### List all branches
```sh
git branch -a
```

### List all remote branches
```sh
git branch -r
```

### List all local branches
```sh
git branch -l
```

### Switch to a branch
```sh
git checkout <branchName>
```
{{% notice note %}}
If there is a tag with same name as the branch then this command will checkout the tag and will not track it
{{% / notice %}}

### Checkout remote branch with a different local name
```sh
git branch -f --track <localBranchName> origin/<remoteBranchName>
```

### Create a local branch
```sh
git checkout -b <newBranchName>
```

### Create a local branch and push it to remote
```sh
git checkout -b <newBranchName>
git branch --edit-description
git push origin <newBranchName>
```
{{% notice info %}}
--edit-description is optional and for editing the commit message for the branch creation
{{% / notice %}}

### Create a local branch from a specific commit
```sh
git checkout <commitHash>
git branch -b <newBranchName>
git push origin <newBranchName>
```

### Create a local branch and track remote changes
```sh
git checkout -b <newBranchName>
git push --set-upstream origin <remoteBranchName>
```

### Rename a local branch
```sh
git branch -m <oldName> <newName>
git branch -m <newName> #rename current local branch
```

### Rename remote branch
```sh
git branch -m <oldName> <newName> #rename locally
git push remote :<remoteBranchName> #delete the branch from remote
git push remote <newLocalName> #push the local branch to remote
```

### Delete a local branch
```sh
git branch -d <branchName>
# or
git branch -D <branchName>
```
{{% notice note %}}
-D is forceful deletion of branch
{{% / notice %}}

### Delete a remote branch
```sh
git push origin --delete <branchName>
# or
git push origin :<branchName>
```

## Commit and Push

### List staged files
```sh
git status
```

### View diff of a modified file
```sh
git diff <file>
```

### View diff of a staged file
```sh
git diff --cached <file>
```

### Commit changes
```sh
git add <changedFiles>
git commit -m <commitMessage>
```

### Push local commits to remote
```sh
git push
```

### Change commit message
```sh
git rebase -i HEAD~n

```
{{% notice info %}}
where n is number of last commits which you want to rebase

* The above command will open a editor and will give various rebase options use reword option to select the commits whose commit message you want to change. 
* After selecting the commits close the file.
* git will open all the commits one by one to allow rewording the commit message.
{{% / notice %}}

### View changes in commit
```sh
git show <commit hash>
```
{{% notice info %}}
You can get the commit hash from git log command
{{% / notice %}}

### Undo last commit
```sh
git reset --soft HEAD~n

```
{{% notice info %}}
where n is number of last commits which you want to undo
{{% / notice %}}

### Cherry Pick a commit from other branch
```sh
git checkout <branch to apply the commit>
git cherry-pick <commit hash>
```
{{% notice info %}}
You can get the commit hash from git log command
{{% / notice %}}

## Merge

### Merge without committing
```sh
git merge --no-commit --no-ff <branchNameFromWhereYouWantToTakeChanges>
```

### Handling merge conflicts
```sh
git checkout --ours <filePath>
git checkout --theirs <filePath>
```
{{% notice tip %}}
If you want to merge both the changes then change the file and add the file to the commit using git add
{{% / notice %}}

### Abort a merge
```sh
git merge --abort
```

### List all the commits in a merge
```sh
git log <MergeCommitHash>^..<MergeCommitHash> --pretty=format:"%aD %H %ae %s"
```

## Revert

### Revert a specific commit
```sh
git revert -m 1 <commitHash>
```
{{% notice info %}}
1 indicates that you want to go to first ancestor of this commit
{{% / notice %}}

### Remove a big file from a specific commit pushed to remote
```sh
git rebase -i <commitHash - 1> 
git rm --cached <Path to bigFile>
git commit --amend -C HEAD
git rebase --continue
git push --force
```
{{% notice note %}}
- Provide the commit hash of one commit before the commit which has the big file
- `git` will open editor, change **pick** to **edit** for the wrong commit which has the big file
- Close the editor
{{% / notice %}}

## Stash

### Stash local uncommitted changes
```sh
git stash
```
{{% notice info %}}
All the files added to a commit will be un-staged and put in stash
{{% / notice %}}

### List all stashes
```sh
git stash list
```

### Apply stashed changes
```sh
git stash pop
```
{{% notice info %}}
This will apply the stash and delete the stash changes
{{% / notice %}}

### Apply stashed changes to multiple branches
```sh
git stash apply
git checkout <branchName>
git stash apply
git stash drop
```
{{% notice note %}}
Last step will delete the stash
{{% / notice %}}

### View diff from stash without applying
```sh
git stash show -p stash@{n}
```
{{% notice info %}}
where n is the stash number you want to view, to get the stash number use git stash list command
{{% / notice %}}

## Commit Logs

### Show all commit logs
```sh
git log
```

### Show all of your commits
```sh
git log --author='Your Name'
# or
git log --author='you@somedomain.com'
```

### Show all unpushed commits
```sh
git log --branches --not --remotes
```
{{% notice note %}}
The above command will list all the unpushed commits in all branches
{{% / notice %}}

### Show all commits which are present in one branch and not in other
```sh
git log <branch> --not <branchToCheckAgainst> --reverse --author="user@yourdomain.com" --pretty=format:"%aD %H %ae %s"
```

## GIT miscellaneous

### Add a submodule
```sh
cd <path where you want to add submodule>
git submodule add <URL>
```

### See info
```sh
git remote show origin
```

### Change origin URL
```sh
git remote set-url origin <URL>
```

### Update user details
```sh
git config --global user.name 'Your Name'
git config --global user.email.you@somedomain.com
```

### Udate user details for a repo
```sh
git config user.name 'Your Name'
git config user.email.you@somedomain.com
```

### Add a file to a commit
```sh
git add <filePath>
```

### Un-stage a file (remove a file from the commit)
```sh
git reset HEAD <filePath>
```

### Un-stage all files (remove all files from the commit)
```sh
git reset HEAD --
```

### Delete a file
```sh
git rm <filePath>
git rm -f <filePath>
```
{{% notice note %}}
-f is for forcefully deleting the file
{{% / notice %}}


### Change email id in already commited commits
```sh
git filter-branch --env-filter '
WRONG_EMAIL="<wronguser@wrongdomain.com>"
NEW_NAME="Your Name"
NEW_EMAIL="correctuser@correctdomain.com"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
export GIT_COMMITTER_NAME="$NEW_NAME"
export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
export GIT_AUTHOR_NAME="$NEW_NAME"
export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
