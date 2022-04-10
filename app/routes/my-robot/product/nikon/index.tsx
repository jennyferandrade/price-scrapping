import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link, useCatch } from "remix";
import React from "react";


const data = [
    {
        date: '04-01',
        avgPrice: 2800,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-02',
        avgPrice: 3000,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-03',
        avgPrice: 2000,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-04',
        avgPrice: 2780,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-05',
        avgPrice: 1890,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-06',
        avgPrice: 2390,
        minPrice: 2500,
        maxPrice: 2800,
    },
    {
        date: '04-07',
        avgPrice: 3490,
        minPrice: 2500,
        maxPrice: 2800,
    },
];


export default function Nikon() {
  return (
    <div className="container">
      <Link to="/my-robot" className="breadcrumbs">
        {"< Mis habilidades"}
      </Link>
      <div className="content" data-light="">
        <p>Analiza el precio de tu producto: </p>
          <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
              }}
          >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="maxPrice" stroke="#82ca9d" />
              <Line type="monotone" dataKey="minPrice" stroke="#cc0000" />
          </LineChart>
      </div>


    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return <div>Error not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
