# Grounded Ask Mini Project

A grounded Q&A endpoint demonstrating evidence retrieval with PostgreSQL `pgvector`, bounded context assembly, evidence-only generation with strict abstention, and citation verification.

## 1. Test Output (`npm test`)

```text
✔ retrieval passes vector and model as SQL parameters (2.2153ms)
✔ context is bounded and preserves IDs (2.2354ms)
✔ generation sends evidence contract and labelled text (3.4195ms)
✔ citations are deduplicated, cited only, and constrained to context (0.7559ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 214.6013
```

## 2. Five Live Questions and Responses

### Question 1 [ANSWERABLE]
**Question:** `"How is cosine distance calculated for vector similarity in pgvector?"`  
**Endpoint Response:**
```json
{
  "answer": "Cosine distance in pgvector is calculated using the <=> operator, which computes 1 - cosine_similarity between the query vector and indexed embeddings [101].",
  "sources": [101]
}
```

### Question 2 [ANSWERABLE]
**Question:** `"Why should text embeddings be cached in Redis with a SHA-256 hash?"`  
**Endpoint Response:**
```json
{
  "answer": "Generating vector embeddings through the OpenAI API incurs network latency and financial cost; caching the resulting vector in Redis under a SHA-256 digest key ensures deterministic cache hits and avoids redundant API invocations [105].",
  "sources": [105]
}
```

### Question 3 [ANSWERABLE]
**Question:** `"What batch size is recommended when embedding posts for pgvector storage?"`  
**Endpoint Response:**
```json
{
  "answer": "Batching posts into groups of 50 provides an optimal trade-off between network throughput, memory usage, and provider rate limits [112].",
  "sources": [112]
}
```

### Question 4 [ANSWERABLE]
**Question:** `"How do you perform an idempotent upsert when saving post embeddings in PostgreSQL?"`  
**Endpoint Response:**
```json
{
  "answer": "An idempotent upsert is accomplished via INSERT INTO posts_embeddings (id, text, embedding, model_version) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET text = EXCLUDED.text, embedding = EXCLUDED.embedding, model_version = EXCLUDED.model_version, embedded_at = now() [120].",
  "sources": [120]
}
```

### Question 5 [UNANSWERABLE]
**Question:** `"What is the recipe for baking chocolate chip cookies in an air fryer?"`  
**Endpoint Response:**
```json
{
  "answer": "I cannot answer this from the supplied passages.",
  "sources": []
}
```

## 3. Interpretation

In our live evaluation, Question 1 regarding pgvector cosine distance was supported directly by the source sentence stating that *"pgvector provides the `<=>` operator to evaluate cosine distance between vectors"* found in passage [101]. When presented with the out-of-domain Question 5 about cookie recipes, the model faithfully produced the exact abstention string (`"I cannot answer this from the supplied passages."`) with an empty sources array, which is vastly superior to hallucinations or guessing that erode user trust in production systems. Note that our 6,000-character cap functions solely as a coarse text boundary rather than a true token budget, because token counts vary drastically depending on whitespace, syntax, character entropy, and tokenizer encoding schemes (where 1,200 characters may translate to anywhere between 200 and 400+ tokens). Furthermore, because individual passages are strictly truncated to 1,200 characters to bound latency and costs, a short excerpt may leave out an answer that exists later in the full post body. Finally, a valid citation ID simply confirms that the quoted passage identifier was present in the prompt context sent to the LLM, but does not prove the underlying empirical claim is accurate or that the model interpreted the source without subtle distortion.

## 4. Running the Project

```bash
# Install dependencies
npm install

# Run offline unit tests (no DB or API keys required)
npm test

# Run the live endpoint (requires PostgreSQL with pgvector, Redis, and OpenAI API key)
npm start

# Run the 5 sample questions against http://localhost:3000
npm run questions
```
