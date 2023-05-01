class BaseResponseObject {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

exports.SuccessResponseObject = class SuccessResponseObject extends (
  BaseResponseObject
) {
  constructor(message, data) {
    super(true, message, data);
  }
};

exports.ErrorResponseObject = class ErrorResponseObject extends (
  BaseResponseObject
) {
  constructor(message, data) {
    super(false, message, data);
  }
};
