const program = require('commander');
const fs = require('fs');
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
    let parsed = {};

    /*
    * Reading Config File
    */
    if (!program.config) {
        console.info('No config specified');
        process.exit(0);
    }

    fs.readFile(program.config, 'utf8', function(err, contents) {
        if (err) {
            console.info('Reading file failed');
            process.exit(0);
        }

        try {
            parsed = JSON.parse(contents);
            console.log('Number of nodes', parsed.nodes.length);
        } catch (error) {
            console.info('Parsing file content to JSON failed');
            process.exit(0);
        }
    });

    /*
    * Placeholder for checks:
    * Postgres available? Can we create/drop DB?
    */

    /*
     * Drop & Create Database
     * Example: let { stdout } = await sh('ls -l');
     */
    try {
        await sh('dropdb lisk_dev && createdb lisk_dev');
    } catch (err) {
        console.log('something wrong', err);
    }
}

main();