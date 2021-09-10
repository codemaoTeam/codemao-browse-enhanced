function stringToEntity(str, radix) {
  let arr = str.split('');
  radix = radix || 0;
  let tmp = arr
    .map(
      (item) =>
        `&#${
          radix ? 'x' + item.charCodeAt(0).toString(16) : item.charCodeAt(0)
        };`
    )
    .join('');
  return tmp;
}
function entityToString(entity) {
  let entities = entity.split(';');
  entities.pop();
  let tmp = entities
    .map((item) =>
      String.fromCharCode(
        item[2] === 'x' ? parseInt(item.slice(3), 16) : parseInt(item.slice(2))
      )
    )
    .join('');
  return tmp;
}

function randomString(length) {
  length = length || 28;
  var str = 'abcdefghijklmnopqrstuvwxyz1234567890',
    a = str.length,
    res = '';
  for (i = 0; i < length; i++) res += str.charAt(Math.floor(Math.random() * a));
  return res;
}
