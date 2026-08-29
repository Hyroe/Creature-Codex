import argon2 from 'argon2';

import { getPrisma } from '../src/lib/prisma';

const prisma = getPrisma();

async function main() {
  const passwordHash = await argon2.hash('SeedPassword123!');

  const seedUser = await prisma.user.upsert({
    where: {
      email: 'seed@creaturecodex.dev',
    },
    update: {},
    create: {
      username: 'codexkeeper',
      displayName: 'Codex Keeper',
      email: 'seed@creaturecodex.dev',
      passwordHash,
    },
  });

  await prisma.element.createMany({
    data: [
      {
        name: 'Fire',
        description: 'Heat, flame, and combustion-based affinity.',
      },
      {
        name: 'Water',
        description: 'Water, ice, and fluid-based affinity.',
      },
      {
        name: 'Earth',
        description: 'Stone, soil, and mineral-based affinity.',
      },
      {
        name: 'Air',
        description: 'Wind and atmospheric affinity.',
      },
      {
        name: 'Light',
        description: 'Radiant and luminous affinity.',
      },
      {
        name: 'Dark',
        description: 'Shadow and void affinity.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.damageType.createMany({
    data: [
      {
        name: 'Slashing',
        description: 'Damage caused by cutting attacks.',
      },
      {
        name: 'Piercing',
        description: 'Damage caused by puncturing attacks.',
      },
      {
        name: 'Blunt',
        description: 'Damage caused by impact or crushing force.',
      },
      {
        name: 'Arcane',
        description: 'Damage caused by supernatural energy.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.bodyPart.createMany({
    data: [
      {
        name: 'Head',
        description: 'The head and skull region.',
      },
      {
        name: 'Eyes',
        description: 'Visual organs and surrounding tissue.',
      },
      {
        name: 'Wings',
        description: 'Flight-related appendages.',
      },
      {
        name: 'Legs',
        description: 'Primary locomotive limbs.',
      },
      {
        name: 'Tail',
        description: 'Rear appendage used for balance or combat.',
      },
      {
        name: 'Torso',
        description: 'Main body mass and vital organ region.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.habitat.createMany({
    data: [
      {
        name: 'Forest',
        description: 'Dense wooded ecosystems.',
      },
      {
        name: 'Desert',
        description: 'Arid and low-rainfall environments.',
      },
      {
        name: 'Mountain',
        description: 'High-altitude rocky environments.',
      },
      {
        name: 'Swamp',
        description: 'Wetland ecosystems with saturated soil.',
      },
      {
        name: 'Ocean',
        description: 'Marine and deep-water environments.',
      },
      {
        name: 'Volcanic',
        description: 'Geothermal and volcanic regions.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.diet.createMany({
    data: [
      {
        name: 'Carnivore',
        description: 'Feeds primarily on other animals.',
      },
      {
        name: 'Herbivore',
        description: 'Feeds primarily on plant matter.',
      },
      {
        name: 'Omnivore',
        description: 'Consumes both plant and animal matter.',
      },
      {
        name: 'Scavenger',
        description: 'Feeds primarily on carrion.',
      },
      {
        name: 'Energy Feeder',
        description: 'Sustains itself through magical or elemental energy.',
      },
    ],
    skipDuplicates: true,
  });

  const [
    fire,
    water,
    earth,
    air,
    light,
    dark,
    slashing,
    piercing,
    blunt,
    arcane,
    head,
    eyes,
    wings,
    legs,
    tail,
    torso,
    forest,
    desert,
    mountain,
    swamp,
    ocean,
    volcanic,
    carnivore,
    herbivore,
    omnivore,
    scavenger,
    energyFeeder,
  ] = await Promise.all([
    prisma.element.findUniqueOrThrow({ where: { name: 'Fire' } }),
    prisma.element.findUniqueOrThrow({ where: { name: 'Water' } }),
    prisma.element.findUniqueOrThrow({ where: { name: 'Earth' } }),
    prisma.element.findUniqueOrThrow({ where: { name: 'Air' } }),
    prisma.element.findUniqueOrThrow({ where: { name: 'Light' } }),
    prisma.element.findUniqueOrThrow({ where: { name: 'Dark' } }),

    prisma.damageType.findUniqueOrThrow({
      where: { name: 'Slashing' },
    }),
    prisma.damageType.findUniqueOrThrow({
      where: { name: 'Piercing' },
    }),
    prisma.damageType.findUniqueOrThrow({
      where: { name: 'Blunt' },
    }),
    prisma.damageType.findUniqueOrThrow({
      where: { name: 'Arcane' },
    }),

    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Head' } }),
    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Eyes' } }),
    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Wings' } }),
    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Legs' } }),
    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Tail' } }),
    prisma.bodyPart.findUniqueOrThrow({ where: { name: 'Torso' } }),

    prisma.habitat.findUniqueOrThrow({ where: { name: 'Forest' } }),
    prisma.habitat.findUniqueOrThrow({ where: { name: 'Desert' } }),
    prisma.habitat.findUniqueOrThrow({ where: { name: 'Mountain' } }),
    prisma.habitat.findUniqueOrThrow({ where: { name: 'Swamp' } }),
    prisma.habitat.findUniqueOrThrow({ where: { name: 'Ocean' } }),
    prisma.habitat.findUniqueOrThrow({ where: { name: 'Volcanic' } }),

    prisma.diet.findUniqueOrThrow({ where: { name: 'Carnivore' } }),
    prisma.diet.findUniqueOrThrow({ where: { name: 'Herbivore' } }),
    prisma.diet.findUniqueOrThrow({ where: { name: 'Omnivore' } }),
    prisma.diet.findUniqueOrThrow({ where: { name: 'Scavenger' } }),
    prisma.diet.findUniqueOrThrow({
      where: { name: 'Energy Feeder' },
    }),
  ]);

  await prisma.creature.upsert({
    where: {
      slug: 'ash-wyrm',
    },
    update: {},
    create: {
      slug: 'ash-wyrm',
      name: 'Ash Wyrm',
      scientificName: 'Draco cinereus',
      description:
        'A volcanic predator adapted to extreme heat and ash-filled environments.',
      threatLevel: 'HIGH',
      status: 'PUBLISHED',
      behavior: 'Territorial and highly aggressive near nesting grounds.',
      lifeCycle:
        'Hatches from heat-resistant eggs and reaches maturity after several years.',
      attackStyle: 'Uses fire breath, claws, and sweeping tail attacks.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: volcanic.id,
          },
          {
            habitatId: mountain.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: carnivore.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: fire.id,
            description: 'Highly resistant to fire and extreme heat.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: water.id,
            description: 'Cold water rapidly reduces its internal temperature.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: slashing.id,
            description:
              'Dense scales provide significant protection against blades.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: head.id,
            description:
              'The softer tissue beneath the skull ridge can be exploited.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'frost-stalker',
    },
    update: {},
    create: {
      slug: 'frost-stalker',
      name: 'Frost Stalker',
      scientificName: 'Glacialis venator',
      description:
        'A silent mountain predator whose pale hide allows it to disappear into snow.',
      threatLevel: 'MODERATE',
      status: 'PUBLISHED',
      behavior:
        'Patient hunter that follows prey for long distances before attacking.',
      lifeCycle:
        'Born in small litters and raised by the pack until capable of hunting.',
      attackStyle:
        'Fast ambush attacks focused on exposed limbs and the throat.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: mountain.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: carnivore.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: water.id,
            description:
              'Its body is naturally resistant to cold and freezing conditions.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: fire.id,
            description:
              'High temperatures quickly overwhelm its cold-adapted metabolism.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: piercing.id,
            description:
              'Thick layers of fur and muscle reduce the effectiveness of shallow punctures.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: legs.id,
            description:
              'Damage to its legs severely limits its primary advantage: speed.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'mire-crawler',
    },
    update: {},
    create: {
      slug: 'mire-crawler',
      name: 'Mire Crawler',
      scientificName: 'Paludicola vorax',
      description:
        'A heavily armored swamp creature that spends most of its life partially submerged.',
      threatLevel: 'MODERATE',
      status: 'PUBLISHED',
      behavior:
        'Mostly passive unless approached while feeding or protecting young.',
      lifeCycle:
        'Begins life as an aquatic larva before developing its armored adult form.',
      attackStyle:
        'Relies on crushing bites and sudden attacks from shallow water.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: swamp.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: omnivore.id,
          },
          {
            dietId: scavenger.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: blunt.id,
            description:
              'Its flexible armored shell absorbs much of the force from impacts.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: fire.id,
            description:
              'Its moist skin is easily damaged when exposed to sustained heat.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: eyes.id,
            description:
              'Its exposed eyes are poorly protected compared with the rest of its body.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'BODY_PART',
            targetId: torso.id,
            description:
              'The torso is protected by thick overlapping armor plates.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'stoneback-grazer',
    },
    update: {},
    create: {
      slug: 'stoneback-grazer',
      name: 'Stoneback Grazer',
      scientificName: 'Petrotherium placidum',
      description:
        'A large herbivore covered by mineral-like plates that harden throughout its life.',
      threatLevel: 'LOW',
      status: 'PUBLISHED',
      behavior: 'Calm and social, usually traveling in small herds.',
      lifeCycle:
        'Young are born with soft plates that slowly mineralize as they age.',
      attackStyle:
        'Normally avoids combat but can charge predators with tremendous force.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: forest.id,
          },
          {
            habitatId: mountain.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: herbivore.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: earth.id,
            description:
              'Its mineralized body is naturally resistant to earth-based effects.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: slashing.id,
            description:
              'Bladed attacks struggle to penetrate its mineral plates.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'DAMAGE_TYPE',
            targetId: blunt.id,
            description:
              'Heavy impacts can fracture its otherwise durable armor.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: legs.id,
            description:
              'Its legs have considerably less armor than its torso.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'void-moth',
    },
    update: {},
    create: {
      slug: 'void-moth',
      name: 'Void Moth',
      scientificName: 'Noctiluca abyssalis',
      description:
        'A rare nocturnal creature that absorbs surrounding light and feeds on arcane energy.',
      threatLevel: 'EXTREME',
      status: 'PUBLISHED',
      behavior:
        'Avoids physical confrontation but becomes extremely dangerous when threatened.',
      lifeCycle:
        'Spends years dormant inside a cocoon before emerging during periods of intense magical activity.',
      attackStyle:
        'Disorients enemies with darkness before releasing concentrated arcane energy.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: forest.id,
          },
          {
            habitatId: mountain.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: energyFeeder.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: dark.id,
            description: 'Darkness strengthens rather than harms the creature.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: light.id,
            description:
              'Intense radiant energy disrupts its ability to manipulate darkness.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: arcane.id,
            description:
              'It absorbs a significant portion of incoming magical energy.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: wings.id,
            description:
              'Its wings are fragile and necessary for maintaining its defensive mobility.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'storm-razor',
    },
    update: {},
    create: {
      slug: 'storm-razor',
      name: 'Storm Razor',
      scientificName: 'Aquila tempestatis',
      description:
        'A large aerial hunter capable of riding violent winds and generating electrical disturbances.',
      threatLevel: 'HIGH',
      status: 'PUBLISHED',
      behavior:
        'Extremely territorial around mountain peaks and nesting zones.',
      lifeCycle:
        'Juveniles remain grounded until their wing muscles fully develop.',
      attackStyle:
        'Attacks from above with high-speed dives and razor-sharp talons.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: mountain.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: carnivore.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: air.id,
            description:
              'Powerful winds have little effect on its flight stability.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: earth.id,
            description: 'Ground-based restraints severely limit its mobility.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: blunt.id,
            description:
              'Its lightweight flexible skeleton absorbs moderate impacts.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: wings.id,
            description:
              'Wing injuries immediately compromise its ability to fight effectively.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'abyssal-lurker',
    },
    update: {},
    create: {
      slug: 'abyssal-lurker',
      name: 'Abyssal Lurker',
      scientificName: 'Profundus occultus',
      description:
        'A deep-ocean ambush predator adapted to darkness and enormous water pressure.',
      threatLevel: 'HIGH',
      status: 'PUBLISHED',
      behavior:
        'Remains motionless for hours before attacking anything that enters its territory.',
      lifeCycle:
        'Spawns in deep underwater caves and grows slowly over several decades.',
      attackStyle:
        'Uses powerful jaws and sudden bursts of speed to overpower prey.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: ocean.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: carnivore.id,
          },
          {
            dietId: scavenger.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: water.id,
            description:
              'Its physiology is completely adapted to extreme aquatic environments.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: light.id,
            description:
              'Bright light overwhelms its highly sensitive sensory organs.',
          },
          {
            type: 'RESISTANCE',
            targetType: 'DAMAGE_TYPE',
            targetId: blunt.id,
            description:
              'Its pressure-adapted body tolerates substantial compressive force.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'BODY_PART',
            targetId: eyes.id,
            description:
              'Its oversized sensory eyes are extremely sensitive and exposed.',
          },
        ],
      },
    },
  });

  await prisma.creature.upsert({
    where: {
      slug: 'sunscale-prototype',
    },
    update: {},
    create: {
      slug: 'sunscale-prototype',
      name: 'Sunscale Prototype',
      scientificName: 'Solaris experimentalis',
      description:
        'An incomplete Codex entry documenting a radiant desert reptile.',
      threatLevel: 'MODERATE',
      status: 'DRAFT',
      behavior:
        'Current observations suggest that it becomes active during periods of intense sunlight.',
      lifeCycle: 'Insufficient data has been collected.',
      attackStyle:
        'Believed to use radiant bursts and rapid defensive movements.',
      authorId: seedUser.id,

      habitats: {
        create: [
          {
            habitatId: desert.id,
          },
        ],
      },

      diets: {
        create: [
          {
            dietId: energyFeeder.id,
          },
        ],
      },

      affinities: {
        create: [
          {
            type: 'RESISTANCE',
            targetType: 'ELEMENT',
            targetId: light.id,
            description:
              'Initial observations suggest strong resistance to radiant energy.',
          },
          {
            type: 'WEAKNESS',
            targetType: 'ELEMENT',
            targetId: dark.id,
            description: 'Extended darkness appears to reduce its activity.',
          },
        ],
      },
    },
  });

  console.log('Creature Codex seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
