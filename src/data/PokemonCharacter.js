import Pokemon from './Pokemon'

class TypeClassification {
  constructor(value, label) {
    this.value = value
    this.label = label
  }
}

export const typeClassificationSingle = new TypeClassification('single', 'Single Type')
export const typeClassificationDual = new TypeClassification('dual', 'Dual Type')

class Evolution {
  constructor(value, label) {
    this.value = value
    this.label = label
  }
}

export const EvolutionBase = new Evolution('base', 'Base')
export const EvolutionFinal = new Evolution('final', 'Final')
export const EvolutionSingle = new Evolution('single', 'Single')

class Generation {
  constructor(value, label) {
    this.value = value
    this.label = label
  }
}

export const GenerationI = new Generation('I', 'Gen I')
export const GenerationII = new Generation('II', 'Gen II')
export const GenerationIII = new Generation('III', 'Gen III')
export const GenerationIV = new Generation('IV', 'Gen IV')

class PokemonCharacter extends Pokemon {
  constructor(
    id,
    name,
    types,
    spriteFileName,
    spriteFileNameStatic,
    typing,
    evolution,
    isStarter,
    isLegendary,
    generation,
  ) {
    super(id, name, types, spriteFileName, spriteFileNameStatic)
    this.typing = typing // TypeClassification
    this.evolution = evolution // Evolution
    this.isStarter = isStarter
    this.isLegendary = isLegendary
    this.generation = generation // Generation
  }
}

export {
  TypeClassification,
  Evolution,
  Generation,
}
export default PokemonCharacter
