import React from "react";

export default function Artist() {
  return (
    <div>
      <button>Thêm tài khoản</button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ảnh</th>
            <th>Tài khoản</th>
            <th>Tên</th>
            <th>Tháo tác</th>
          </tr>
        </thead>
        <tbody className=""></tbody>
      </table>
    </div>
  );
}
