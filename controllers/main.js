import Employee from "../models/employee.js";
import Company from "../models/company.js";
const company = new Company();
getLocalStorage();
function getID(id) {
  return document.getElementById(id);
}
function handleEdit() {
  const account = getID("tknv").value;
  const name = getID("name").value;
  const email = getID("email").value;
  const password = getID("password").value;
  const startSate = getID("datepicker").value;
  const baseSalary = getID("luongCB").value * 1;
  const role = getID("chucvu").value;
  const monthlyWorkingHours = getID("gioLam").value * 1;
  const employee = new Employee(
    account,
    name,
    email,
    password,
    startSate,
    baseSalary,
    role,
    monthlyWorkingHours,
  );
  employee.calcEmployeeType();
  employee.calcTotalSalary();
  return employee;
}
function renderListEmployee(company) {
  let content = "";
  for (let i = 0; i < company.arr.length; i++) {
    content += `<tr>
  <td>${company.arr[i].account}</td>
  <td>${company.arr[i].name}</td>
  <td>${company.arr[i].email}</td>
  <td>${company.arr[i].startDate}</td>
  <td>${company.arr[i].role === "CEO" ? "Sếp" : company.arr[i].role === "Manager" ? "Trưởng phòng" : "Nhân viên"}</td>
  <td>${company.arr[i].totalSalary}</td>
  <td>${company.arr[i].employeeType}</td>
  <td></td>
  </tr>`;
  }
  getID("tableDanhSach").innerHTML = content;
}
getID("btnThemNV").onclick = function () {
  const employee = handleEdit();
  company.add(employee);
  setLocalStorage();
  renderListEmployee(company);
};
/**
 * Lưu danh sách món ăn xuống localStorage
 */
function setLocalStorage() {
  //convert restaurant.arr => string
  const dataString = JSON.stringify(company.arr);
  localStorage.setItem("LIST_EMPLOYEE", dataString);
}

/**
 * Lấy dữ liệu đã lưu từ localStorage lên ...
 */

function getLocalStorage() {
  const dataString = localStorage.getItem("LIST_EMPLOYEE");
  //convert string => json
  company.arr = JSON.parse(dataString);
  renderListEmployee(company);
}
