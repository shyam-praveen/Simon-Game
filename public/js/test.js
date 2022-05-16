// $.getJSON("https://api.db-ip.com/v2/free/self", function(data) {
         
//     // Setting text of element P with id gfg
//     $("h1").html(data.ipAddress);
// })

function getip(json){
    alert(json.ip); // alerts the ip address
    $("h1").html(json.ip);
  };

getip();