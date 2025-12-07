# GitHub Actions CI/CD Pipeline

This directory contains GitHub Actions workflows for automated CI/CD pipeline.

## 📁 Workflows

### `ci-cd.yml` - Main CI/CD Pipeline

The primary workflow that handles:

- **Source Stage**: Triggers on push, PR, release, or manual dispatch
- **Build Stage**: Builds frontend and backend applications
- **Test Stage**: Runs automated tests (Jest for backend, Cypress for frontend)
- **Pipeline Status**: Aggregates and reports overall pipeline status

## 🚀 Pipeline Stages

### 1. Build Stage

- Installs dependencies for both frontend and backend
- Builds React frontend application
- Verifies backend setup
- Uploads build artifacts for later stages

### 2. Test Stage - Backend

- Runs Jest unit and integration tests
- Generates test coverage reports
- Uses MongoDB service container for isolated testing
- Uploads coverage reports and test results

### 3. Test Stage - Frontend

- Runs Cypress E2E tests
- Starts both frontend and backend servers
- Captures screenshots on test failures
- Records test videos
- Uploads test artifacts

### 4. Pipeline Status

- Aggregates results from all stages
- Reports overall pipeline success/failure
- Blocks deployment if any stage fails

## 🔧 Configuration

### Environment Variables

The workflow uses the following environment variables and secrets:

- `NODE_VERSION`: Node.js version (default: 18.x)
- `MONGO_VERSION`: MongoDB version (default: 6.0)
- `JWT_SECRET`: JWT secret key (stored in GitHub Secrets)
- `VITE_API_URL`: Frontend API URL (optional, defaults to localhost)

### GitHub Secrets Setup

To configure the pipeline, add the following secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `JWT_SECRET`: Your JWT secret key for authentication
   - `VITE_API_URL`: (Optional) Frontend API URL for production builds

### Workflow Triggers

The pipeline triggers on:

- **Push** to `main` or `develop` branches
- **Pull Request** to `main` branch
- **Release** creation
- **Manual dispatch** via GitHub Actions UI

## 📊 Artifacts

The pipeline generates and stores the following artifacts:

- **frontend-build**: Built React application (client/dist)
- **backend-artifacts**: Backend source code (excluding node_modules)
- **backend-coverage**: Jest coverage reports
- **backend-test-results**: Jest test result files
- **cypress-screenshots**: Screenshots from failed Cypress tests
- **cypress-videos**: Video recordings of Cypress test runs

Artifacts are retained for 7 days.

## 🐛 Troubleshooting

### Backend Tests Failing

- Check MongoDB service container is running
- Verify test environment variables are set correctly
- Check test database connection string

### Frontend Tests Failing

- Ensure both frontend and backend servers start successfully
- Check that servers are accessible on expected ports (5173, 5000)
- Review Cypress screenshots and videos for UI issues

### Build Failures

- Verify all dependencies are listed in package.json
- Check for Node.js version compatibility
- Review build logs for specific error messages

## 📝 Next Steps

After Phase 1 is complete, the following phases will be implemented:

- **Phase 2**: Enhanced test integration and reporting
- **Phase 3**: Staging deployment
- **Phase 4**: Production deployment with approval gates
- **Phase 5**: Monitoring and logging integration
- **Phase 6**: Pipeline optimization

## 🔗 Related Documentation

- [CI/CD Pipeline Plan](../docs/CI_CD_PIPELINE_PLAN.md)
- [Backend Test Design](../docs/BACKEND_TEST_DESIGN.md)
- [UI Test Design](../docs/UI_TEST_DESIGN.md)
