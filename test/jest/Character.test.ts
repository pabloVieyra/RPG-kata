import Character from "@/Character";

describe("Character test", () => {
  it("dado un nuevo personaje cuando se initializa entonces deberia tener el estado inicial", () => {
    const character = new Character();

    expect(character.isAlive()).toBe(true);
    expect(character.getHealth()).toBe(1000);
    expect(character.getMaxHealth()).toBe(1000);
    expect(character.getLevel()).toBe(1);
    expect(character.getFactions().length).toBe(0);
  });

  it("dado un personaje con 1000 de vida cuando recibe un ataque de 50 entonces su vida total debe ser de 950", () => {
    const character = new Character();

    character.receiveAttack(50);

    expect(character.getHealth()).toBe(950);
  });

  it("dado un personaje con 1000 de vida cuando recibe un ataque de 1500 entonces su vida total debe ser de 0 y su estado muerto", () => {
    const character = new Character();

    character.receiveAttack(1500);

    expect(character.getHealth()).toBe(0);
    expect(character.isAlive()).toBe(false);
  });


  it("dado un personaje con 500 de vida cuando lanza la curacion en si mismo entonces su vida total deberia ser 1000", () => {
    const character = new Character();
    character.receiveAttack(500);

    character.heal();

    expect(character.getHealth()).toBe(1000);
  });

  it("dado un personaje muerto cuando lanza la curacion en si mismo entonces deberia permanecer meurto y con vida 0", () => {
    const character = new Character();
    character.receiveAttack(character.getHealth());

    character.heal();

    expect(character.getHealth()).toBe(0);
    expect(character.isAlive()).toBe(false);
  });

  it("Dado un personaje nivel 1, cuando se incrementa su nivel a 6 entonces su vida maxima debe ser de 1500", () => {
    const character = new Character();

    character.levelUp();
    character.levelUp();
    character.levelUp();
    character.levelUp();
    character.levelUp();

    expect(character.getLevel()).toBe(6);
    expect(character.getMaxHealth()).toBe(1500);
  });

  it("Dado un personaje nuevo, cuando se une a 2 factions entonces la cantidad de facciones debe ser dos", () => {
    const character = new Character();
    const myFaction = "Test faction";
    const myFaction2 = "Test faction 2";

    character.joinFaction(myFaction);
    character.joinFaction(myFaction2);

    expect(character.getFactions().length).toBe(2);
  });

  it("Dado un personaje unido a una faction, cuando la abandona entonces la cantidad de facciones debe ser cero", () => {
    const character = new Character();
    const myFaction = "Test faction";
    character.joinFaction(myFaction);

    character.leaveFaction(myFaction);

    expect(character.getFactions().length).toBe(0);
  });


});
