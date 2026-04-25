# Contributing to CodeFolio 🚀

Thank you for your interest in contributing to **CodeFolio**! We appreciate your time and effort in making this developer platform even better.

Please take a moment to review these guidelines before you start contributing.

---

## 📌 Ways to Contribute

You can help us in several ways:
- **Reporting Bugs:** Find a bug? Report it with clear steps to reproduce.
- **Feature Requests:** Have an idea for a new feature? Share it with us!
- **Code Contributions:** Fix bugs, refactor code, or implement new features.
- **Documentation:** Improve README, contributing guides, or API documentation.
- **UI/UX Improvements:** Enhance the design and user experience.

---

## 🛠 Project Setup

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js:** v20.0.0 or later (Recommended)
- **npm:** v10.0.0 or later
- **MongoDB:** A local instance or a cloud cluster (Atlas)
- **Redis:** [Upstash Redis](https://upstash.com/) for caching
- **API Keys:** You will need keys for Gemini, SendGrid, Cloudinary, and GitHub (refer to [README.md](README.md#2-backend-environment-backendenv) for the full list).

### Installation Steps

1. **Fork & Clone:**
   ```bash
   git clone https://github.com/your-username/CodeFolio-Insights.git
   cd CodeFolio-Insights
   ```

2. **Install Root Dependencies:**
   ```bash
   npm install
   ```

3. **Install Sub-project Dependencies:**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

4. **Environment Configuration:**
   - Create a `.env` file in the `backend/` directory based on the `README.md` specifications.
   - Create a `.env` file in the `frontend/` directory.

5. **Start Development Servers:**
   Open two terminals:
   
   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```

---

## 🌿 Branching Strategy

We follow a simple branching model:

- `main`: Stable, production-ready code.
- `develop`: The integration branch for new features and fixes.

**Guidelines:**
- Always create a new branch from `develop`.
- Use descriptive branch names:
  - `feature/your-feature-name`
  - `fix/bug-description`
  - `docs/what-changed`
  - `refactor/improvement-name`

---

## 🧾 Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured history.

**Format:** `<type>: <description>`

**Examples:**
- `feat: add Google Gemini analysis for LeetCode`
- `fix: resolve responsive issues on dashboard`
- `docs: update installation steps in CONTRIBUTING.md`
- `refactor: optimize redis caching logic`
- `style: update landing page colors to match theme`

---

## 🎨 Development Standards

### Tech Stack Constraints
- **Frontend:** React 19, Tailwind CSS v4 (utilize `@theme` blocks, not v3 legacy config), Framer Motion for animations.
- **Backend:** Node.js, Express, Mongoose, Zod for validation.
- **AI:** Google Gemini (`@google/genai`).

### Code Style
- **Linting:** We use ESLint. Run `npm run lint` from the root before committing.
- **Formatting:** We use Prettier. Run `npm run format` from the root to fix formatting.
- **Components:** Keep React components modular and functional. Use hooks for state and side effects.
- **Variables:** Use camelCase for variables/functions and PascalCase for components.

---

## 🔀 Pull Request Process

1. **Sync your fork:** Ensure your `develop` branch is up to date with the upstream repository.
2. **Quality Check:** Run `npm run lint` and `npm run format`.
3. **Test:** Ensure your changes don't break existing functionality.
4. **Submit PR:** Open a PR against the `develop` branch.
5. **Describe:** Provide a detailed description of:
   - What changed?
   - Why was this change made?
   - How can it be tested?
   - Screenshots (for UI changes).

---

## 🤝 Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful, inclusive, and constructive.

---

## ❤️ Recognition

Thank you for contributing to CodeFolio! Every PR, issue, and suggestion helps us build a better tool for the developer community. 🎉