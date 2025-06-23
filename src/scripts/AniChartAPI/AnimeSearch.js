import { gql } from '@apollo/client';


export const ANIME_QUERY = gql`
  query ($search: String) {
    Media(search: $search, type: ANIME) {
    id  
    title {
        english
        native
      }
      episodes
      duration
      startDate {
        year
        month
      }
      endDate {
        year
        month
      }
      genres
      averageScore
      description(asHtml: false)
      coverImage {
        large
        medium
      }
      externalLinks {
        site
        url
      }
    }
  }
`;