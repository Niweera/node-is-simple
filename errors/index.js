module.exports = {
  AccessDeniedError: class AccessDeniedError {
    constructor(message) {
      this.message = message;
    }
  },
  AuthenticationError: class AuthenticationError {
    constructor(message) {
      this.message = message;
    }
  },
  ValidationError: class ValidationError {
    constructor(message) {
      this.message = message;
    }
  },
  NotFoundError: class NotFoundError {
    constructor(message) {
      this.message = message;
    }
  }
};
