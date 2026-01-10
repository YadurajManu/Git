# Development Plan: CI/CD Pipeline Visualizer

This document serves as the single source of truth for the development lifecycle of the CI/CD Pipeline Visualizer.

## Phase 0 — Planning & Architecture

**Status:** ✅ Completed  
**Estimated Time:** ~4 hours

### Objectives

- Define system architecture, technology stack, and database schema.
- Establish core design principles for UI/UX.
- Create initial project tracking artifacts.

### Tasks

- [x] Create DEVELOPMENT_PLAN.md
- [ ] Define Technology Stack (Frontend: React/Vite/Tailwind, Backend: Node/Express/TS, DB: PostgreSQL)
- [ ] Design Database Schema (Workflows, Runs, Jobs, Steps, Logs)
- [ ] Define API Contract (Internal & External)
- [ ] Select Visualization Library (e.g., React Flow, Dagre)
- [ ] Draft UI Mockups / Wireframes

### Testing

- [ ] Review Architecture with Tech Lead (User)
- [ ] Validate DB Schema against requirements

### Commit Template

`feat(phase-0): <description>`

---

## Phase 1 — CI/CD & Dev Environment Setup

**Status:** ⏳ In Progress  
**Estimated Time:** ~3 hours

### Objectives

- Initialize repository with robust tooling.
- Set up linting, formatting, and pre-commit hooks.
- Configure CI for the project itself to ensure code quality.

### Tasks

- [ ] Initialize Git repository
- [ ] Setup Monorepo structure (if applicable) or standard directory layout
- [ ] Configure ESLint, Prettier, and TypeScript
- [ ] Setup Husky and lint-staged
- [ ] Create GitHub Actions workflow for CI (Lint/Test on PR)

### Testing

- [ ] Verify pre-commit hook blocks bad code
- [ ] Verify CI pipeline fails on lint errors
- [ ] Verify CI pipeline passes on clean code

### Commit Template

`chore(phase-1): <description>`

---

## Phase 2 — Backend Core & Database Setup

**Status:** 🛑 Not Started  
**Estimated Time:** ~6 hours

### Objectives

- Scaffold backend server.
- specific database connection and migration system.
- Implement basic health checks.

### Tasks

- [ ] Initialize Node.js/Express (TypeScript) project
- [ ] Setup PostgreSQL database (local/docker)
- [ ] Configure ORM (Prisma/TypeORM/Drizzle)
- [ ] Create initial migrations from Schema (Phase 0)
- [ ] Implement /health endpoint
- [ ] Setup Logger (Winston/Pino)

### Testing

- [ ] Unit test: Health endpoint returns 200 OK
- [ ] Integration test: Can connect to DB and run migrations
- [ ] Manual: Check logs output format

### Commit Template

`feat(phase-2): <description>`

---

## Phase 3 — GitHub Interaction Service

**Status:** 🛑 Not Started  
**Estimated Time:** ~5 hours

### Objectives

- Enable communication with GitHub.
- Setup GitHub App or OAuth for API access.
- Handle Webhook signature verification.

### Tasks

- [ ] Register GitHub App (or Personal Access Token configuration)
- [ ] Implement GitHub API Client wrapper (Octokit)
- [ ] Create Webhook endpoint receiver
- [ ] Implement Webhook signature verification middleware
- [ ] Handle 'ping' event from GitHub

### Testing

- [ ] Unit test: Signature verification logic
- [ ] Integration test: Mock GitHub webhook calls to endpoint
- [ ] Manual: Use smee.io or ngrok to receive real webhook

### Commit Template

`feat(phase-3): <description>`

---

## Phase 4 — Workflow Ingestion Engine

**Status:** 🛑 Not Started  
**Estimated Time:** ~8 hours

### Objectives

- Parse complex GitHub Webhook payloads.
- Store workflow runs, jobs, and steps in the database.
- Handle synchronization of state.

### Tasks

- [ ] Implement `workflow_run` event handler
- [ ] Implement `workflow_job` event handler
- [ ] Implement data mapping (Payload -> DB Models)
- [ ] Handle upsert logic (create if new, update if exists)
- [ ] Implement robust error handling for malformed payloads

### Testing

- [ ] Unit tests: Parser functions for different event types
- [ ] Integration tests: DB state reflects webhook payload data
- [ ] Manual: Trigger real action and verify DB entries

### Commit Template

`feat(phase-4): <description>`

---

## Phase 5 — Real-time Event System

**Status:** 🛑 Not Started  
**Estimated Time:** ~6 hours

### Objectives

- Enable real-time updates to the frontend.
- Implement WebSocket server.

### Tasks

