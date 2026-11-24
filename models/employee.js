export default class Employee {
  constructor(
    account,
    name,
    email,
    password,
    startDate,
    baseSalary,
    role,
    monthlyWorkingHours,
  ) {
    this.account = account; //string
    this.name = name; //string
    this.email = email; //string
    this.password = password; //string
    this.startDate = startDate; //date
    this.baseSalary = baseSalary; //number
    this.role = role; //string
    this.monthlyWorkingHours = monthlyWorkingHours; //number
    this.totalSalary = 0; //number
    this.employeeType = null; //string
  }
  calcTotalSalary() {
    switch (this.role) {
      case "CEO":
        this.totalSalary = this.baseSalary * 3;
        break;
      case "Manager":
        this.totalSalary = this.baseSalary * 2;
        break;
      default:
        this.totalSalary = this.baseSalary;
    }
  }
  calcEmployeeType() {
    if (this.monthlyWorkingHours >= 192) {
      this.employeeType = "nhân viên xuất sắc";
    } else if (this.monthlyWorkingHours >= 176) {
      this.employeeType = "nhân viên giỏi";
    } else if (this.monthlyWorkingHours >= 160) {
      this.employeeType = "nhân viên khá";
    } else {
      this.employeeType = "nhân viên trung bình";
    }
  }
}
