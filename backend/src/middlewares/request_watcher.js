function PrintMessage(request, response, next){
    let logMessage = "";
    let responseBody = "";

    logMessage += `[${request.method}]`;
    logMessage += `[${request.url}]`;

    MountBody(response, body => {
        responseBody = body;
    })

    response.on("finish", () => {
        const date = new Date();
        const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;;
        const month = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
        const year = date.getFullYear();
        const time = date.toString().split(" ")[4];
        const dateStamp = `${year}-${month}-${day} ${time}`;
        responseStatus = `\t\x1b[33m${dateStamp}\x1b[0m [${response.statusCode}-${response.statusMessage}] ${logMessage} : \x1b[32m${JSON.stringify(responseBody)}\x1b[0m`;
        console.log(responseStatus);
    })
    next();
}

function MountBody(response, callback){
    var oldWrite = response.write,
      oldEnd = response.end;

  var chunks = [];

  response.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(response, arguments);
  };

  response.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    callback(chunks[0]);

    oldEnd.apply(response, arguments);
  };
}

module.exports = PrintMessage