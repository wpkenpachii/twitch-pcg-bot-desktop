type DefaultSettings = {
    TWITCH_OAUTH_TOKEN: string,
    CHANNEL_TO_LISTEN: string,
    PCG_USER: string,
    CHANNEL_LANG: string;
    SPAWN_MESSAGES: any[]
  }
  type AditionalSettings = {
    [key: string]: any
  }
  export type Settings = DefaultSettings & AditionalSettings;
