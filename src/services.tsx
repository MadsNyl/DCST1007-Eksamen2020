import { pool } from './mysql-pool';
import type { RowDataPacket } from 'mysql2';

// her er typen igjen, vanligvis putter man den i en fil som 
// man importerer fra istedenfor å skrive den flere steder.
type Show = {
  id: number,
  title: string,
  description: string,
  ratings?: number[]
}

class ShowService {

  getShows(): Promise<Show[]> { // Promise<Show[]> sier at fuksjonen vil returnere et Promise med resultat av typen Show[]
    return new Promise<Show[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM Shows", 
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results as Show[]); // dette heter å caste fra en type (her RowDataPacket[]) til en annen (her Show[]) 
        });
    });
  }

  getShowByTitle(title: string): Promise<Show[]> {
    return new Promise<Show[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM Shows WHERE title LIKE ?", [`%${title}%`], // bruk %% rundt det man søker etter for å finne lignende rader i DB
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results as Show[]);
        });
    });
  }

  getShowRatings(id: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      pool.query(
        "SELECT rating FROM ShowRatings WHERE showId = ?",
        [id],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          const ratings = results?.map(rating => { return rating.rating });
          resolve(ratings as number[]);
        }
      )
    });
  }

  addNewShow(show: Show): Promise<RowDataPacket> {
    return new Promise<RowDataPacket>((resolve, reject) => {
      pool.query(
        "INSERT INTO Shows (title, description) VALUES (?, ?)",
        [show.title, show.description],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results[0]);
        });
    });
  }

  addNewShowRating(rating: number, id: number): Promise<RowDataPacket> {
    return new Promise<RowDataPacket>((resolve, reject) => {
      pool.query(
        "INSERT INTO ShowRatings (rating, showId) VALUES (?, ?)",
        [rating, id],
        (error, results: RowDataPacket[]) => {
          if (error) reject(error);
          resolve(results[0]);
        });
    });
  }
}

export const showService = new ShowService();
