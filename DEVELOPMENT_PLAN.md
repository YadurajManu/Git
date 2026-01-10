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

## Phase 2 — Backend Core & Firebase Setup

**Status:** ✅ Completed
**Estimated Time:** ~6 hours

### Objectives

- Scaffold backend server (Express).
- Configure Firebase Admin SDK for server-side access.
- Configure Firebase JS SDK for client-side access.
- Implement basic structure for Controllers/Services.

### Tasks

- [x] Initialize Node.js/Express (TypeScript) project
- [x] Install `firebase-admin` and `firebase`
- [x] Create `src/config/firebase.ts` (Admin SDK setup)
- [x] Create `src/config/firebase-client.ts` (Client SDK setup)
- [x] Implement /health endpoint
- [x] Setup Logger (Winston/Pino)

### Testing

- [x] Unit test: Health endpoint returns 200 OK
- [x] Manual: Check logs output format

### Commit Template

`feat(phase-2): <description>`

---

## Phase 3 — GitHub Interaction Service

**Status:** ✅ Completed
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

**Status:** ✅ Completed
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

**Status:** ✅ Completed
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

**Status:** ✅ Completed
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

**Status:** ✅ Completed
**Estimated Time:** ~6 hours

### Objectives

- Initialize frontend application.
- Establish styling foundation.

### Tasks

- [x] Initialize Vite + React + TypeScript project
- [x] Setup Tailwind CSS
- [x] Configure Routing (React Router)
- [x] Create basic Layout (Sidebar, Header, Main)
- [x] Build core UI components (Button, Card, Badge, Spinner)
- [x] Setup API Client (Axios/TanStack Query)

### Testing

- [x] Unit tests: Basic component rendering
- [x] Manual: Check responsive layout and theme application
- [x] Verify build passes

### Commit Template

`feat(phase-7): <description>`

---

## Phase 8 — Visualization UI Implementation

**Status:** ✅ Completed
**Estimated Time:** ~10 hours

### Objectives

- Render the pipeline graph.
- Visual representation of dependencies and status.

### Tasks

- [x] Install Visualization Library (React Flow / Dagre)
- [x] Create `PipelineGraph` component
- [x] Transform API/WS data into Graph Nodes/Edges
- [x] Implement Node styling based on status (Success, Failure, Running)
- [x] Add animations for 'Running' state

### Testing

- [ ] Unit tests: Data transformation logic
- [ ] Manual: Verify graph topology against complex workflow YAML
- [ ] Manual: Performance check with large graphs

### Commit Template

`feat(phase-8): <description>`

---

## Phase 9 — Dashboard & Activity View

**Status:** ✅ Completed
**Estimated Time:** ~6 hours

### Objectives

- Create the main landing view and list views.
- Integrate real-time updates into the list.

### Tasks

- [x] Implement Dashboard Page (Recent Runs)
- [x] Implement Run Detail Page (Container for Graph)
- [x] Integrate WebSocket client in frontend
- [x] Live update status icons/bars without refresh
- [x] Add Search and Filter capabilities

### Testing

- [ ] Integration: List updates automatically when backend emits event
- [ ] Manual: Navigation flow check

### Commit Template

`feat(phase-9): <description>`

---

## Phase 10 — Authentication & Security

**Status:** ✅ Completed
**Estimated Time:** ~5 hours

### Objectives

- Secure the application.
- Limit access to authorized users.

### Tasks

- [x] Implement basic Auth (Login/Logout) or API Key auth
- [x] Secure Backend Routes (Middleware)
- [x] Secure Frontend Routes (Protected Route wrapper)
- [x] Implement Rate Limiting on API (Basic)
- [x] Audit dependencies for vulnerabilities

### Testing

- [x] Unit test: Auth middleware
- [x] Integration: Unauth request returns 401/403
- [x] Manual: Try to bypass login

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
