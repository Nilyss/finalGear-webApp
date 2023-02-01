export class Youtube {
  license: string
  _id: string
  playlists: [
    {
      _id: string
      name: string
      url: string
      episodes: {
        name: string
        url: string
        duration: string
        thumbnail: string
      }[]
    }
  ]

  constructor(
    license: string,
    _id: string,
    playlists: [
      {
        _id: string
        name: string
        url: string
        episodes: {
          name: string
          url: string
          duration: string
          thumbnail: string
        }[]
      }
    ]
  ) {
    this.license = license
    this._id = _id
    this.playlists = playlists
  }
}
