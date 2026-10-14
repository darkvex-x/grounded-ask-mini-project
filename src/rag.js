export const ABSTAIN = 'I cannot answer this from the supplied passages.';

export async function retrieve(q, { embed, db, model }) {
  // TODO 1: retrieve top five matching posts using cosine distance
  throw new Error('TODO: implement retrieve');
}

export function buildContext(rows) {
  // TODO 2: build bounded context preserving post_id and text
  throw new Error('TODO: implement buildContext');
}

export async function generate(q, context, { llm, model }) {
  // TODO 3: generate evidence-only answer or exact abstention
  throw new Error('TODO: implement generate');
}

export function validateCitations(answer, context) {
  // TODO 4: validate and return cited post IDs
  throw new Error('TODO: implement validateCitations');
}
