class apiResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.data = data || null;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export { apiResponse };
