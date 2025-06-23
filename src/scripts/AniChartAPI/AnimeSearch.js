import { gql } from '@apollo/client';


export const ANIME_QUERY = gql`
  query ($search: String) {
    Media(search: $search, type: ANIME) {
      title {
        romaji
        english
        native
      }
      format
      status
      episodes
      duration
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      genres
      averageScore
      description(asHtml: false)
      coverImage {
        large
        medium
      }
    }
  }
`;