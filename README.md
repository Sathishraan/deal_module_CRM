# Deals CRM Module

A full-stack application for managing business deals with advanced search and filtering capabilities.

## Architecture Overview

This project implements a modern full-stack architecture:

### Frontend
- **React 18** with functional components and hooks
- **Material-UI (MUI)** for consistent, responsive design
- **Framer Motion** for smooth animations and transitions
- **Axios** for API communication
- **React Query** for efficient data fetching and caching

### Backend
- **Express.js** REST API server
- **MySQL** database with optimized queries
- **Sequelize ORM** for database operations
- **CORS** enabled for frontend communication
- **Express Rate Limiting** for API protection

### Database Schema
```sql
CREATE TABLE deals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  stage ENUM('New', 'In Progress', 'Won', 'Lost') NOT NULL,
  value DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  close_date DATE,
  INDEX idx_stage (stage),
  INDEX idx_company (company),
  INDEX idx_value (value),
  INDEX idx_created_at (created_at),
  FULLTEXT KEY ft_search (name, contact_name, company)
);
```

## Features

### Search & Filter Functionality
- **Text Search**: Search across deal name, contact name, and company using MySQL FULLTEXT indexing
- **Stage Filter**: Filter by deal stages (New, In Progress, Won, Lost)
- **Value Range**: Filter by minimum and maximum deal values
- **Date Filters**: Filter by creation date or closing date ranges
- **Combined Filters**: Multiple filters can be applied simultaneously

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Framer Motion powers filter panel transitions and card animations
- **Loading States**: Skeleton loaders while data is being fetched
- **Empty States**: Friendly messages when no deals match criteria
- **Pagination**: Efficient loading of large datasets (20 items per page)
- **Real-time Search**: Debounced search input for optimal performance

## Project Structure

```
deals-crm/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DealsFilter.js
│   │   │   ├── DealCard.js
│   │   │   ├── SearchBar.js
│   │   │   └── LoadingState.js
│   │   ├── hooks/
│   │   │   └── useDeals.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── formatters.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Deal.js
│   ├── routes/
│   │   └── deals.js
│   ├── controllers/
│   │   └── dealsController.js
│   ├── middleware/
│   │   └── validation.js
│   ├── scripts/
│   │   ├── setup-database.js
│   │   └── seed-data.js
│   ├── server.js
│   └── package.json
├── database/
│   ├── schema.sql
│   └── seed-data.sql
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

### Database Setup

1. **Install and start MySQL**
   ```bash
   # On macOS with Homebrew
   brew install mysql
   brew services start mysql
   
   # On Ubuntu/Debian
   sudo apt install mysql-server
   sudo systemctl start mysql
   ```

2. **Create database and user**
   ```sql
   CREATE DATABASE deals_crm;
   CREATE USER 'deals_user'@'localhost' IDENTIFIED BY 'deals_password';
   GRANT ALL PRIVILEGES ON deals_crm.* TO 'deals_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Run database schema**
   ```bash
   mysql -u deals_user -p deals_crm < database/schema.sql
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   DB_HOST=localhost
   DB_USER=deals_user
   DB_PASSWORD=deals_password
   DB_NAME=deals_crm
   DB_PORT=3306
   ```

4. **Setup database and seed data**
   ```bash
   npm run setup-db
   npm run seed
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   Server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   Application will open at `http://localhost:3000`

## API Endpoints

### GET /api/deals
Retrieve deals with optional filtering and pagination.

**Query Parameters:**
- `search` - Text search across name, contact_name, company
- `stage` - Filter by deal stage
- `minValue` - Minimum deal value
- `maxValue` - Maximum deal value  
- `startDate` - Filter deals created after this date
- `endDate` - Filter deals created before this date
- `closeStartDate` - Filter by closing date range start
- `closeEndDate` - Filter by closing date range end
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Example Response:**
```json
{
  "success": true,
  "data": {
    "deals": [
      {
        "id": 1,
        "name": "Enterprise Software License",
        "contact_name": "John Smith",
        "company": "TechCorp Inc",
        "stage": "In Progress",
        "value": "50000.00",
        "created_at": "2024-01-15T10:30:00.000Z",
        "close_date": "2024-03-01"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 95,
      "itemsPerPage": 20
    }
  }
}
```

## Performance Optimizations

### Database Optimizations
- **Indexes**: Strategic indexing on frequently queried columns (stage, company, value, dates)
- **Full-text Search**: MySQL FULLTEXT index for efficient text searching
- **Query Optimization**: Efficient WHERE clauses and LIMIT usage
- **Connection Pooling**: Sequelize connection pooling for better performance

### Frontend Optimizations  
- **React Query**: Caching and background updates
- **Debounced Search**: Reduces API calls during typing
- **Virtual Scrolling**: Considered for very large datasets
- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo and useMemo for expensive calculations

## Design Decisions & Tradeoffs

### Technology Choices
- **MUI over custom CSS**: Faster development with consistent design system
- **Sequelize ORM**: Easier database operations with built-in validations
- **React Query**: Better caching and loading states than raw useState/useEffect
- **Framer Motion**: Smooth animations without complex CSS

### Database Design
- **ENUM for stage**: Better data integrity than VARCHAR
- **Separate close_date**: Allows for flexible deal timelines
- **DECIMAL for value**: Precise monetary calculations
- **FULLTEXT index**: Better search performance than LIKE queries

### API Design
- **REST over GraphQL**: Simpler implementation for this scope
- **Query parameters**: Flexible filtering without complex request bodies
- **Pagination**: Server-side pagination for scalability
- **Validation middleware**: Input sanitization and validation

## Testing Strategy

### Backend Testing
```bash
cd backend
npm test
```
- Unit tests for controllers and models
- Integration tests for API endpoints
- Database seeding tests

### Frontend Testing
```bash
cd frontend
npm test
```
- Component unit tests with React Testing Library
- User interaction tests
- API integration tests with MSW

## Deployment Considerations

### Production Environment Variables
```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_SSL=true
CORS_ORIGIN=https://your-frontend-domain.com
```

### Recommended Deployment
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: AWS EC2, DigitalOcean, or Heroku
- **Database**: AWS RDS, Google Cloud SQL, or PlanetScale

## Future Enhancements

### Potential Features
- **Real-time Updates**: WebSocket integration for live deal updates
- **Advanced Analytics**: Deal pipeline reporting and charts
- **Export Functionality**: CSV/Excel export of filtered results
- **Deal History**: Audit trail for deal changes
- **User Authentication**: Role-based access control
- **Advanced Search**: Elasticsearch integration for complex queries

### Performance Improvements
- **Redis Caching**: Cache frequently accessed data
- **Database Sharding**: For massive datasets
- **CDN Integration**: Static asset optimization
- **API Rate Limiting**: Enhanced protection and quotas

## Troubleshooting

### Common Issues

**Database Connection Error**
```bash
Error: ER_ACCESS_DENIED_ERROR: Access denied for user
```
Solution: Verify database credentials in `.env` file

**Port Already in Use**
```bash
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Kill process using the port or change PORT in `.env`

**CORS Errors**
```bash
Access to XMLHttpRequest blocked by CORS policy
```
Solution: Verify CORS_ORIGIN in backend `.env` matches frontend URL

### Database Reset
```bash
cd backend
npm run reset-db
npm run seed
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is created for interview purposes and is not intended for commercial use.

---

**Contact**: For any questions about this implementation, please reach out to the development team.