
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
  created_at?: string;
}
