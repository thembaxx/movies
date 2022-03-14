export function getRatingColor(value) {
  const ratingColors = {
    bad: {
      color: 'white',
      background: 'grey',
    },
    average: {
      color: 'black',
      background: 'red',
    },
    good: {
      color: 'rgba(2, 12, 30, 1)',
      background: 'yellow',
    },
    awesome: {
      color: 'white',
      background: 'green',
    },
  };

  if (value === 0) return ratingColors.bad;
  else if (value > 0 && value < 50) return ratingColors.average;
  else if (value >= 50 && value < 70) return ratingColors.good;
  else if (value >= 70) return ratingColors.awesome;
}

export function formatDate(dateStr) {
  if (!dateStr) return;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateArr = dateStr.split('-');
  let day = dateArr[2];
  if (day.startsWith('0')) {
    day = day.split('')[1];
  }

  return `${months[dateArr[1] - 1]} ${day}, ${dateArr[0]}`;
}

export function capitalizeStr(s) {
  if (!s) return;

  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
