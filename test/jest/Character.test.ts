import Character from "@/Character";

describe("Character test", () => {
  it("dado un nuevo personaje cuando se initializa entonces deberia tener el estado inicial", () => {
    const character = new Character();

    expect(character.isAlive()).toBe(true);
    expect(character.getHealth()).toBe(1000);
    expect(character.getMaxHealth()).toBe(1000);
    expect(character.getLevel()).toBe(1);
  });

  it("dado un personaje con 1000 de vida cuando recibe un ataque de 50 entonces su vida total debe ser de 950", () => {
    const character = new Character();

    character.receiveAttack(50, character.getLevel());

    expect(character.getHealth()).toBe(950);
  });

  it("dado un personaje con 1000 de vida cuando recibe un ataque de 1500 entonces su vida total debe ser de 0 y su estado muerto", () => {
    const character = new Character();

    character.receiveAttack(1500, character.getLevel());

    expect(character.getHealth()).toBe(0);
    expect(character.isAlive()).toBe(false);
  });

  // Levels 2
  it("dado un personaje con 1000 de vida cuando recibe un ataque de 500 de un atacantes 5 niveles por encima   entonces su vida total debe ser de 250", () => {
    const character = new Character();

    character.receiveAttack(500, 6);

    expect(character.getHealth()).toBe(250);
    expect(character.isAlive()).toBe(true);
  });

  it("dado un personaje con 1000 de vida cuando recibe un ataque de 500 de un atacantes 5 niveles por debajo   entonces su vida total debe ser de 750", () => {
    const character = new Character();

    character.levelUp();
    character.levelUp();
    character.levelUp();
    character.levelUp();
    character.levelUp();

    character.receiveAttack(500, 1);

    expect(character.getHealth()).toBe(750);
    expect(character.isAlive()).toBe(true);
  });

  //

  it("dado un personaje con 500 de vida cuando lanza la curacion en si mismo entonces su vida total deberia ser 1000", () => {
    const character = new Character();
    character.receiveAttack(500, character.getLevel());

    character.heal();

    expect(character.getHealth()).toBe(1000);
  });

  it("dado un personaje muerto cuando lanza la curacion en si mismo entonces deberia permanecer meurto y con vida 0", () => {
    const character = new Character();
    character.receiveAttack(character.getHealth(), character.getLevel());

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
});
