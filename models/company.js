export default class Company {
  //khởi tạo
  constructor() {
    this.arr = [];
  }
  //thêm nhân viên vào mảng công ty
  add(employee) {
    this.arr.push(employee);
  }
  _findIndex(account) {
    return this.arr.findIndex((employee) => employee.account === account);
  }
  // Lấy nhân viên theo account để đưa lên form sửa, không tìm thấy thì trả về undefined
  getEmployeeById(account) {
    const index = this._findIndex(account);
    if (index !== -1) {
      return this.arr[index];
    }
  }

  // Thay thông tin NV cũ bằng thông tin NV mới có cùng account
  update(employee) {
    //tìm vị trí
    const index = this._findIndex(employee.account);

    //kiểm tra nếu vị trí khác -1 thì cập nhật
    if (index !== -1) {
      this.arr[index] = employee;
    }
  }

  //xóa nhân viên theo account
  delete(account) {
    //tìm vị trí
    const index = this._findIndex(account);
    //kiểm tra nếu vị trí khác -1 thì xóa
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }
  //tìm loại nhân viên
  searchType(keyword) {
    //1. Tạo danh sách listSearch = []
    const listSearch = [];

    //chuyển keyword về chữ thường để tìm không phân biệt hoa/thường
    const keywordLowerCase = keyword.toLowerCase();

    //2. Duyệt mảng
    for (let i = 0; i < this.arr.length; i++) {
      //2.1. Lấy employee = this.arr[i]
      const employee = this.arr[i];
      //chuyển tên loại về chữ thường
      const nameLowerCase = employee.employeeType.toLowerCase();

      //2.2. Nếu type có chứa keyword
      if (nameLowerCase.includes(keywordLowerCase)) {
        //2.3. Thêm employee vô listSearch
        listSearch.push(employee);
      }
    }

    //3. Trả về listSearch
    return listSearch;
  }
}
