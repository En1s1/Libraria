export interface CommentType {
  _id?: string;
  user: string;        // ID i përdoruesit që la komentin
  book: string;        // ID i librit për të cilin është komenti
  content: string;     // Përmbajtja e komenti
  createdAt?: Date;
}
