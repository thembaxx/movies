export const sortList = [
  {
    name: 'Default',
    prop: 'release_date.desc',
    isChecked: true,
  },
  {
    name: 'Recently added',
    prop: 'primary_release_date.desc',
    isChecked: false,
  },
  {
    name: 'Most popular',
    prop: 'popularity.desc',
    isChecked: false,
  },
  {
    name: 'Alphabetical',
    prop: 'original_title.asc',
    isChecked: false,
  },
  {
    name: 'Release date',
    prop: 'release_date.desc',
    isChecked: false,
  },
  {
    name: 'Rating',
    prop: 'vote_average.desc',
    isChecked: false,
  },
  {
    name: 'Top grossing',
    prop: 'revenue.desc',
    isChecked: false,
  },
];

export function getYears() {
  const years = [];
  const ranges = [
    {
      name: '2020s',

      start: '2020-01-01',
      end: '2029-12-31',
      isChecked: false,
    },
    {
      name: '2010s',
      start: '2010-01-01',
      end: '2019-12-31',
      isChecked: false,
    },
    {
      name: '2000s',
      start: '2000-01-01',
      end: '2009-12-31',
      isChecked: false,
    },
    {
      name: '1990s',
      start: '1990-01-01',
      end: '1999-12-31',
      isChecked: false,
    },
    {
      name: '1980s',
      start: '1980-01-01',
      end: '1989-12-31',
      isChecked: false,
    },
    {
      name: '1970s',
      start: '1970-01-01',
      end: '1979-12-31',
      isChecked: false,
    },
    {
      name: '1960s',
      start: '1960-01-01',
      end: '1969-12-31',
      isChecked: false,
    },
  ];

  const d = new Date();
  const max = d.getFullYear();
  const min = 2000;

  for (let i = max; i >= min; i--) {
    years.push({
      name: `${i}`,
      isRange: false,
      isChecked: false,
    });
  }

  const maxRange = Number(`${max.toString().slice(0, 3)}0`);
  const minRange = 1900;
  for (let i = maxRange; i >= minRange; i -= 10) {
    years.push({
      name: `${i}s`,
      start: i,
      end: i + 9,
      isRange: true,
      isChecked: false,
    });
  }
  return years;
}
