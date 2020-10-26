// console.log("Connected!");

function StopWatch() {
    this.duration = 0;
    let startTime, endTime, duration = 0,
        isRunning;

    this.start = function() {
        if (isRunning) {
            throw new Error("Stopwatch is already running...");
        }
        isRunning = true;
        startTime = new Date();
        console.log("StopWatch started...");
    }
    this.stop = function() {
        if (!isRunning) {
            throw new Error("Stopwatch is not running...");
        }
        isRunning = false;
        endTime = new Date();
        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        // console.log(seconds);
        duration += seconds;
        console.log("StopWatch is stopped...");

    }
    this.reset = function() {
        startTime = null;
        endTime = null;
        isRunning = false;
        duration = 0;
    }
    Object.defineProperty(this, "duration", {
        get: function() {
            return duration;
        }
    });

}

const sw = new StopWatch();
/*
    In the console type 
    sw.start()  ==> to start the stopwatch
    sw.stop()   ==> to stop the stopwatch
    sw.duration ==> to get the running time
    sw.reset()  ==> to reset the duration time
*/