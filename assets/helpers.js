export function camelize(str) {
  return str.indexOf("_") > 0
    ? str
        .split("_")
        .map((w, i) => (i > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
        .join("")
    : str;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function capitalize(s){
  return s[0].toUpperCase() + s.substring(1);
}

export function pause(dur = 1000) {
  return new Promise((next) => setTimeout(next, dur));
}


export function toDate(d) {
  if (d.indexOf("T") > 0) d = d.split("T")[0];
  return new Date(`${d}T00:00:00-07:00`);
}

export function isDate(d){
  return d instanceof Date
}

export function getDay(d) {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { day: 'numeric' }).format(d).padStart(2,0);
}

export function getWeekDay(d,f="long") {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { weekday: f }).format(d);
}

export function getMonth(d, f = "long") {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { month: f }).format(d);
}

export function getYear(d) {
  if (!isDate(d)) d = toDate(d)
  return d.getFullYear();
}


export function formatDate(date,format = "mmm dd, yyyy") {
  if (!date) return;

  date = toDate(date)

  format = format.replace('mmmm',getMonth(date, "long"))
  format = format.replace('mmm',getMonth(date, "short"))
  format = format.replace('mm',getMonth(date, "numeric"))
  format = format.replace('dddd',getWeekDay(date,"long"))
  format = format.replace('ddd',getWeekDay(date,"short"))
  format = format.replace('dd',getDay(date,'numeric'))
  format = format.replace('yyyy',getYear(date))

  return format
}


export function getDateOffset(o = 0) {
  let d = new Date();
  d.setDate(d.getDate() + o);

  let m = "" + (d.getMonth() + 1),
    w = "" + d.getDate(),
    y = d.getFullYear();

  if (m.length < 2) m = "0" + m;
  if (w.length < 2) w = "0" + w;

  return [y, m, w].join("-");
}


export function getTemp(k) {
  return `${Math.round(((k - 273.15) * 9) / 5 + 32)}°F`;
}


export function getTime(t, o = 0) {
  return new Date(t * 1000 + o * 1000).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeFromDate(t) {
  return new Date(t).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}


export function inViewPort(el){
  let rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function formatSnakeToProper(t){
  return t.split('_').map(t => `${t[0].toUpperCase()}${t.slice(1)}`).join(" ")
}
