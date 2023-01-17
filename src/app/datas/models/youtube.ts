export class Youtube {
  playlist: [
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
    playlist: [
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
    this.playlist = playlist
  }
}
