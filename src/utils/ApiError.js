/*
For Custom API Errors.
Creates an Error object from the response object of
a HTTP request
*/

class ApiError extends Error{
	constructor(data, ...params){
		super(params)
		let {statusCode, error, message, errorCode} = data
		this.name = "Api Error";
		this.message = message;
		this.error = error;
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}

export default ApiError;