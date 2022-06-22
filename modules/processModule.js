const execSync = require("child_process").execSync;

const processModule = {
    //! - Execute le projet dans un autre VSC
    launchProject(projectDirectory) {
        execSync("code .", {stdio: "inherit", shell: true, cwd: `${projectDirectory}`});
    }
}

module.exports = processModule;