import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { NpcFlavor, NpcStats } from "./npc";

@ObjectType()
export class CharacterError {
  @Field()
  field: string;
  @Field()
  error: string;
}

@ObjectType()
class Traits {
  @Field()
  gender: String;

  @Field()
  pronoun: String;

  @Field()
  age: String;

  @Field()
  eyes: String;

  @Field()
  weight: String;

  @Field()
  hair: String;

  @Field()
  skin: String;

  @Field()
  height: String;
}

@ObjectType()
class CharacterPersonality {
  @Field()
  personalityTraits: String;

  @Field()
  ideals: String;

  @Field()
  bonds: String;

  @Field()
  flaws: String;
}

@ObjectType()
class CharacterBackground {
  @Field(() => String, { nullable: true })
  name: String;

  @Field(() => String, { nullable: true })
  description: String;

  @Field(() => String, { nullable: true })
  trait: String;
}

@ObjectType()
class CharacterRace {
  @Field(() => String, { nullable: true })
  name: String;

  @Field(() => String, { nullable: true })
  description: String;

  @Field(() => [Subrace])
  subrace: [Subrace];
}

@ObjectType()
class Subrace {
  @Field(() => String, { nullable: true })
  name: String;

  @Field(() => String, { nullable: true })
  description: String;
}

@ObjectType()
class CharacterAbilityScores {
  @Field()
  strength: Number;

  @Field()
  dexterity: Number;

  @Field()
  constitution: Number;

  @Field()
  intelligence: Number;

  @Field()
  wisdom: Number;

  @Field()
  charisma: Number;
}

@ObjectType()
class CharacterSkills {
  @Field(() => [CharacterSkill])
  acrobatics: [CharacterSkill];

  @Field(() => [CharacterSkill])
  animal_handling: [CharacterSkill];

  @Field(() => [CharacterSkill])
  arcana: [CharacterSkill];

  @Field(() => [CharacterSkill])
  athletics: [CharacterSkill];

  @Field(() => [CharacterSkill])
  deception: [CharacterSkill];

  @Field(() => [CharacterSkill])
  history: [CharacterSkill];

  @Field(() => [CharacterSkill])
  insight: [CharacterSkill];

  @Field(() => [CharacterSkill])
  intimidation: [CharacterSkill];

  @Field(() => [CharacterSkill])
  investigation: [CharacterSkill];

  @Field(() => [CharacterSkill])
  medicine: [CharacterSkill];

  @Field(() => [CharacterSkill])
  nature: [CharacterSkill];

  @Field(() => [CharacterSkill])
  perception: [CharacterSkill];

  @Field(() => [CharacterSkill])
  performance: [CharacterSkill];

  @Field(() => [CharacterSkill])
  persuasion: [CharacterSkill];

  @Field(() => [CharacterSkill])
  religion: [CharacterSkill];

  @Field(() => [CharacterSkill])
  sleight_of_hand: [CharacterSkill];

  @Field(() => [CharacterSkill])
  stealth: [CharacterSkill];

  @Field(() => [CharacterSkill])
  survival: [CharacterSkill];
}

@ObjectType()
class CharacterSkill {
  @Field()
  name: String;

  @Field()
  modifier: String;

  @Field()
  proficient: Boolean;

  @Field()
  expertise: Boolean;

  @Field()
  description: String;
}

@ObjectType()
class CharacterHitpoints {
  @Field()
  hp_current: Number;

  @Field()
  hp_max: Number;
}

@ObjectType()
class CharacterAction {
  @Field()
  name: String;

  @Field()
  description: String;
}

@ObjectType()
class CharacterAttack {
  @Field()
  name: String;

  @Field()
  proficient: Boolean;

  @Field(() => [CharacterAttackData])
  data: [CharacterAttackData];
}

@ObjectType()
class CharacterAttackData {
  @Field(() => [CharacterAttackDamage])
  damage: [CharacterAttackDamage];

  @Field(() => [String])
  properties: [String];

  @Field()
  type: String;

  @Field()
  range: String;
}

@ObjectType()
class CharacterAttackDamage {
  @Field()
  die: String;

  @Field()
  type: String;

  @Field()
  properties: String;
}

@ObjectType()
class CharacterEquipment {
  @Field(() => [CharacterItems])
  items: [CharacterItems];

  @Field(() => [CharacterItems])
  armor: [CharacterItems];

  @Field(() => [CharacterItems])
  magicItems: [CharacterItems];

