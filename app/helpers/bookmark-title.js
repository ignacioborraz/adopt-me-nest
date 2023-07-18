import { helper } from '@ember/component/helper';

export default helper(function bookmarkTitle([title, about] /*, named*/) {
  let returnStr = title;
  if (about != null) {
    returnStr += ' - ' + about;
  }
  return returnStr;
});
