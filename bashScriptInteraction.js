var name='Ricardo Mendes';
var t=4;

var util  = require('util'),
    spawn = require('child_process').spawn,
    ls    = spawn('./bashScriptExample', ['--name', name, '--repeat', t]);

ls.stdout.on('data', function (data) {
	console.log("\033[31mReceive: \033[0m\033[1m "+data+" \033[0m ");
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  console.log('######################## THE END ########################');
});


var tInit = t+1; 
var text;
var func = function(i){
    return function(){
        if (i == 0) return;        
		text = 'Data '+ (tInit-i) + '\n';
        ls.stdin.write(text);
        
        console.log("\n\033[92mSend:\033[0m \033[1m"+text+"\033[0m");
        if(i != 0) {
            setTimeout(func(--i), 50); 
        }
    }   
}

setTimeout(func(t), 50); 

