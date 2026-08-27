export interface SemanticSearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  chunkIndex: number;
  content: string;
  distance: number | null;
  similarity: number | null;
}