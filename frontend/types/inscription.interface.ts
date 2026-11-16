import { User } from './user.interface';
import { Atelier } from './atelier.interface';

export type InscriptionStatut =
  | 'en_attente'
  | 'confirmee'
  | 'annulee';

export interface Inscription {
  id: number;
  user_id: number;
  atelier_id: number;
  statut: InscriptionStatut;
  date_inscription: string;
  user?: User;
  atelier?: Atelier;
}