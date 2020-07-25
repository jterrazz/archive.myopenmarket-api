const statusCodes = {};
const status: any = {};

statusCodes[(status.ACCEPTED = 202)] = 'Accepted';
statusCodes[(status.BAD_GATEWAY = 502)] = 'Bad Gateway';
statusCodes[(status.BAD_REQUEST = 400)] = 'Bad Request';
statusCodes[(status.CONFLICT = 409)] = 'Conflict';
statusCodes[(status.CONTINUE = 100)] = 'Continue';
statusCodes[(status.CREATED = 201)] = 'Created';
statusCodes[(status.EXPECTATION_FAILED = 417)] = 'Expectation Failed';
statusCodes[(status.FAILED_DEPENDENCY = 424)] = 'Failed Dependency';
statusCodes[(status.FORBIDDEN = 403)] = 'Forbidden';
statusCodes[(status.GATEWAY_TIMEOUT = 504)] = 'Gateway Timeout';
statusCodes[(status.GONE = 410)] = 'Gone';
statusCodes[(status.HTTP_VERSION_NOT_SUPPORTED = 505)] = 'HTTP Version Not Supported';
statusCodes[(status.IM_A_TEAPOT = 418)] = "I'm a teapot";
statusCodes[(status.INSUFFICIENT_SPACE_ON_RESOURCE = 419)] = 'Insufficient Space on Resource';
statusCodes[(status.INSUFFICIENT_STORAGE = 507)] = 'Insufficient Storage';
statusCodes[(status.INTERNAL_SERVER_ERROR = 500)] = 'Server Error';
statusCodes[(status.LENGTH_REQUIRED = 411)] = 'Length Required';
statusCodes[(status.LOCKED = 423)] = 'Locked';
statusCodes[(status.METHOD_FAILURE = 420)] = 'Method Failure';
statusCodes[(status.METHOD_NOT_ALLOWED = 405)] = 'Method Not Allowed';
statusCodes[(status.MOVED_PERMANENTLY = 301)] = 'Moved Permanently';
statusCodes[(status.MOVED_TEMPORARILY = 302)] = 'Moved Temporarily';
statusCodes[(status.MULTI_STATUS = 207)] = 'Multi-Status';
statusCodes[(status.MULTIPLE_CHOICES = 300)] = 'Multiple Choices';
statusCodes[(status.NETWORK_AUTHENTICATION_REQUIRED = 511)] = 'Network Authentication Required';
statusCodes[(status.NO_CONTENT = 204)] = 'No Content';
statusCodes[(status.NON_AUTHORITATIVE_INFORMATION = 203)] = 'Non Authoritative Information';
statusCodes[(status.NOT_ACCEPTABLE = 406)] = 'Not Acceptable';
statusCodes[(status.NOT_FOUND = 404)] = 'Not Found';
statusCodes[(status.NOT_IMPLEMENTED = 501)] = 'Not Implemented';
statusCodes[(status.NOT_MODIFIED = 304)] = 'Not Modified';
statusCodes[(status.OK = 200)] = 'OK';
statusCodes[(status.PARTIAL_CONTENT = 206)] = 'Partial Content';
statusCodes[(status.PAYMENT_REQUIRED = 402)] = 'Payment Required';
statusCodes[(status.PERMANENT_REDIRECT = 308)] = 'Permanent Redirect';
statusCodes[(status.PRECONDITION_FAILED = 412)] = 'Precondition Failed';
statusCodes[(status.PRECONDITION_REQUIRED = 428)] = 'Precondition Required';
statusCodes[(status.PROCESSING = 102)] = 'Processing';
statusCodes[(status.PROXY_AUTHENTICATION_REQUIRED = 407)] = 'Proxy Authentication Required';
statusCodes[(status.REQUEST_HEADER_FIELDS_TOO_LARGE = 431)] = 'Request Header Fields Too Large';
statusCodes[(status.REQUEST_TIMEOUT = 408)] = 'Request Timeout';
statusCodes[(status.REQUEST_TOO_LONG = 413)] = 'Request Entity Too Large';
statusCodes[(status.REQUEST_URI_TOO_LONG = 414)] = 'Request-URI Too Long';
statusCodes[(status.REQUESTED_RANGE_NOT_SATISFIABLE = 416)] = 'Requested Range Not Satisfiable';
statusCodes[(status.RESET_CONTENT = 205)] = 'Reset Content';
statusCodes[(status.SEE_OTHER = 303)] = 'See Other';
statusCodes[(status.SERVICE_UNAVAILABLE = 503)] = 'Service Unavailable';
statusCodes[(status.SWITCHING_PROTOCOLS = 101)] = 'Switching Protocols';
statusCodes[(status.TEMPORARY_REDIRECT = 307)] = 'Temporary Redirect';
statusCodes[(status.TOO_MANY_REQUESTS = 429)] = 'Too Many Requests';
statusCodes[(status.UNAUTHORIZED = 401)] = 'Unauthorized';
statusCodes[(status.UNPROCESSABLE_ENTITY = 422)] = 'Unprocessable Entity';
statusCodes[(status.UNSUPPORTED_MEDIA_TYPE = 415)] = 'Unsupported Media Type';
statusCodes[(status.USE_PROXY = 305)] = 'Use Proxy';

export const getStatusText = function (statusCode) {
    if (statusCodes.hasOwnProperty(statusCode)) {
        return statusCodes[statusCode];
    } else {
        throw new Error('Status code does not exist: ' + statusCode);
    }
};

export const getStatusCode = function (reasonPhrase) {
    for (const key in statusCodes) {
        if (statusCodes[key] === reasonPhrase) {
            return parseInt(key, 10);
        }
    }
    throw new Error('Reason phrase does not exist: ' + reasonPhrase);
};

export default status;
