export type InscriptionStatut =
  | 'en_attente'
  | 'confirmee'
  | 'annulee';

// Inscription
export interface InscriptionParticipant {
  id?: number;
  name?: string;
  email?: string;
}

export interface InscriptionAtelier {
  id?: number;
  title?: string;
  lieu?: string;
  date_debut?: string;
  date_fin?: string;
}

export interface Inscription {
  id: number;
  statut: InscriptionStatut;
  date_inscription: string;
  participant: InscriptionParticipant;
  atelier: InscriptionAtelier;
  created_at?: string;
}
