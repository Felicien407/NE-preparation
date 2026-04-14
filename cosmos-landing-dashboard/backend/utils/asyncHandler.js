// Used for error handling in route handlers
const asyncHandler = (fn) => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;