export interface Movie {
  readonly id: number
  readonly poster_path: string | null
  readonly overview: string
  readonly release_date: string
  readonly title: string
  readonly vote_average: number
  readonly genre_ids: number[]
}

interface Country {
  readonly iso_3166_1: string
  readonly name: string
}

interface Company {
  readonly id: number
  readonly name: string
  readonly logo_path: string | null
  readonly origin_country: string 
}

interface Language {
  readonly iso_639_1: string
  readonly name: string
}


export interface Genre {
  readonly id: number,
  readonly name: string
}

type MovieStatus =  "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled"

export interface MovieDetail extends Movie {
  readonly belongs_to_collection: object | null
  readonly budget: number
  readonly homepage: string | null
  readonly imdb_id: string | null
  readonly production_companies: Company[]
  readonly production_countries: Country[]
  readonly revenue: number
  readonly runtime: number | null
  readonly spoken_languages: Language[]
  readonly status: MovieStatus
  readonly tagline: string | null
  readonly genres: Genre[]
}

