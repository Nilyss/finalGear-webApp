export class FinalGear {
  images: {
    avatarBackground: string
    avatarLight: string
    banner: string
    bannerWithoutText: string
    fullWidth: string
    iconLight: string
    iconFull: string
  }
  socialNetwork: [
    {
      name: string
      url: string
    }
  ]
  constructor(
    images: {
      avatarBackground: string
      avatarLight: string
      banner: string
      bannerWithoutText: string
      fullWidth: string
      iconLight: string
      iconFull: string
    },
    socialNetwork: [
      {
        name: string
        url: string
      }
    ]
  ) {
    this.images = images
    this.socialNetwork = socialNetwork
  }
}
