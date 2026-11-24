import { getID } from "./../controllers/main.js";
class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkAccountLength(value, divId, mess) {
    if (value.length < 4 || value.length > 6) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkNumberAccount(value, divId, mess) {
    const regexAllNumbers = /^[0-9]+$/;
    if (!value.match(regexAllNumbers)) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkRegexName(value, divId, mess) {
    const letters =
      "a-zàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ";
    const strictRegexName = new RegExp(
      `^[${letters}]+(?: [${letters}]+)*$`,
      "iu",
    );
    if (!value.match(strictRegexName)) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkRegexEmail(value, divId, mess) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value.match(regexEmail)) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkRegexPassword(value, divId, mess) {
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{6,10}$/;

    if (!value.match(regexPassword)) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkRegexDate(value, divId, mess) {
    const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!value.match(regexDate)) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkSalary(value, divId, mess) {
    if (value < 1000000 || value > 20000000) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
  checkRole(value, divId, mess) {
    if (value === "CEO" || value === "Manager" || value === "Staff") {
      getID(divId).innerHTML = "";
      getID(divId).style.display = "none";
      return true;
    }

    getID(divId).innerHTML = mess;
    getID(divId).style.display = "block";
    return false;
  }
  checkWorkingHour(value, divId, mess) {
    if (value < 80 || value > 200) {
      getID(divId).innerHTML = mess;
      getID(divId).style.display = "block";
      return false;
    }
    getID(divId).innerHTML = "";
    getID(divId).style.display = "none";
    return true;
  }
}
export default Validation;
