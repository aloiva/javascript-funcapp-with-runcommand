const { app } = require('@azure/functions');

const schedule = process.env.TIMER_SCHEDULE || '*/10 * 14 * * *';

app.timer('timerTrigger1', {
    schedule: schedule,
    handler: (myTimer, context) => {
        context.log('Timer function processed request.');
    }
});
