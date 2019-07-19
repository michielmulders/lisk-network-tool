const child = require('child_process');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
const sh = async (cmd) => {
    return child.exec(cmd);
}

module.exports = sh;