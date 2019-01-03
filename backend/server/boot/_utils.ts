

export function processArg(arg: string) {
  const pattern = '(^ARGUMENT=)|(^ARGUMENT$)'.replace(/ARGUMENT/g, arg);
  const re = new RegExp(pattern);

  const foundArg = process.argv.find(a => re.test(a));
  if(!foundArg) return null;

  const value = foundArg.replace(re, '') || true;

  return value;
}
