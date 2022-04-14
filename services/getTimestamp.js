const getTime = (loc) => {
  let f = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
    timeZone: loc,
  });
  let temp = f.formatToParts(new Date());
  let parts = temp.reduce((acc, part) => {
    if (part.type != "literal") {
      acc[part.type] = part.value;
    }
    return acc;
  }, Object.create(null));
  return parts;
};

const getTimeStamp = () => {
  let time = getTime("Asia/Jakarta");
  let result = `[${time.year}-${time.month}-${time.day} ${time.hour}:${time.minute}:${time.second}]`;
  return result;
};

module.exports = getTimeStamp;
