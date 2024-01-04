import moment from 'moment';

const getBiWeek = () => {
  const dt = new Date();
  const currentDay = moment().format('D');
  const monthEndDay = moment(
    new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
  ).format('D');

  if (parseInt(currentDay, 10) >= 1 && parseInt(currentDay, 10) <= 15) {
    return {
      startDate: moment(new Date(dt.getFullYear(), dt.getMonth(), 1)).format(
        'YYYY-MM-DD'
      ),
      endDate: moment(new Date(dt.getFullYear(), dt.getMonth(), 15)).format(
        'YYYY-MM-DD'
      ),
    };
  }

  return {
    startDate: moment(new Date(dt.getFullYear(), dt.getMonth(), 16)).format(
      'YYYY-MM-DD'
    ),
    endDate: moment(
      new Date(dt.getFullYear(), dt.getMonth(), monthEndDay)
    ).format('YYYY-MM-DD'),
  };
};

export default getBiWeek;
