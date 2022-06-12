const getTimeStamp = require('./getTimestamp');
 
 const info = (namespace, message, object) => {
    if (object) {
       console.log(`[${getTimeStamp()}] [INFO] [${namespace}] Message : ${message}`, object)
    } else {
       console.log(`[${getTimeStamp()}] [INFO] [${namespace}] Message : ${message}`)
    }
 }

 const warn = (namespace, message, object) => {
    if (object) {
       console.error(`[${getTimeStamp()}] [WARN] [${namespace}] Message : ${message}`, object)
    } else {
       console.error(`[${getTimeStamp()}] [WARN] [${namespace}] Message : ${message}`)
    }
 }

 module.exports = {info, warn}