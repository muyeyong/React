import LZString from 'lz-string';
export default {
  getWoId() {
    var str = '0123456789';
    var result = "";
    for (var i = 0; i < 6; i++) {
      result += str[parseInt(Math.random() * str.length)];
    }
    return result;
  },
  getUrlQuery(query, search) {
    const name = query.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`, 'i');
    const results = regex.exec(
      search || window.location.search || window.parent.location.search
    );

    return results === null || results[1] === ''
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
  setStoreHistory(param) {
    window.history.pushState(
      null,
      '',
      `?pager=${LZString.compressToEncodedURIComponent(JSON.stringify(param))}`
    );
  },
  getStoreHistory() {
    return JSON.parse(
      LZString.decompressFromEncodedURIComponent(this.getUrlQuery('pager')) || null
    );
  }
}
