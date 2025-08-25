import { getFilteredDeals } from "../models/Deals.js";


export const fetchDeals = async (req, res, next) => {
    try {
        const filters = {
            search: req.query.search || null,
            stage: req.query.stage || null,
            minValue: req.query.minValue || null,
            maxValue: req.query.maxValue || null,
            startDate: req.query.startDate || null,
            endDate: req.query.endDate || null,
        };

        const deals = await getFilteredDeals(filters);
        res.json(deals);
    } catch (err) {
        next(err);
    }
};


// GET deal by ID
export const getDealById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM deals WHERE id = ?", [id]);
      if (rows.length === 0) return res.status(404).json({ message: "Deal not found" });
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  };
  
  