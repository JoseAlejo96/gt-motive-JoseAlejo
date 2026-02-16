# GT Motive - Vehicle Information SPA

Angular 19 application for browsing vehicle manufacturers and their specifications using the NHTSA vPIC API.

## 📦 Installation
```bash
# Install dependencies
npm install

# Run development server
npm start
```

## 🏗️ Architecture

### SOLID Principles Applied

- **Single Responsibility**: Each component, service, and module has one clear purpose
- **Open/Closed**: NgRx patterns allow extension without modification
- **Liskov Substitution**: Components are interchangeable through interfaces
- **Interface Segregation**: Specific interfaces for different data types
- **Dependency Inversion**: Services injected through Angular DI

### Project Structure
```
src/app/
├── core/                    # Singleton services and interfaces
│   ├── services/           # API and business logic services
│   └── interfaces/         # TypeScript interfaces
├── shared/                 # Reusable components and pipes
│   ├── components/        # Shared UI components
│   └── pipes/            # Custom pipes (highlight, etc.)
├── features/              # Feature modules
│   ├── vehicle-list/     # Main list view
│   └── vehicle-detail/   # Detail view with subcomponents
└── store/                # NgRx state management
    ├── actions/         # Action creators
    ├── reducers/       # State reducers
    ├── effects/       # Side effects handlers
    ├── selectors/    # State selectors
    └── state/       # State interfaces
```

## 🌐 API

This application uses the [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/):
- `GET /vehicles/GetAllMakes` - Fetch all vehicle makes
- `GET /vehicles/GetVehicleTypesForMakeId/{id}` - Get vehicle types
- `GET /vehicles/GetModelsForMakeId/{id}` - Get available models

## 👤 Author

**Jose Alejo**