const core = require('@actions/core');

function replaceVars(instring, vars) {
    if (typeof instring !== 'string') {
        throw Error('Non-string input given');
    }
    if (!(vars instanceof Object)) {
        throw Error('Variable configuration is not an object');
    }
    const replacer = (match, varname) => vars[varname];
    const regexStr = `\\{(${Object.keys(vars).join('|')})\\}`;
    const regex = new RegExp(regexStr, 'gu');
    const result = instring.replace(regex, replacer);
    return result;
}

try {
    const prefix = 'STRVAR_';
    const variables = {};
    Object.keys(process.env)
        .filter(key => key.startsWith(prefix))
        .forEach(key => (
            variables[key.slice(prefix.length).toLowerCase()] = process.env[key]
        ));
    const input = core.getInput('instring');
    core.setOutput('outstring', replaceVars(input, variables));
} catch (error) {
    core.setFailed(error.message);
}

module.exports = replaceVars;
