import React, { useCallback, useEffect, useMemo, useState } from "react";

type DateReact = {
  onChange(p: string): void;
  className?: string;
  cellClassName?: string;
  int?: string;
};
export default function DateReact(param: DateReact) {
  const [d, Sd] = useState({ d: 0, m: 0, y: 0 });

  let day = [];
  for (let i = 1; i <= 31; i++) {
    day.push(<option value={i} />);
  }
  let month = [];
  for (let i = 1; i <= 12; i++) {
    month.push(<option value={i} />);
  }
  let year = [];
  for (let i = 1900; i <= 2100; i++) {
    year.push(<option value={i} />);
  }

  useMemo(() => {
    console.log(d);

    let da;
    if (param.int == undefined || param.int == "") {
      da = new Date();
    } else {
      da = new Date(parseInt(param.int) * 1000);
    }
    Sd({ d: da.getDate(), m: da.getMonth() + 1, y: da.getFullYear() });
  }, [param.int]);
  useEffect(() => {
    let date = new Date();
    date.setDate(d.d);
    date.setMonth(d.m - 1);
    date.setFullYear(d.y);
    param.onChange(Math.floor(date.getTime() / 1000) + "");
  }, [d]);
  return (
    <div className={param.className}>
      <input
        onChange={(e) => {
          Sd({ ...d, d: parseInt(e.currentTarget.value) });
        }}
        placeholder="ngày"
        className={param.cellClassName}
        list="day"
        value={d.d}
        type="number"
      />
      <datalist id="day" className={param.cellClassName}>
        {day}
      </datalist>
      <input
        onChange={(e) => {
          Sd({ ...d, m: parseInt(e.currentTarget.value) });
        }}
        value={d.m}
        placeholder="tháng"
        className={param.cellClassName}
        list="month"
        type="number"
      />
      <datalist id="month" className={param.cellClassName}>
        {month}
      </datalist>

      <input
        onChange={(e) => {
          Sd({ ...d, y: parseInt(e.currentTarget.value) });
        }}
        value={d.y}
        placeholder="năm"
        type="number"
        className={param.cellClassName}
        list="year"
      />
      <datalist id="year">{year}</datalist>
    </div>
  );
}
