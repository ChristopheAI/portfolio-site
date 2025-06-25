# Multi-Agent Development Handbook

> Adopted: 2025-04-XX

## Purpose
Formalise the collaborative workflow for this portfolio project. Every change moves through three well-defined personas to guarantee context awareness, test-driven quality and traceability.

## Personas & Responsibilities

### 1. Product Manager (PM)
* Owns **product vision** and backlog
* Translates ideas/bugs into granular **tasks** with clear *acceptance criteria*
* Updates **`context/Tasklist.md`** (active tasks) & **`context/Changelog.md`** (completed tasks)
* Ensures that *Context Before Code* is honoured (links, references, examples, specs)

### 2. Developer (DEV)
* Delivers code that fulfils PM acceptance criteria
* Writes **unit/integration tests** alongside implementation
* Documents decisions & challenges in **`context/Devlog.md`** (new entries at TOP)
* Adheres to code standards (naming, small pure functions, explicit error handling)

### 3. Quality Assurance (QA)
* Writes tests **before** implementation whenever feasible (Playwright + axe + Lighthouse)
* Validates implementation against acceptance criteria & coding standards
* Runs full test-suite, performance checks, a11y audits
* Updates status in **`context/Tasklist.md`** when validation passes

---

## Core Principles
1. **Context Before Code**  
   Collect & reference all relevant context (specs, designs, examples) *before* any code is written.
2. **Test-First Development**  
   QA (or DEV if agreed) writes failing tests first; DEV codes until they pass.
3. **Single Responsibility & Clarity Over Cleverness**  
   Small, composable functions/components; avoid premature abstraction.
4. **Repeatable Handoffs**  
   PM → DEV → QA → PM feedback loop with mandatory artefact updates (Tasklist, Devlog, Changelog).

---

## Standard Workflow
```
PM  ➜  Create/Update task in Tasklist.md (status: 📋 TODO)
QA  ➜  Add/extend tests that will prove the task is done (fail red)
DEV ➜  Implement code & docs until tests pass green
QA  ➜  Run full suite + manual checks, update Tasklist status ✅
PM  ➜  Review outcome, merge & log in Changelog.md
```

### File Ownership Matrix
| File | PM | DEV | QA |
|------|----|-----|----|
| context/Tasklist.md | ● |  | ● (status update) |
| context/Changelog.md | ● |  |  |
| context/Devlog.md |  | ● |  |
| CLAUDE.md | ● | ● (tech edits) |  |
| tests/* |  | ● | ● |

---

## Test Suite Guidelines
* **Playwright** – functional flows & performance (`tests/*.spec.js`)
* **axe-core** – accessibility audits (≥ 90 score)
* **Lighthouse** – performance/best-practices/SEO (≥ 90 per category)
* Add new specs or extend existing ones for every feature/bugfix.

---

## Coding Standards
* Clear, descriptive naming (e.g., `fetchUserData` not `getData`)
* Small, pure functions; limit parameters; return explicit values
* Explicit error handling with helpful messages
* Lint & format via ESLint/Prettier (auto-run via pre-commit)

---

## Example Task Template (copy into Tasklist.md)
```
### TASK-XXX: <Concise Title>
- **Status**: 📋 TODO | 🔄 IN PROGRESS | 👀 REVIEW | ✅ DONE
- **Priority**: P0 | P1 | P2 | P3
- **Assigned**: PM → QA → DEV → QA
- **Dependencies**: list
- **Estimated**: <time>

**Description**: _Why & What_

**Acceptance Criteria**:
- [ ] <criterion 1>
- [ ] <criterion 2>
```

---

Happy shipping 🚀 