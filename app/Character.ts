class Character {
  private level: number = 1;
  private health: number = 1000;
  private maxHealth: number = 1000;
  private alive: boolean = true;

  getHealth() {
    return this.health;
  }

  isAlive() {
    return this.alive;
  }

  private isAttackerLevelAboveThreshold(attackerLevel: number) {
    return attackerLevel >= this.level + 5;
  }

  private isAttackerLevelBelowThreshold(attackerLevel: number) {
    return attackerLevel <= this.level - 5;
  }

  receiveAttack(damage: number, attackerLevel: number) {
    let realDamage = damage;

    if (this.isAttackerLevelAboveThreshold(attackerLevel)) {
      realDamage = realDamage * 1.5;
    }

    if (this.isAttackerLevelBelowThreshold(attackerLevel)) {
      realDamage = realDamage * 0.5;
    }

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

    this.health = 1000;
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
