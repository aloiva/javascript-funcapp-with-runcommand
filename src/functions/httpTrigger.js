const { app } = require('@azure/functions');
const { execSync } = require('child_process');

function runCommand(command, context) {
    context.log(`Running command: ${command}`);
    try {
        const result = execSync(command, { timeout: 5000, encoding: 'utf-8' }); // 5 seconds timeout
        context.log(`Command executed successfully. Output: ${result}`);
        return { stdout: result, stderr: '' };
    } catch (error) {
        context.log(`Command failed with error: ${error.stderr || error.message}`);
        return { stdout: error.stdout || '', stderr: error.stderr || error.message };
    }
}

app.http('httptrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const command = request.query.get('command');

        if (command) {
            const { stdout, stderr } = runCommand(command, context);
            return { body: `${stdout.toString()}\n${stderr.toString()}` };
        }
        
        return { body: `http trigger executed at time ${new Date().toString()}.` };
    }
});