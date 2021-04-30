// YUIL : 2017 : yuil@mail.ru : yuil0@yandex.ru : Skype : yuil000

var http = require("http");
var fs = require("fs");

var i_version=1;
var i_port=80;
var i_wheter_value=50;

'use strict';
process.stdout.write('\x1Bc');  

var server = http.createServer
(function(request, response) 
 {  
		var sz="";
		
		fs.readFile
		("index.html", function(error, buffer) 
			{
				if (!error) //{throw error;}
				{
					sz= buffer.toString();
					
					//console.log('request.url : '+request.url);
					if (request.url.toLowerCase()=='/worse') { if (parseInt(i_wheter_value)>0) {i_wheter_value-=10;} }
					if (request.url.toLowerCase()=='/better') { if (parseInt(i_wheter_value)<100) {i_wheter_value+=10;} }					
					
					if (i_wheter_value==0) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771014/weather_0.gif'); } else
					if (i_wheter_value==10) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771017/weather_10.gif'); } else
					if (i_wheter_value==20) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771020/weather_20.gif'); } else
					if (i_wheter_value==30) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771021/weather_30.gif'); } else
					if (i_wheter_value==40) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771023/weather_40.gif'); } else
					if (i_wheter_value==50) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771024/weather_50.gif'); } else
					if (i_wheter_value==60) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771025/weather_60.gif'); } else
					if (i_wheter_value==70) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771026/weather_70.gif'); } else
					if (i_wheter_value==80) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771027/weather_80.gif'); } else
					if (i_wheter_value==90) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771028/weather_90.gif'); } else
					if (i_wheter_value==100) { sz=sz.replace('#WEATHER_IMG#', 'http://www.imageup.ru/img43/2771031/weather_100.gif'); } else																
					{}
					
					sz=sz.replace('#WHETER_VALUE#', i_wheter_value);
					
					fs.writeFile("http_server.ini", "port:"+i_port+"\nversion:"+i_version+"\nwheter_value:"+i_wheter_value
					              , function(err) {if (err)console.log("FAIL. write INI file :", err);});					//else console.log("Writting is success. All free.")
				}
				
				response.writeHead(200, {"Content-Type": "text/html"});
		  response.write(sz);		
    response.end();	
			}//function
		);
		
 }
);

fs.readFile
("http_server.ini", function(error, buffer) 
 {
  if (!error) //{throw error;}
		{
			var sz_input= buffer.toString();
			
			var a_line= sz_input.split('\n');
			
			for (i=0; i<a_line.length; i++)
			{			
				var a= a_line[i].split(':');
				
				if (a.length>1)
				{ 
				
				 if (a[0].toLowerCase()=='version') { i_version=parseInt(a[1]); }
					if (a[0].toLowerCase()=='port') { i_port=parseInt(a[1]); }
					if (a[0].toLowerCase()=='wheter_value') { i_wheter_value=parseInt(a[1]); }					
				}			
			}//for	i

		}
	 Init();	
 }//function
);

function Init()
{
	console.log('Server started. version '+i_version+' port : '+i_port+'. YUIL 2017\nQuit this server : Ctrl-C\n=====================================================\n');			
	console.log('To run client:');
 console.log('* type in internet browser : http://localhost:'+i_port);
 console.log('* or open file command_line_for_browser.txt.\n');			
	fs.writeFile("command_line_for_browser.txt", "http://localhost:"+i_port, function(err) {if (!err) console.log("File command_line_for_browser.txt created");});					//else console.log("Writting is success. All free.")
	console.log('On web page allow command : refresh, worse, better.\n');			
	
	server.listen(i_port);
}
