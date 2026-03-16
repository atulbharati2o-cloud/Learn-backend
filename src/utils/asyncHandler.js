
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch( (err) => {
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Internal Server Error"
            });
            next(err);
        });
    }
}


export { asyncHandler };








// const assynHandler = (requestHandler) => async (req, res, next) => {
//     try{
//         await requestHandler(req, res, next);
//     } catch (error) {
//         res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         });
//         next(error);
//     }
// }