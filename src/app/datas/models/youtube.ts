export class Youtube {
  license: [
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
    license: [
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
  }
}
