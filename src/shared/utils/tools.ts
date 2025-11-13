import { ValidationError } from '@nestjs/common';
import moment from 'moment';

export function getDateNow() {
  const d = new Date();
  var getYear = d.toLocaleString('default', { year: 'numeric' });
  var getMonth = d.toLocaleString('default', { month: '2-digit' });
  var getDay = d.toLocaleString('default', { day: '2-digit' });

  var seconds = d.toLocaleString('default', {
    timeZone: 'Asia/Jakarta',
    second: '2-digit',
  });
  var minutes = d.toLocaleString('default', { minute: '2-digit' });
  var hours = d.toLocaleTimeString('id-ID', {
    hour12: false,
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
  });

  var dateFormat =
    getYear +
    '-' +
    getMonth +
    '-' +
    getDay +
    'T' +
    (hours.length === 1 ? `0${hours}` : hours) +
    ':' +
    (minutes.length === 1 ? `0${minutes}` : minutes) +
    ':' +
    (seconds.length === 1 ? `0${seconds}` : seconds) +
    '.' +
    d.getMilliseconds() +
    'Z';

  return dateFormat;
}

export function formatSelectedDateUtc(date: any) {
  const d = moment(date.replace('Z', '')).format('DD MMMM YYYY HH:mm');

  return d;
}

export function getDateByValue(params: { value: string }) {
  const d = new Date(params.value);
  var getYear = d.toLocaleString('default', { year: 'numeric' });
  var getMonth = d.toLocaleString('default', { month: '2-digit' });
  var getDay = d.toLocaleString('default', { day: '2-digit' });

  var seconds = d.toLocaleString('default', {
    timeZone: 'Asia/Jakarta',
    second: '2-digit',
  });
  var minutes = d.toLocaleString('default', { minute: '2-digit' });
  var hours = d.toLocaleTimeString('id-ID', {
    hour12: false,
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
  });

  var dateFormat =
    getYear +
    '-' +
    getMonth +
    '-' +
    getDay +
    'T' +
    (hours.length === 1 ? `0${hours}` : hours) +
    ':' +
    (minutes.length === 1 ? `0${minutes}` : minutes) +
    ':' +
    (seconds.length === 1 ? `0${seconds}` : seconds) +
    '.' +
    d.getMilliseconds() +
    'Z';

  return dateFormat;
}

export function getValueByTypeName(type: string, value: string) {
  if (['DateTime', 'Date'].includes(type)) {
    return getDateByValue({ value });
  }

  return value;
}

export function isEmpty(param: any) {
  if (typeof param === 'undefined' || param === null) {
    return true;
  }

  if (typeof param === 'object' && Object.keys(param).length === 0) {
    return true;
  }

  if (param instanceof Array && param.length === 0) {
    return true;
  }

  if (typeof param === 'string' && param.trim().length === 0) {
    return true;
  }

  return false;
}

export function getStatusWorkflowApproval(
  value: string | number,
  action: 'string-to-number' | 'number-to-string',
) {
  if (action === 'string-to-number') {
    switch ((value as string).replaceAll(' ', '-').toLowerCase()) {
      case 'approved':
        return 1;
      case 'approve-in-progress':
        return 2;
      case 'draft':
        return 0;
      case 'unblacklist-in-progress':
        return 7;
      case 'blacklist-in-progress':
        return 8;
      case 'blacklisted':
        return 9;
      default:
        return undefined;
    }
  } else {
    switch (value as number) {
      case 1:
        return 'approved';
      case 2:
        return 'approve-in-progress';
      case 0:
        return 'draft';
      case 7:
        return 'unblacklist-in-progress';
      case 8:
        return 'blacklist-in-progress';
      case 9:
        return 'blacklisted';
      default:
        return undefined;
    }
  }
}

export function containsSubstring(input: string, substring: string): boolean {
  const regex = new RegExp(substring);
  return regex.test(input);
}

export function isOverlappingDate<T>(params: {
  checkerData: T[];
  keyChecker: {
    startDate: string;
    endDate: string;
  };
  startDateVal: Date;
  endDateVal: Date;
}) {
  const { checkerData, startDateVal, endDateVal, keyChecker } = params;

  for (const data of checkerData) {
    const startDate = moment(new Date(data[keyChecker.startDate]));
    const endDate = moment(new Date(data[keyChecker.endDate]));

    const startDateValTmp = moment(new Date(startDateVal));
    const endDateValTmp = moment(new Date(endDateVal));

    if (
      startDateValTmp.isSameOrAfter(startDate) &&
      endDateValTmp.isSameOrBefore(endDate)
    ) {
      return true;
    }

    if (
      startDate.isSameOrAfter(startDateValTmp) &&
      endDate.isSameOrBefore(endDateValTmp)
    ) {
      return true;
    }

    if (startDateValTmp.isBetween(startDate, endDate)) {
      return true;
    }

    if (endDateValTmp.isBetween(startDate, endDate)) {
      return true;
    }
  }

  return false;
}

