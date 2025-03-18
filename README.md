# Structure

## Description
A structured web application built with TypeScript, React, and modular folder organization for scalability and maintainability.

## Tech Stack
- **Frontend**: React, TypeScript, SCSS
- **State Management**: Redux (Assumed from store structure)
- **Backend API Communication**: Custom API services in `base-api`
- **Notifications**: Custom notification services
- **Dynamic Forms**: Schema-based form rendering

## Folder Structure
```
├── build/              # Build files
├── public/             # Public assets
├── sec/
│   ├── assets/        # Static assets
│   │   ├── configs/   # Configuration files
│   │   │   ├── index.json
│   │   ├── images/    # Image assets
│   ├── scss/          # Stylesheets
│   │   ├── components/
│   │   ├── global/
│   │   ├── layout/
│   │   ├── utils/
│   ├── core/          # Core modules
│   │   ├── config/    # App configuration
│   │   ├── dynamicForm/  # Dynamic form handling
│   │   ├── error/     # Error handling services
│   │   ├── helpers/   # Helper functions & services
│   │   ├── notification/ # Notification system
│   ├── feature/       # Features of the app
│   │   ├── admin/     # Admin-related modules
│   ├── shared/        # Shared utilities and components
│   │   ├── components/
│   │   ├── constants/ # Application constants and enums
│   │   ├── context/   # React Contexts
│   │   ├── hooks/     # Custom Hooks
│   │   ├── interfaces/
│   │   ├── utils/
│   ├── store/         # Redux store
├── App.css            # Global styles
├── App.tsx            # Main App Component
├── index.scss         # SCSS entry file
├── main.tsx           # Main application entry point
```

## Installation
```sh
git clone <repository-url>
cd <project-directory>
npm install
```

## Running the Project
```sh
npm run dev  # For development mode
npm run build # To create production build
```

## Features
- **Modular Architecture**: Structured folder setup for scalability
- **Custom API Handling**: Abstract API services in `base-api`
- **Dynamic Form Handling**: Schema-based forms for flexibility
- **Notification System**: Built-in notification management
- **Error Handling**: Centralized error handling module

## Contribution
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added feature XYZ"`)
4. Push to branch (`git push origin feature-branch`)
5. Create a Pull Request

