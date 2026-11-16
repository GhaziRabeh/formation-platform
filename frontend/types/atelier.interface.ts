import { User } from './user.interface';

export type AtelierStatut =
  | 'planifie'
  | 'en_cours'
  | 'termine'
  | 'annule';

export interface Atelier {
  id: number;
  title: string;
  description: string | null;
  lieu: string;
  image: string | null;
  image_url?: string | null;
  date_debut: string;
  date_fin: string;
  capacite: number;
  statut: AtelierStatut;
  formateur_id: number;
  formateur?: User;
  created_at?: string;
}