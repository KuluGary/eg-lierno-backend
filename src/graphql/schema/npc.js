const { gql } = require('apollo-server-express');

module.exports = gql`
     extend type Query {
        getAllNpcs: [Npc]      
        getNpcsById(npcIds: [String]): [Npc],
        getPublicNpcs: [Npc]
     }
     type Npc {
        _id: ID
        name: String
        flavor: NpcFlavor         
        stats: NpcStats
     }
     type NpcFlavor {
        faction: String
        gender: String
        pronoun: String
        environment: String
        description: String
        nameIsProper: Boolean
        imageUrl: String
        class: String
        campaign: [NpcCampaign]
        perosnality: [NpcPersonality]
     }
     type NpcStats {
         size: String
         race: String
         alignment: String
         armorClass: IntOrString
         hitDieSize: IntOrString
         proficiencyBonus: IntOrString
         speed: String
         abilityScores: NpcAbilityScoreModifiers
         savingThrows: [NpcSavingThrows]
         skills: [NpcSkills]
         damageVulnerabilities: [String]
         damageResistances: [String]
         damageImmunities: [String]
         conditionImmunities: [String]
         senses: [String]
         langages: [String]
         additionalAbilities: [NpcAbilities]
         challengeRating: IntOrString
         experiencePoints: Int
         actions: [NpcAbilities]
         reactions: [NpcAbilities]
         legendaryActions: [NpcAbilities]
         legendaryActionsPerRound: Int
         abilityScoreModifiers: NpcAbilityScoreModifiers
         armorType: String
         hitPoints: Int
         extraHealthFromConstitution: Int
         hitPointsStr: String
         armorTypeStr: String
         legendaryActionsDescription: String
         challengeRatingStr: String
     }
     type NpcCampaign {
         campaignId: String
         unlocked: Boolean
     }
     type NpcPersonality {
         perosnality: String
         physical: String
         backstory: String
     }
     type NpcSavingThrows {
         ability: String
         proficient: Boolean
         modifier: Int
         modifierStr: String
     }
     type NpcSkills {
         ability: String
         proficient: Boolean
     }
     type NpcAbilities {
         name: String
         description: String
     }
     type NpcAbilityScoreModifiers {
         strength: Int
         dexterity: Int
         constitution: Int
         intelligence: Int
         wisdom: Int
         charisma: Int
     }
 `