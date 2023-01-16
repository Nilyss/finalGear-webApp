export class Youtube {
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
    this.playlists = playlists
  }
}
