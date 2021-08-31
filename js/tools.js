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
