class Character {
  private level: number = 1;
  private health: number = 1000;
  private maxHealth: number = 1000;
  private alive: boolean = true;
  private factions: string[] = [];

  getHealth() {
    return this.health;
  }

  isAlive() {
    return this.alive;
  }

  getFactions() {
    return this.factions;
  }

  joinFaction(faction: string) {
    this.factions.push(faction);
  }

  leaveFaction(faction: string) {
    this.factions = this.factions.filter((f) => f !== faction);
  }

  private targetIsAlly(target: Character) {
    //refactor
    return !!target.getFactions().find((tf) => this.getFactions().includes(tf));
  }


  healAlly(target: Character) {
    if (this.targetIsAlly(target)) target.heal();
  }

  receiveAttack(damage: number) {
    let realDamage = damage;

    /* if (this.isAttackerLevelAboveThreshold(attackerLevel)) {
      realDamage = realDamage * 1.5;
    }

    if (this.isAttackerLevelBelowThreshold(attackerLevel)) {
      realDamage = realDamage * 0.5;
    }
 */
    this.applyDamage(realDamage);
  }

  private applyDamage(realDamage: number) {
    if (realDamage >= this.health) {
      this.health = 0;
      this.alive = false;
      return;
    }
    this.health -= realDamage;
  }

  heal() {
    if (!this.alive) return;

    this.health = this.maxHealth;
  }

  getLevel(): number {
    return this.level;
  }

  levelUp() {
    this.level++;
    if (this.level === 6) {
      this.maxHealth = 1500;
    }
  }

  getMaxHealth(): number {
    return this.maxHealth;
  }
}

export default Character;
