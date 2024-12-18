// src/types/vocabulary.ts
export interface Vocabulary {
  id?: string
  englishWord: string
  vietnameseDefinition: string
  category?: "tech" | "general"
  userId: string
  createdAt: Date
  difficulty?: "easy" | "medium" | "hard"
}

export interface VocabularyListProps {
  vocabularies: Vocabulary[]
  onEdit?: (vocab: Vocabulary) => void
  onDelete?: (id: string) => void
}

export interface ListColorType {
  id: number
  name: string
}

export interface BoardType {
  id: string
  color: string
  createdAt: string
  name: string
  order?: number
  userId: string
}
