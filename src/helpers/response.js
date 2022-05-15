const successResponse = (res, status, data, meta) => {
    res.status(status).json({
        data,
        meta,
        err: null
    });
};

const errorResponse = (res, status, err) => {
    res.status(status).json({
        err
    });
};

module.exports = {
    successResponse,
    errorResponse
};
