import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initRepo } from "./controllers/init.js";
import addFile from "./controllers/add.js";
import  commitChanges  from "./controllers/commit.js";
import { pullChanges } from "./controllers/pull.js";
import { pushChanges } from "./controllers/push.js";
import { revertChanges } from "./controllers/revert.js";
const argv = yargs(hideBin(process.argv))
.command("init", "Initialize a new repository", {}, (argv) => {initRepo();})
.command("add <file>", "Add a file to the repository", {}, (argv) => {addFile(argv.file);})
.command("commit <message>", "Commit changes to the repository", {}, (argv) => {commitChanges(argv.message);})
.command("pull", "Pull changes from the remote repository", {}, (argv) => {pullChanges();})
.command("push", "Push changes to the remote repository", {}, (argv) => {pushChanges();})
.command("revert", "Revert changes in the working directory", {}, (argv) => {revertChanges();})
.demandCommand(1, "You need at least one command before moving on").help().argv;