- [ ] Setup Socket.io (or WS) server
- [ ] Create internal event bus (EventEmitter/Redis)
- [ ] specific event broadcasting from Ingestion Engine
- [ ] Define WebSocket event types (WORKFLOW_UPDATE, JOB_UPDATE)
- [ ] Implement client connection handling and room logic (optional)

### Testing

- [ ] Unit test: Event emission logic
- [ ] Integration test: WS client receives message when Ingestion Engine saves data
- [ ] Manual: Connect WS tool (Postman/wscat) and see events flowing

### Commit Template

`feat(phase-5): <description>`

---

## Phase 6 — API Layer Implementation

**Status:** 🛑 Not Started  
**Estimated Time:** ~5 hours

### Objectives

- Provide REST/GraphQL endpoints for the frontend.
- Allow fetching historical data and details.

### Tasks

- [ ] Create GET /workflows endpoint (List)
- [ ] Create GET /workflows/:id endpoint (Detail)
- [ ] Create GET /workflows/:id/jobs endpoint
- [ ] Implement pagination and filtering
- [ ] Add DTO validation (Zod/Joi)

### Testing

- [ ] Unit tests: Controller logic
- [ ] Integration tests: HTTP requests return correct DB data
- [ ] Manual: Verify JSON response structure

### Commit Template

`feat(phase-6): <description>`

---

## Phase 7 — Frontend Core & Design System

**Status:** 🛑 Not Started  
**Estimated Time:** ~6 hours

### Objectives

- Initialize frontend application.
- Establish styling foundation.

### Tasks

- [ ] Initialize Vite + React + TypeScript project
- [ ] Setup Tailwind CSS
- [ ] Configure Routing (React Router)
- [ ] Create basic Layout (Sidebar, Header, Main)
- [ ] Build core UI components (Button, Card, Badge, Spinner)
- [ ] Setup API Client (Axios/TanStack Query)

### Testing

- [ ] Unit tests: Basic component rendering
- [ ] Manual: Check responsive layout and theme application
- [ ] Verify build passes

### Commit Template

`feat(phase-7): <description>`

---

## Phase 8 — Visualization UI Implementation

**Status:** 🛑 Not Started  
**Estimated Time:** ~10 hours

### Objectives

- Render the pipeline graph.
- Visual representation of dependencies and status.

### Tasks

- [ ] Install Visualization Library (React Flow / Dagre)
- [ ] Create `PipelineGraph` component
- [ ] Transform API/WS data into Graph Nodes/Edges
- [ ] Implement Node styling based on status (Success, Failure, Running)
- [ ] Add animations for 'Running' state

### Testing

- [ ] Unit tests: Data transformation logic
- [ ] Manual: Verify graph topology against complex workflow YAML
- [ ] Manual: Performance check with large graphs

### Commit Template

`feat(phase-8): <description>`

---

## Phase 9 — Dashboard & Activity View

**Status:** 🛑 Not Started  
**Estimated Time:** ~6 hours

### Objectives

- Create the main landing view and list views.
- Integrate real-time updates into the list.

### Tasks

- [ ] Implement Dashboard Page (Recent Runs)
- [ ] Implement Run Detail Page (Container for Graph)
- [ ] Integrate WebSocket client in frontend
- [ ] Live update status icons/bars without refresh
- [ ] Add Search and Filter capabilities

### Testing

- [ ] Integration: List updates automatically when backend emits event
- [ ] Manual: Navigation flow check

### Commit Template

`feat(phase-9): <description>`

---

## Phase 10 — Authentication & Security

**Status:** 🛑 Not Started  
**Estimated Time:** ~5 hours

### Objectives

- Secure the application.
- Limit access to authorized users.

### Tasks

- [ ] Implement basic Auth (Login/Logout) or API Key auth
- [ ] Secure Backend Routes (Middleware)
- [ ] Secure Frontend Routes (Protected Route wrapper)
- [ ] Implement Rate Limiting on API
- [ ] Audit dependencies for vulnerabilities

### Testing

- [ ] Unit test: Auth middleware
- [ ] Integration: Unauth request returns 401/403
- [ ] Manual: Try to bypass login

### Commit Template

`feat(phase-10): <description>`

---

## Phase 11 — Production Readiness & Deployment

**Status:** 🛑 Not Started  
**Estimated Time:** ~4 hours

### Objectives

- Prepare for release.
- Containerize and deploy.

### Tasks

- [ ] Create Dockerfile (Multi-stage build)
- [ ] Create docker-compose.yml for full stack (App + DB)
- [ ] Configure environment variables for production
- [ ] Create generic deployment script/instructions
- [ ] Final end-to-end verification

### Testing

- [ ] Manual: `docker-compose up` brings up working environment
- [ ] Manual: Full user flow smoke test in containerized env

### Commit Template

`chore(phase-11): <description>`
