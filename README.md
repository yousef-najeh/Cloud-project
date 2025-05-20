# Cloud Project

A modern web application built with React and AWS services, featuring real-time chat capabilities and AWS Lex integration.

## 🚀 Features

- Real-time chat functionality
- AWS Lex chatbot integration
- Modern React-based UI
- Responsive design
- AWS Amplify integration
- AWS Dynamodb

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **AWS Services:**
  - AWS Amplify
  - AWS Lex
  - AWS GraphQL
- **HTTP Client:** Axios
- **Styling:** CSS Modules

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- AWS Account with appropriate credentials

## 🚀 Getting Started

1. Clone the repository:
   ``` bash
     git clone https://github.com/yousef-najeh/Cloud-project.git

     cd clode-prject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure AWS:
   - Ensure your AWS credentials are properly configured
   - Update the AWS configuration in `src/aws-config.js`
   - Update the GraphQL configuration in `aws-exports-graphql.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
clode-prject/
├── src/
│   ├── assets/        # Static assets
│   ├── graphql/       # GraphQL queries and mutations
│   ├── pages/         # React components and pages
│   ├── App.jsx        # Main application component
│   ├── aws-config.js  # AWS configuration
│   └── main.jsx       # Application entry point
├── public/            # Public static files
└── aws-exports.js     # AWS Amplify configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_AWS_REGION=your-region
VITE_AWS_USER_POOL_ID=your-user-pool-id
VITE_AWS_USER_POOL_WEB_CLIENT_ID=your-client-id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👥 Authors

- Yousef Samara
- Hasan Hayat