export function terbilang(x: number): string {
  const nilai = Math.abs(x);
  const huruf = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas',
  ];

  let temp = '';

  if (nilai < 12) {
    temp = ' ' + huruf[nilai];
  } else if (nilai < 20) {
    temp = terbilang(nilai - 10) + ' belas';
  } else if (nilai < 100) {
    temp = terbilang(Math.floor(nilai / 10)) + ' puluh' + terbilang(nilai % 10);
  } else if (nilai < 200) {
    temp = ' seratus' + terbilang(nilai - 100);
  } else if (nilai < 1000) {
    temp =
      terbilang(Math.floor(nilai / 100)) + ' ratus' + terbilang(nilai % 100);
  } else if (nilai < 2000) {
    temp = ' seribu' + terbilang(nilai - 1000);
  } else if (nilai < 1000000) {
    temp =
      terbilang(Math.floor(nilai / 1000)) + ' ribu' + terbilang(nilai % 1000);
  } else if (nilai < 1000000000) {
    temp =
      terbilang(Math.floor(nilai / 1000000)) +
      ' juta' +
      terbilang(nilai % 1000000);
  } else if (nilai < 1000000000000) {
    temp =
      terbilang(Math.floor(nilai / 1000000000)) +
      ' milyar' +
      terbilang(nilai % 1000000000);
  } else if (nilai < 1000000000000000) {
    temp =
      terbilang(Math.floor(nilai / 1000000000000)) +
      ' trilyun' +
      terbilang(nilai % 1000000000000);
  }

  return temp;
}

export function JSONStringify(obj: any) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value,
  );
}

export function encryptSha1(msg) {
  function rotate_left(n, s) {
    let t4 = (n << s) | (n >>> (32 - s));
    return t4;
  }
  function cvt_hex(val) {
    let str = '';
    let i;
    let v;
    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  let blockstart;
  let i, j;
  let W = new Array(80);
  let H0 = 0x67452301;
  let H1 = 0xefcdab89;
  let H2 = 0x98badcfe;
  let H3 = 0x10325476;
  let H4 = 0xc3d2e1f0;
  let A, B, C, D, E;
  let temp;
  msg = Utf8Encode(msg);
  let msg_len = msg.length;
  let word_array = new Array();
  for (i = 0; i < msg_len - 3; i += 4) {
    j =
      (msg.charCodeAt(i) << 24) |
      (msg.charCodeAt(i + 1) << 16) |
      (msg.charCodeAt(i + 2) << 8) |
      msg.charCodeAt(i + 3);
    word_array.push(j);
  }
  switch (msg_len % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = (msg.charCodeAt(msg_len - 1) << 24) | 0x0800000;
      break;
    case 2:
      i =
        (msg.charCodeAt(msg_len - 2) << 24) |
        (msg.charCodeAt(msg_len - 1) << 16) |
        0x08000;
      break;
    case 3:
      i =
        (msg.charCodeAt(msg_len - 3) << 24) |
        (msg.charCodeAt(msg_len - 2) << 16) |
        (msg.charCodeAt(msg_len - 1) << 8) |
        0x80;
      break;
  }
  word_array.push(i);
  while (word_array.length % 16 != 14) word_array.push(0);
  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);
  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
    for (i = 16; i <= 79; i++)
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for (i = 0; i <= 19; i++) {
      temp =
        (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5a827999) &
        0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 20; i <= 39; i++) {
      temp =
        (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ed9eba1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 40; i <= 59; i++) {
      temp =
        (rotate_left(A, 5) +
          ((B & C) | (B & D) | (C & D)) +
          E +
          W[i] +
          0x8f1bbcdc) &
        0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 60; i <= 79; i++) {
      temp =
        (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xca62c1d6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}

export function getCurrentDate() {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function getJakartaTime() {
  const now = new Date();

  const utc0 = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    ),
  );

  const utc7 = new Date(utc0.getTime() + 7 * 60 * 60 * 1000);

  return utc7;
}

export function extractMessages(errors: ValidationError[]): string[] {
  const messages: string[] = [];

  for (const err of errors) {
    if (err.constraints) {
      messages.push(...Object.values(err.constraints));
    }

    if (err.children && err.children.length > 0) {
      messages.push(...extractMessages(err.children));
    }

    if (!err.constraints && (!err.children || err.children.length === 0)) {
      messages.push(`property '${err.property}' should not exist`);
    }
  }

  return messages;
}
