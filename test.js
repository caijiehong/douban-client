process.stdout.write('this is good');
process.stdin.resume();
process.stdin.on('data', function(chunk) {
    process.stdout.write('data: ' + chunk);
});