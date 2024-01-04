import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import removeTypename from 'utils/removeTypeName';
import setErrorMessage from 'utils/setErrorMessage';
import { ALL_SALE_ANALYTICS } from './queries';

const MonthlyOrderList = ({ filter }) => {
  const { loading, error, data = {} } = useQuery(ALL_SALE_ANALYTICS, {
    variables: {
      filter,
    },
  });
  if (error) return <div>{setErrorMessage(error)}</div>;
  if (loading) return <div>loading...</div>;
  const { allSalesAnalytics = [] } = data;
  const analyticsData = [...Array(30)].map((item, k) => {
    const day = k + 1;
    const found = allSalesAnalytics.find(e => e.day === day);
    if (found) return removeTypename(found);
    return {
      day,
      completedOrders: 0,
    };
  });

  return (
    <div>
      <BarChart
        width={1000}
        height={400}
        data={analyticsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completedOrder" name="Orders" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default MonthlyOrderList;
