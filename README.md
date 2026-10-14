# Grounded Ask Mini Project

A grounded Q&A endpoint demonstrating evidence retrieval with PostgreSQL pgvector, bounded context assembly, evidence-only generation, and citation verification.

## Setup & Running

```bash
npm install
npm test        # offline unit tests (no services needed)
npm start       # runs the server on port 3000
npm run questions # in another terminal: queries the 5 evaluation questions
```

## Task Checklist
- [ ] Implement `retrieve` in `src/rag.js`
- [ ] Implement `buildContext` in `src/rag.js`
- [ ] Implement `generate` in `src/rag.js`
- [ ] Implement `validateCitations` in `src/rag.js`
- [ ] Add test output, live responses, and interpretation to README.md
