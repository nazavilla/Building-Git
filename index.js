//Git is best thought of as a tool for storing the history of a collection of files.
//- kernel.org

function Git(name) {
    this.name = name;
    //keep track of the commit ids by keeping a counter
    this.lastComitId = -1;
    //main branch as default
    let main = new Branch("main", null); // null since we don't have any commits yet.
    //last Commit. HEAD will be updated everytime a commit is made in the commit() function.
    this.HEAD = main; 
    this.branches = []; // all branches.
    this.branches.push(main);
}

//making a commit
function Commit(id, parent, message){
    this.id = id;
    this.parent = parent;
    this.message = message;
}

//git can create a commit, we are not passing it anything yet
Git.prototype.commit = function(message) {
    let commit = new Commit(++this.lastComitId, this.HEAD.commit, message);
    this.HEAD.commit = commit;
    return commit;
};

Git.prototype.log = function() {
    let history = [];
    //start from HEAD
    let commit = this.HEAD.commit;
    while (commit) {
        history.push(commit);
        commit = commit.parent;
    }

    return history;
}


//Let's Branch it out
function Branch(name, commit){
    this.name = name;
    this.commit = commit;
}


//checkout method to switch branches
Git.prototype.checkout = function(branchName) {
    //check if branch exist = branchName
    for (let i = this.branches.length; i--;) {
        if (this.branches[i].name === branchName) {
                console.log("Switched to existing branch: "+branchName);
                this.HEAD = this.branches[i];
                return this; //so this method can be chanined
        }
    }
    //if no matching branch is found
    let newBranch = new Branch(branchName, this.HEAD.commit);
    this.branches.push(newBranch);//store Branch
    this.HEAD = newBranch; //update HEAD
    console.log("Switched to new branch: "+branchName);
    return this;
};



//initiating a repo: git init
var repo = new Git("test");
//same as git commit -m "Initial commit"
repo.commit("Initial commit");
repo.commit("Change 1");
