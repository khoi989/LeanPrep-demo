# LeanPrep Unified Suite

A unified multi-platform application for nutrition management, featuring:
- **Mobile Consumer App**: Personalized meal tracking and ordering.
- **Desktop Web Hub**: Comprehensive nutrition data and full checkout flow.
- **Seller Dashboard**: High-fidelity kitchen management system with live order tracking and automated procurement.

## Deployment Instructions

This project is configured for automated deployment via **GitHub Pages**.

1. **Create a new GitHub Repository**.
2. **Initialize and Push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of LeanPrep Unified Suite"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. **Enable Pages**:
   - Go to your repo **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

The app will build and deploy automatically every time you push to the `main` branch.
