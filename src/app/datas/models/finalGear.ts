export class FinalGear {
  images: {
    avatarBackground: string
    avatarLight: string
    banner: string
    fullWidth: string
    iconLight: string
    iconFull: string
  }
  socialNetwork: {
    youtube: string
    twitch: string
    facebook: string
    twitter: string
    discord: string
  }
  constructor(
    images: {
      avatarBackground: string
      avatarLight: string
      banner: string
      fullWidth: string
      iconLight: string
      iconFull: string
    },
    socialNetwork: {
      youtube: string
      twitch: string
      facebook: string
      twitter: string
      discord: string
    }
  ) {
    this.images = images
    this.socialNetwork = socialNetwork
  }
}
