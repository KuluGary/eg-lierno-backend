const { gql } = require('apollo-server-express');

module.exports = gql`
     extend type Query {
         characters(
             qs: String
         ): [Character]   
         character(_id: ID): Character
         getUserCharactersAsDm(_id: ID!): [Character]
         getAllCharacters: [Character]
         getUserCharacters(_id: ID): [Character]
         getCharactersById(characterIds: [String]): [Character]
     }
     type Character {
         _id: ID
         player: ID
         flavor: CharacterFlavor
         stats: CharacterStats
     }
     type CharacterFlavor {
         faction: String
         traits: Traits
         personality: [CharacterPersonality]
         portrait: String
         psychologicalDescription: String
         physicalDescription: String
         backstory: String
     }
     type Traits {
         name: String
         gender: String
         pronoun: String
         age: String
         eyes: String
         weight: String
         hair: String
         skin: String
         height: String
     }
     type CharacterPersonality {
         personalityTraits: String
         ideals: String
         bonds: String
         flaws: String
     }
     type CharacterStats {
         aligment: String
         background: [CharacterBackground]
         race: CharacterRace
         armorClass: Int
         speed: Int
         abilityScores: [CharacterAbilityScores]
         proficiencyBonus: Int
         skills: [CharacterSkills]
         hitPoints: [CharacterHitpoints]
         initiativeBonus: Int
         passivePerception: Int
         experience: Int
         actions: [CharacterAction]
         bonusActions: [CharacterAction]
         attacks: [CharacterAttack]
         additionalAbilities: [CharacterAction]
         reactions: [CharacterAction]
         spells: [CharacterSpells]
         equipment: [CharacterEquipment]
         proficiencies: String
         savingThrows: [CharacterSavingThrows]
         classes: [CharacterClasses]
         # wounds: [Wounds]
         stress: Int
         # afflictions: [Afflictions]
         # otherResource: [OtherResource]
     }
     type CharacterBackground {
         name: String
         description: String
         trait: String
     }
     type CharacterRace {
         name: String
         description: String
         subrace: [Subrace]
     }
     type Subrace {
         name: String
         des: String
     }
     type CharacterAbilityScores {
         strength: Int
         dexterity: Int
         constitution: Int
         intelligence: Int
         wisdom: Int
         charisma: Int
     }
     type CharacterSkills {
         acrobatics: [CharacterSkill]
         animal_handling: [CharacterSkill]
         arcana: [CharacterSkill]
         athletics: [CharacterSkill]
         deception: [CharacterSkill]
         history: [CharacterSkill]
         insight: [CharacterSkill]
         intimidation: [CharacterSkill]
         investigation: [CharacterSkill]
         medicine: [CharacterSkill]
         nature: [CharacterSkill]
         perception: [CharacterSkill]
         performance: [CharacterSkill]
         persuasion: [CharacterSkill]
         religion: [CharacterSkill]
         sleight_of_hand: [CharacterSkill]
         stealth: [CharacterSkill]
         survival: [CharacterSkill]        
     }
     type CharacterSkill {
         name: String
         modifier: String
         proficient: Boolean
         expertise: Boolean
         description: String
     }
     type CharacterHitpoints {
         hp_current: Int
         hp_max: Int
     }
     type CharacterAction {
         name: String 
         description: String
     }
     type CharacterAttack {
         name: String
         proficient: Boolean
         data: [CharacterAttackData]

     }
     type CharacterAttackData {
         damage: [CharacterAttackDamage]
         properties: [String]
         type: String
         range: String
     }
     type CharacterAttackDamage {
         die: String
         type: String
         properties: String
     }
     type CharacterEquipment {
         items: [CharacterItems]
         armor: [CharacterItems]
         magicItems: [CharacterItems]
         weapons: [CharacterItems]
         vehicles: [CharacterItems]
         rations: Int
         waterskin: Int
     }
     type CharacterItems {
         id: ID
         equipped: Boolean
         quantity: Int
     }
     type CharacterSavingThrows {
         strength: CharacterSavingThrow
         dexterity: CharacterSavingThrow
         constitution: CharacterSavingThrow
         intelligence: CharacterSavingThrow
         wisdom: CharacterSavingThrow
         charisma: CharacterSavingThrow
     }
     type CharacterSavingThrow {
         proficient: Boolean
         expertise: Boolean
     }
     type CharacterClasses {
         className: String
         subclassName: String
         classLevel: Int
         hitDie: Int
         classId: ID
         subclassDescription: String
     },
     type CharacterSpells {
         spellId: String,
         prepared: Boolean
     }
 `