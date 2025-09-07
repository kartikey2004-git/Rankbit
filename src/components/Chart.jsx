import { sortBy, uniqBy } from "lodash";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const Chart = ({ results, width }) => {
  console.log("Raw results:", results);

  results = (results || []).filter((r) => r.rank);
  if (!results?.length) return "";

  // Map results into usable form
  let data = results.map((result) => ({
    keyword: result.keyword,
    date: result.createdAt.substring(0, 10),
    rank: result.rank,
  }));

  const originalData = [...data];
  data = uniqBy(data, (r) => r.date);

  // Pick best rank per date
  data.forEach((result, index) => {
    const sameDay = originalData.filter((o) => o.date === result.date);
    if (sameDay.length > 1) {
      data[index].rank = Math.min(...sameDay.map((r) => r.rank));
    }
  });

  data = sortBy(data, "date");

  // Compute Y domain
  const minRank = Math.min(...data.map((r) => r.rank));
  const maxRank = Math.max(...data.map((r) => r.rank));

  return (
    <div>
      <ResponsiveContainer width={width} height={80}>
        <AreaChart
          data={data}
          width={width}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* Y axis now scales properly */}
          <YAxis hide={true} domain={[minRank - 2, maxRank + 2]} />

          <Tooltip
            labelFormatter={(value, name, props) =>
              props?.payload?.date?.substring(0, 10)
            }
            formatter={(value, name, props) => [
              "Rank: " + props?.payload?.rank,
            ]}
          />

          <Area
            type="monotone"
            dataKey="rank"
            stroke="#000000"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;