
export default function handleError(err,res) {
    return res.status(500).json({
        status:'error',
        statusCode:500,
        message:err.message
    })
}