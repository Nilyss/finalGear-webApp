export class Youtube {
  license: string
  playlists: [
    {
      id: string
      name: string
      url: string
      episodes: [
        {
          name: string
          url: string
          duration: string
          thumbnail: string
        }
      ]
    }
  ]

  constructor(
    license: string,
    playlists: [
      {
        id: string
        name: string
        url: string
        episodes: [
          {
            name: string
            url: string
            duration: string
            thumbnail: string
          }
        ]
      }
    ]
  ) {
    this.license = license
    this.playlists = playlists
  }
}
