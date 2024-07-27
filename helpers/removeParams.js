export function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0];
  return rtn;
}
