import Employee from "../models/employee.js";
import Company from "../models/company.js";
import Validation from "../models/validation.js";
const company = new Company();
const validation = new Validation();
//khi tải mới trang thì lấy thông tin nhân viên từ mảng lưu trong local storage
getLocalStorage();
//hàm DOM nhanh
export function getID(id) {
  return document.getElementById(id);
}
//lấy thông tin nhân viên trong form
function getInfoEmployee() {
  const account = getID("tknv").value;
  const name = getID("name").value.trim().normalize("NFC");
  const email = getID("email").value;
  const password = getID("password").value;
  const startDate = getID("datepicker").value;
  let baseSalary = getID("luongCB").value;
  const role = getID("chucvu").value;
  let monthlyWorkingHours = getID("gioLam").value;
  //validation
  let isValid = true;
  //check tên tài khoản: không trống, độ dài 4-6, chỉ chứa số
  isValid &=
    validation.checkEmpty(account, "tbTKNV", "Tài khoản không được trống") &&
    validation.checkAccountLength(
      account,
      "tbTKNV",
      "Độ dài tài khoản phải từ 4-6",
    ) &&
    validation.checkNumberAccount(account, "tbTKNV", "Tài khoản chỉ chứa số");
  //check tên không trống, chỉ chứa chữ
  isValid &=
    validation.checkEmpty(name, "tbTen", "Họ và tên không được trống") &&
    validation.checkRegexName(name, "tbTen", "Họ tên chỉ chứa chữ");
  //check email không trống, đúng cấu trúc email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "Email không được trống") &&
    validation.checkRegexEmail(email, "tbEmail", "Email không đúng định dạng");
  //check mật khẩu: không trống, dài 6-10, chứa ít nhất 1 ký tự số, 1 ký tự hoa và 1 ký tự đặc biệt
  isValid &=
    validation.checkEmpty(password, "tbMatKhau", "Mật khẩu không được trống") &&
    validation.checkRegexPassword(
      password,
      "tbMatKhau",
      "Mật khẩu 6-10 ký tự, có số, chữ hoa và ký tự đặc biệt",
    );
  //check ngày: không trống và định dạng mm/dd/yyyy
  isValid &=
    validation.checkEmpty(startDate, "tbNgay", "Ngày không được trống") &&
    validation.checkRegexDate(
      startDate,
      "tbNgay",
      "Định dạng ngày phải là mm/dd/yyyy",
    );
  //check lương cơ bản: không trống và từ 1.000.000đ - 20.000.000đ
  isValid &=
    validation.checkEmpty(
      baseSalary,
      "tbLuongCB",
      "Lương cơ bản không được trống",
    ) &&
    validation.checkSalary(
      baseSalary,
      "tbLuongCB",
      "Lương cơ bản từ 1.000.000đ - 20.000.000đ",
    );
  //check chức vụ: không trống và thuộc 3 giá trị cho trước
  isValid &=
    validation.checkEmpty(role, "tbChucVu", "Chức vụ không được trống") &&
    validation.checkRole(role, "tbChucVu", "Chức vụ không hợp lệ");
  //check giờ làm: không trống và từ 80-200
  isValid &=
    validation.checkEmpty(
      monthlyWorkingHours,
      "tbGiolam",
      "Giờ làm không được trống",
    ) &&
    validation.checkWorkingHour(
      monthlyWorkingHours,
      "tbGiolam",
      "Giờ làm phải từ 80-200",
    );

  //
  if (!isValid) {
    return null;
  }
  //hợp lệ
  baseSalary *= 1;
  monthlyWorkingHours *= 1;
  const employee = new Employee(
    account,
    name,
    email,
    password,
    startDate,
    baseSalary,
    role,
    monthlyWorkingHours,
  );
  employee.calcEmployeeType();
  employee.calcTotalSalary();
  return employee;
}
//trình bày thông tin nhân viên trong mảng lên bảng
function renderListEmployee(company) {
  let content = "";
  const formatVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  for (let i = 0; i < company.length; i++) {
    content += `<tr>
  <td>${company[i].account}</td>
  <td>${company[i].name}</td>
  <td>${company[i].email}</td>
  <td>${company[i].startDate}</td>
  <td>${company[i].role === "CEO" ? "Sếp" : company[i].role === "Manager" ? "Trưởng phòng" : "Nhân viên"}</td>
  <td>${formatVND.format(company[i].totalSalary)}</td>
  <td>${company[i].employeeType}</td>
  <td class="text-nowrap">
    <button onclick="handleEdit('${company[i].account}')" class="btn btn-sm btn-info" title="Sửa" data-toggle="modal" data-target="#myModal">
      <i class="fa fa-pencil"></i>
    </button>
    <button onclick="handleDelete('${company[i].account}')" class="btn btn-sm btn-danger" title="Xóa">
      <i class="fa fa-trash"></i>
    </button></td>
  </tr>`;
  }
  getID("tableDanhSach").innerHTML = content;
}
//Sửa thông tin nhân viên
function handleEdit(id) {
  //cập nhật giao diện
  getID("header-title").innerHTML = "Cập nhật nhân viên";
  getID("btnCapNhat").style.display = "block";
  getID("btnThemNV").style.display = "none";

  //xử lý data
  const employee = company.getEmployeeById(id);
  if (employee) {
    getID("tknv").value = employee.account;
    getID("tknv").readOnly = true;
    getID("name").value = employee.name;
    getID("email").value = employee.email;
    getID("password").value = employee.password;
    getID("datepicker").value = employee.startDate;
    getID("luongCB").value = employee.baseSalary;
    getID("chucvu").value = employee.role;
    getID("gioLam").value = employee.monthlyWorkingHours;
  }
}
window.handleEdit = handleEdit;
getID("btnCapNhat").onclick = function () {
  const employee = getInfoEmployee();
  if (employee) {
    company.update(employee);
    setLocalStorage();
    renderListEmployee(company.arr);
    getID("btnDong").click();
  }
};
//thêm mới nhân viên
getID("btnThem").onclick = function () {
  getID("header-title").innerHTML = "Thêm nhân viên";
  getID("btnCapNhat").style.display = "none";
  getID("btnThemNV").style.display = "block";
  getID("tknv").readOnly = false;
  resetForm();
};
getID("btnThemNV").onclick = function () {
  const employee = getInfoEmployee();
  if (employee) {
    company.add(employee);
    setLocalStorage();
    renderListEmployee(company.arr);
    getID("btnDong").click();
  }
};
function resetForm() {
  //reset input
  getID("tknv").value = null;
  getID("name").value = null;
  getID("email").value = null;
  getID("password").value = null;
  $("#datepicker").datepicker("setDate", new Date());
  getID("luongCB").value = null;
  getID("chucvu").value = "";
  getID("gioLam").value = null;
  //reset thông báo
  getID("tbTKNV").innerHTML = "";
  getID("tbTen").innerHTML = "";
  getID("tbEmail").innerHTML = "";
  getID("tbMatKhau").innerHTML = "";
  getID("tbNgay").innerHTML = "";
  getID("tbLuongCB").innerHTML = "";
  getID("tbChucVu").innerHTML = "";
  getID("tbGiolam").innerHTML = "";
}
//xóa nhân viên
function handleDelete(account) {
  company.delete(account);
  setLocalStorage();
  renderListEmployee(company.arr);
}
window.handleDelete = handleDelete;
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
  renderListEmployee(company.arr);
}
/**
 * search employee Type
 */
getID("searchName").addEventListener("keyup", function () {
  const keyword = getID("searchName").value.trim();
  const listSearch = company.searchType(keyword);
  renderListEmployee(listSearch);
});
