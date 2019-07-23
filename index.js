const program = require('commander');
const fs = require('fs').promises;
const sh = require('./helpers/shell');
 
async function main() {
    program
        .version('0.1.0')
        .option('-c, --config <configPath>', 'Add network configuration')
        .parse(process.argv);
    
    console.log(`Choosen config file: ${program.config}`);

    /*
    * Global Vars
    */
    let parsedConf = {};

    /*
    * Reading Config File
    */
    if (!program.config) {
        console.info('No config specified');
        process.exit(0);
    }

    try {
        const contents = await fs.readFile(program.config, 'utf8');
        parsedConf = JSON.parse(contents);
        console.log('Number of nodes', parsedConf.nodes.length);
    } catch (error) {
        console.log(error);
        console.info('Reading or parsing file content to JSON failed');
        process.exit(0);
    }

    /*
     * Drop & Create Database
     * Fails if Postgres is not installed
     * Example: let { stdout } = await sh('ls -l');
     */
    try {
        await sh('dropdb lisk_dev && createdb lisk_dev');
    } catch (err) {
        console.log('something wrong', err);
    }

    /*
     * Start instance
     */
    console.log(parsedConf);
    await sh(`node ${parsedConf.nodes[0].target} -c ${parsedConf.nodes[0].overrideConfig} | npx bunyan -o short`);
    console.log('Node running');
}

main();
setTimeout(function () {
    console.log('Node has started');
}, 10000);


// Removed overrideConfig from 1.json config file
/* "overrides": {
    "modules": {
        "network": {
            "http_port": 3001
        }
    }
} */
