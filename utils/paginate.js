// utils/paginate.js
export function getPaginationParams(req) {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}

export function buildPaginatedResponse(data, total, page, limit) {
    return {
        data,
        meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
        }
    };
}
