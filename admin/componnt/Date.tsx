import React, { useCallback, useEffect, useMemo, useState } from "react";

type DateReact = {
  onChange(p: string): void;
  className?: string;
  cellClassName?: string;
  int?: string;
};
export default function DateReact(param: DateReact) {
  console.log(param.int);

  let da;
  if (param.int == undefined || param.int == "") {
    da = new Date();
  } else {
    da = new Date(parseInt(param.int) * 1000);
  }

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

  return (
    <div className={param.className}>
      <input
        onChange={(e) => {
          da.setDate(parseInt(e.target.value));
          param.onChange(da.getTime() / 1000 + "");
        }}
        placeholder="ngày"
        className={param.cellClassName}
        list="day"
        value={da.getDate()}
        type="number"
      />
      <datalist id="day" className={param.cellClassName}>
        {day}
      </datalist>
      <input
        onChange={(e) => {
         
          da.setMonth(parseInt(e.target.value) - 1);
          param.onChange(da.getTime() / 1000 + "");
        }}
        value={da.getMonth() + 1}
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
        
          da.setFullYear(parseInt(e.target.value));
          param.onChange(da.getTime() / 1000 + "");
        }}
        value={da.getFullYear()}
        placeholder="năm"
        type="number"
        className={param.cellClassName}
        list="year"
      />
      <datalist id="year">{year}</datalist>
    </div>
  );
}
