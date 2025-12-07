# CI/CD Pipeline Setup Guide

This guide will help you set up and configure the CI/CD pipeline for the Task Manager application.

## 🚀 Quick Start

### Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **GitHub Actions Enabled**: GitHub Actions should be enabled for your repository (enabled by default)
3. **Node.js**: Ensure your project uses Node.js 18.x or compatible version

### Step 1: Verify Workflow File

The main workflow file is located at:
```
.github/workflows/ci-cd.yml
```

This file contains the complete pipeline configuration.

### Step 2: Configure GitHub Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

#### Required Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT token generation | `your-super-secret-jwt-key-here` |

#### Optional Secrets

| Secret Name | Description | Default |
|------------|-------------|---------|
| `VITE_API_URL` | Frontend API URL for production builds | `http://localhost:5000/api` |

### Step 3: Verify Package.json Scripts

Ensure your `package.json` files have the required scripts:

#### Frontend (`client/package.json`)
```json
{
  "scripts": {
    "build": "vite build",
    "dev": "vite",
    "cypress:run": "cypress run"
  }
}
```

#### Backend (`server/package.json`)
```json
{
  "scripts": {
    "test": "jest --detectOpenHandles --forceExit",
    "test:coverage": "jest --coverage --detectOpenHandles --forceExit",
    "dev": "nodemon server.js"
  }
}
```

### Step 4: Test the Pipeline

1. **Push to Repository**: Make a commit and push to `main` or `develop` branch
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

2. **Check Workflow Status**:
   - Go to your GitHub repository
   - Click on the **Actions** tab
   - You should see the workflow running
   - Click on the workflow run to see detailed logs

3. **Verify All Stages Pass**:
   - ✅ Build stage should complete successfully
   - ✅ Backend tests should pass
   - ✅ Frontend tests should pass
   - ✅ Pipeline status should show success

## 📋 Pipeline Workflow

### Trigger Events

The pipeline automatically runs on:
- **Push** to `main` or `develop` branches
- **Pull Request** to `main` branch
- **Release** creation
- **Manual trigger** via GitHub Actions UI

### Workflow Stages

1. **Build Stage**
   - Installs dependencies
   - Builds frontend application
   - Verifies backend setup
   - Creates build artifacts

2. **Backend Tests**
   - Sets up MongoDB service container
   - Runs Jest tests
   - Generates coverage reports
   - Uploads test results

3. **Frontend Tests**
   - Starts backend server
   - Starts frontend dev server
   - Runs Cypress E2E tests
   - Captures screenshots/videos on failure

4. **Pipeline Status**
   - Aggregates all stage results
   - Reports overall success/failure

## 🔍 Troubleshooting

### Common Issues

#### Issue: "Workflow not triggering"
**Solution**: 
- Check that the workflow file is in `.github/workflows/` directory
- Verify the branch name matches the trigger configuration
- Ensure GitHub Actions is enabled in repository settings

#### Issue: "Backend tests failing"
**Solution**:
- Check MongoDB service container is running
- Verify `MONGO_URI` environment variable
- Check test database connection in logs

#### Issue: "Frontend tests timing out"
**Solution**:
- Verify servers start successfully
- Check ports 5173 (frontend) and 5000 (backend) are available
- Review server startup logs
- Increase timeout values if needed

#### Issue: "Build failing"
**Solution**:
- Check Node.js version compatibility
- Verify all dependencies are in `package-lock.json`
- Review build logs for specific errors
- Ensure `npm ci` can install all dependencies

#### Issue: "Cypress tests failing"
**Solution**:
- Check that both servers are running
- Verify API endpoints are accessible
- Review Cypress screenshots and videos
- Check authentication flow in tests

### Viewing Logs

1. Go to **Actions** tab in GitHub
2. Click on the workflow run
3. Click on the failed job
4. Expand the failed step to see detailed logs
5. Download artifacts (screenshots, videos, reports) if available

### Downloading Artifacts

1. Go to the workflow run page
2. Scroll to the **Artifacts** section
3. Download the artifacts you need:
   - `frontend-build`: Built React app
   - `backend-coverage`: Test coverage reports
   - `cypress-screenshots`: Failed test screenshots
   - `cypress-videos`: Test execution videos

## 🔧 Customization

### Changing Node.js Version

Edit `.github/workflows/ci-cd.yml`:
```yaml
env:
  NODE_VERSION: '20.x'  # Change to your preferred version
```

### Changing MongoDB Version

Edit `.github/workflows/ci-cd.yml`:
```yaml
env:
  MONGO_VERSION: '7.0'  # Change to your preferred version
```

### Adding Environment Variables

Add to the workflow file in the appropriate job:
```yaml
env:
  YOUR_VARIABLE: ${{ secrets.YOUR_SECRET }}
```

### Modifying Test Commands

Update the test steps in the workflow:
```yaml
- name: Run Backend Tests
  working-directory: ./server
  run: npm run test:custom
```

## 📊 Monitoring Pipeline Health

### Success Metrics

- **Build Time**: Should complete in < 5 minutes
- **Test Execution**: Should complete in < 10 minutes
- **Total Pipeline**: Should complete in < 15 minutes

### Key Indicators

- ✅ All jobs show green checkmarks
- ✅ No failed tests
- ✅ Artifacts are generated
- ✅ Pipeline completes without errors

## 🔐 Security Best Practices

1. **Never commit secrets**: Always use GitHub Secrets
2. **Review workflow files**: Ensure no hardcoded credentials
3. **Limit access**: Only authorized users should modify workflows
4. **Regular updates**: Keep actions and dependencies updated
5. **Audit logs**: Review workflow execution logs regularly

## 📚 Next Steps

After Phase 1 is working:

1. **Phase 2**: Enhanced test reporting and integration
2. **Phase 3**: Staging environment deployment
3. **Phase 4**: Production deployment with approval gates
4. **Phase 5**: Monitoring and logging integration
5. **Phase 6**: Pipeline optimization

## 🆘 Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review workflow logs in GitHub Actions
3. Verify all prerequisites are met
4. Check that package.json scripts are correct
5. Ensure GitHub Secrets are configured

## 📝 Related Documentation

- [CI/CD Pipeline Plan](./CI_CD_PIPELINE_PLAN.md)
- [GitHub Actions Documentation](.github/README.md)
- [Backend Test Design](./BACKEND_TEST_DESIGN.md)
- [UI Test Design](./UI_TEST_DESIGN.md)

---

**Last Updated**: 2024  
**Pipeline Version**: 1.0

