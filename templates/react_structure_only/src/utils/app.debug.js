/**
 * If you want to disabled the log message in console, 
 * Please add REACT_APP_DISABLE_LOG environment variable as true, 
 * This will be mainly use on production server update because 
 * we dont want user to see any console in your browser's console
 */
export function log(...args) {
  var isLogDisabled = process.env.REACT_APP_DISABLE_LOG == "true"
  if (!isLogDisabled) {
    args.length > 0 ? console.log(...args) : console.log("");
  } else {
    return;
  }
}

export function warn(...args) {
  var isLogDisabled = process.env.REACT_APP_DISABLE_LOG == "true"
  if (!isLogDisabled) {
    args.length > 0 ? console.warn(...args) : console.warn("");
  } else {
    return;
  }
}

export function error(...args) {
  var isLogDisabled = process.env.REACT_APP_DISABLE_LOG == "true"
  if (!isLogDisabled) {
    args.length > 0 ? console.error(...args) : console.error("");
  } else {
    return;
  }
}

export function table(...args) {
  var isLogDisabled = process.env.REACT_APP_DISABLE_LOG == "true"
  if (!isLogDisabled) {
    args.length > 0 ? console.table(...args) : console.table("");
  } else {
    return;
  }
}
