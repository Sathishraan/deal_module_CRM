import pool from "../config/db.js";

export const getFilteredDeals = async (filters) => {
    let query = "SELECT * FROM deals WHERE 1=1";
    const values = [];

    if (filters.search) {
        query += " AND (name LIKE ? OR contact_name LIKE ? OR company LIKE ?)";
        values.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.stage) {
        query += " AND stage = ?";
        values.push(filters.stage);
    }
    if (filters.minValue) {
        query += " AND value >= ?";
        values.push(filters.minValue);
    }
    if (filters.maxValue) {
        query += " AND value <= ?";
        values.push(filters.maxValue);
    }
    if (filters.startDate) {
        query += " AND created_at >= ?";
        values.push(filters.startDate);
    }
    if (filters.endDate) {
        query += " AND close_date <= ?";
        values.push(filters.endDate);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.execute(query, values);
    return rows;
};
