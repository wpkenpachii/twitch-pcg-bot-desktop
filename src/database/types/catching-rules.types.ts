type CommonRulesProperties = {
    type: string;
    description?: string;
  }
  export enum ETiers {
    STARTER = "Startert",
    S       = "S",
    A       = "A",
    B       = "B",
    C       = "C"
  }
  export type BaseStatsRule = {
    "$eql": number;
    "$gt": number;
    "$lt": number;
  }
  
  /* BY_POKEMON_NAME_RULE */ 
  export type BY_POKEMON_NAME = {
    type: "BY_POKEMON_NAME",
    pokemons: string[]
  }
  
  /* BY_POKEMON_TYPE */
  export type BY_POKEMON_TYPE = {
    type: "BY_POKEMON_TYPE",
    pokemon_types: string[]
  }
  
  /* BY_POKEMON_BASE_STATS */
  export type BY_POKEMON_BASE_STATS = {
    type: "BY_POKEMON_BASE_STATS",
    base_stats: BaseStatsRule
  }
  
  /* BY_POKEMON_TIER */
  export type BY_POKEMON_TIER = {
    type: "BY_POKEMON_TIERS",
    tiers: ETiers[]
  }
  
  export enum Pokeballs {
    POKE_BALL = "pokeball",
    GREAT_BALL = "greatball",
    ULTRA_BALL = "ultraball",
    MASTER_BALL = "masterball",
    PREMIER_BALL = "premierball",
    CHERISH_BALL = "cherishball",
    GREAT_CHERISH_BALL = "greatcherishball",
    ULTRA_CHERISH_BALL = "ultracherishball",
    HEAVY_BALL = "heavyball",
    FEATHER_BALL = "featherball",
    TIMER_BALL = "timerball",
    QUICK_BALL = "quickball",
    REPEAT_BALL = "repeatball",
    NET_BALL = "netball",
    CLONE_BALL = "cloneball",
    PHANTOM_BALL = "phantomball",
    NIGHT_BALL = "nightball",
    FROZEN_BALL = "frozenball",
    CIPHER_BALL = "cipherball",
    BUDDY_BALL = "buddyball"
  }
  
  export type CatchingRules = {
    rule_name: string,
    rules: BY_POKEMON_NAME | BY_POKEMON_TYPE | BY_POKEMON_BASE_STATS | BY_POKEMON_TIER,
    pokebola: Pokeballs
  }