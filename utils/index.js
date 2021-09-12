function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

const paginate = (array, page_size, page_number) => {
  return array.slice(page_number * page_size, page_number * page_size + page_size);
};

module.exports = { makeId, paginate }