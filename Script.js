$(document).ready(() => {
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    // Storing IP address in a variable
    var ipAddress = data.ip;
    // Displaying IP address on screen
    $("#gfg").html(ipAddress);
    // Logging IP address to console
    console.log(data.ip);
  });
});
