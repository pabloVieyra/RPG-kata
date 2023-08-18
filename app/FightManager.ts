import Character from "./Character";

class FightManager {
  private static isAttackerLevelAboveThreshold(
    attackerLevel: number,
    atacadoLevel: number
  ) {
    return attackerLevel >= atacadoLevel + 5;
  }

  private static isAttackerLevelBelowThreshold(
    attackerLevel: number,
    atacadoLevel: number
  ) {
    return attackerLevel <= atacadoLevel - 5;
  }

  private static areAllies(atacante: Character, atacado:Character) {
    //refactor
    return !!atacante.getFactions().find((tf) => atacado.getFactions().includes(tf));    
  }

  static deal(atacante: Character, atacado: Character, damage: number) {
    let realDamage: number = damage;
    
    if(FightManager.areAllies(atacante,atacado)){
      return
  }

    if (
      this.isAttackerLevelAboveThreshold(
        atacante.getLevel(),
        atacado.getLevel()
      )
    ) {
      realDamage = realDamage * 1.5;
    }

    if (
      this.isAttackerLevelBelowThreshold(
        atacante.getLevel(),
        atacado.getLevel()
      )
    ) {
      realDamage = realDamage * 0.5;
    }
    atacado.receiveAttack(realDamage);
  }
}

export default FightManager;
