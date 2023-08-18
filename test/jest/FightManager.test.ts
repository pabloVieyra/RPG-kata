import Character from "@/Character";
import FightManager from "@/FightManager";

describe("Fight Manager", () => {
  let atacante = {} as Character;
  let atacado = {} as Character;


  beforeEach(() => {
    atacado.receiveAttack = jest.fn();
    atacante.getLevel = jest.fn(() => 1);
    atacado.getLevel = jest.fn(() => 1);
    atacante.getFactions = jest.fn(() => []);
    atacado.getFactions = jest.fn(() => []);
  });


  it("Dado 2 personajes con el mismo nivel , cuando uno ataque con 50 de daño  entonces el daño aplicado es del 100%", () => {
    atacante.getLevel = jest.fn(() => 5);
    atacado.getLevel = jest.fn(() => 5);

    FightManager.deal(atacante, atacado, 50);

    expect(atacado.receiveAttack).toBeCalledWith(50);
  });

  it("Dado 2 personajes con almenos 5  niveles de diferencia , cuando  el atacante tiene mayor nivel , entonces el daño aplicado es un  50% mas ", () => {
    atacante.getLevel = jest.fn(() => 11);
    atacado.getLevel = jest.fn(() => 5);

    FightManager.deal(atacante, atacado, 50);

    expect(atacado.receiveAttack).toBeCalledWith(75);
  });

  it("Dado 2 personajes con almenos 5  niveles de diferencia , cuando  el atacante tiene menor nivel , entonces el daño aplicado es un 50% menor", () => {
    atacante.getLevel = jest.fn(() => 5);
    atacado.getLevel = jest.fn(() => 11);

    FightManager.deal(atacante, atacado, 50);

    expect(atacado.receiveAttack).toBeCalledWith(25);
  });

  it("Dados 2 personajes de la misma faction, cuando uno ataca a otro entonces si vida no baja", () => {
    const myFaction = "Red faction";
    const attackDamage = 100;

    atacante.getLevel = jest.fn(() => 1);
    atacado.getLevel = jest.fn(() => 1);
    atacante.getFactions = jest.fn(() => [myFaction]);
    atacado.getFactions = jest.fn(() => [myFaction]);

    FightManager.deal(atacante, atacado, attackDamage);

    expect(atacado.receiveAttack).not.toBeCalled();
  });

  it("Dados 2 personajes de distintas factions, cuando uno ataca a otro entonces su vida baja", () => {
    const myFaction = "Red faction";
    const blueFaction = "Blue faction";
    const attackDamage = 100;

    atacante.getLevel = jest.fn(() => 1);
    atacado.getLevel = jest.fn(() => 1);
    atacante.getFactions = jest.fn(() => [myFaction]);
    atacado.getFactions = jest.fn(() => [blueFaction]);

    FightManager.deal(atacante, atacado, attackDamage);

    expect(atacado.receiveAttack).toBeCalledWith(attackDamage);
  });

  it("Dados 2 personajes de la misma faction, cuando uno cura a otro entonces su vida se restaura al maximo", () => {
    const myFaction = "Red faction";
    const character1 = new Character();
    const character2 = new Character();
    character1.joinFaction(myFaction);
    character2.joinFaction(myFaction);
    character2.receiveAttack(500);
    const currentHealth = character2.getHealth();

    character1.healAlly(character2);

    expect(character2.getHealth()).toBeGreaterThan(currentHealth);
  });

  it("Dados 2 personajes de la distintas faction, cuando uno cura a otro entonces su vida queda igual", () => {
    const myFaction = "Red faction";
    const myFaction2 = "Blue faction";
    const character1 = new Character();
    const character2 = new Character();
    character1.joinFaction(myFaction);
    character2.joinFaction(myFaction2);
    character2.receiveAttack(500);
    const currentHealth = character2.getHealth();

    character1.healAlly(character2);

    expect(character2.getHealth()).toBe(currentHealth);
  });

  
});