  @Field(() => [CharacterItems])
  weapons: [CharacterItems];

  @Field(() => [CharacterItems])
  vehicles: [CharacterItems];

  @Field()
  rations: Number;

  @Field()
  waterskin: Number;
}

@ObjectType()
class CharacterItems {
  @Field((_) => ID)
  id: String;

  @Field()
  equipped: Boolean;

  @Field()
  quantity: Number;
}

@ObjectType()
class CharacterSavingThrow {
  @Field()
  proficient: Boolean;

  @Field()
  expertise: Boolean;
}

@ObjectType()
class CharacterSavingThrows {
  @Field()
  strength: CharacterSavingThrow;

  @Field()
  dexterity: CharacterSavingThrow;

  @Field()
  constitution: CharacterSavingThrow;

  @Field()
  intelligence: CharacterSavingThrow;

  @Field()
  wisdom: CharacterSavingThrow;

  @Field()
  charisma: CharacterSavingThrow;
}

@ObjectType()
class CharacterClasses {
  @Field()
  className: String;

  @Field()
  subclassName: String;

  @Field()
  classLevel: Number;

  @Field()
  hitDie: Number;

  @Field((_) => ID)
  classId: String;

  @Field()
  subclassDescription: String;
}

@ObjectType()
class CharacterSpells {
  @Field()
  spellId: String;

  @Field()
  prepared: Boolean;
}

@ObjectType()
class CharacterPortrait {
  @Field(() => String, { nullable: true })
  avatar?: String;
  @Field(() => String, { nullable: true })
  token?: String;
  @Field()
  original: String;
}

@ObjectType()
class CharacterFlavor {
  @Field()
  faction: String;

  @Field(() => Traits, { nullable: true })
  traits: Traits;

  @Field(() => String, { nullable: true })
  description: String;

  @Field(() => [CharacterPersonality])
  personality: [CharacterPersonality];

  @Field(() => CharacterPortrait, { nullable: true })
  portrait: CharacterPortrait;

  @Field(() => String, { nullable: true })
  psychologicalDescription: String;

  @Field(() => String, { nullable: true })
  physicalDescription: String;

  @Field(() => String, { nullable: true })
  backstory: String;

  @Field(() => String, { nullable: true })
  class: String;
}

@ObjectType()
class CharacterStats {
  @Field(() => String, { nullable: true })
  aligment: String;

  @Field(() => CharacterBackground, { nullable: true })
  background: CharacterBackground;

  @Field(() => CharacterRace, { nullable: true })
  race: CharacterRace;

  @Field()
  armorClass: Number;

  @Field()
  speed: Number;

  @Field(() => [CharacterAbilityScores])
  abilityScores: [CharacterAbilityScores];

  @Field()
  proficiencyBonus: Number;

  @Field(() => [CharacterSkills])
  skills: [CharacterSkills];

  @Field(() => [CharacterHitpoints])
  hitPoints: [CharacterHitpoints];

  @Field()
  initiativeBonus: Number;

  @Field()
  passivePerception: Number;

  @Field()
  experience: Number;

  @Field(() => [CharacterAction])
  actions: [CharacterAction];

  @Field(() => [CharacterAction])
  bonusActions: [CharacterAction];

  @Field(() => [CharacterAttack])
  attacks: [CharacterAttack];

  @Field(() => [CharacterAction])
  additionalAbilities: [CharacterAction];

  @Field(() => [CharacterAction])
  reactions: [CharacterAction];

  @Field(() => [CharacterSpells])
  spells: [CharacterSpells];

  @Field(() => [CharacterEquipment])
  equipment: [CharacterEquipment];

  @Field()
  proficiencies: String;

  @Field(() => [CharacterSavingThrows])
  savingThrows: [CharacterSavingThrows];  

  @Field(() => [CharacterClasses], { nullable: true })
  classes: [CharacterClasses];

  @Field()
  stress: Number;
}

@ObjectType()
class Character {
  @Field((_) => ID)
  _id?: ObjectId;

  @Field((_) => ID)
  player: String;

  @Field()
  flavor: CharacterFlavor;

  @Field()
  stats: CharacterStats;

  @Field()
  name: String;

  @Field()
  type: String;
}

@ObjectType()
export class CharacterResponse {
  @Field(() => [CharacterError], { nullable: true })
  errors?: CharacterError[];

  @Field(() => [Character], { nullable: true })
  characters?: Character[];
}
