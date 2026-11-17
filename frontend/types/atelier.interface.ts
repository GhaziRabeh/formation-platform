
export type AtelierStatut =
  | 'planifie'
  | 'en_cours'
  | 'termine'
  | 'annule';

export interface AtelierFormateur {
  id: number;
  name: string;
  email: string;
}

export interface Atelier {
  id: number;
  title: string;
  description?: string;
  lieu: string;
  date_debut: string;
  date_fin: string;
  capacite: number;
  statut: AtelierStatut;
  image?: string;
  formateur_id?: number;
  formateur?: AtelierFormateur;
  participants_count?: number;
  created_at?: string;
}

// Atelier participant
export interface AtelierParticipant {
  inscription_id: number;
  user_id: number;
  name: string;
  email: string;
  statut: 'en_attente' | 'confirmee';
  date_inscription: string;
}
