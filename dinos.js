const dadosDinos = {
  dinossauros: [
    {
      nome: "Herrerasaurus",
      mordida: 30,
      peso_kg: 175,
      velocidade_kmh: 45,
      crescimento: "1h 20m",
      habilidade: "Escalar",
      dieta: ["Carnívoro", "Piscívoro"],
      grupo_max: 10,
      ovos: 6,
      atributos_base: {
        dano: 3,
        velocidade: 4,
        resistencia: 2,
        furtividade: 2,
        regeneracao: 2
      }
    },
    {
      nome: "Troodon",
      mordida: 15,
      peso_kg: 60,
      velocidade_kmh: 45,
      crescimento: "1h 10m",
      habilidade: "Veneno",
      dieta: ["Carnívoro"],
      grupo_max: 10,
      ovos: 5,
      atributos_base: {
        dano: 2,
        velocidade: 4,
        resistencia: 1,
        furtividade: 5,
        regeneracao: 2
      }
    },
    {
      nome: "Ceratosaurus",
      mordida: 150,
      peso_kg: 1300,
      velocidade_kmh: 40.2,
      crescimento: "2h 50m",
      habilidade: "Mordida Séptica",
      dieta: ["Carnívoro"],
      grupo_max: 4,
      ovos: 4,
      atributos_base: {
        dano: 5,
        velocidade: 3,
        resistencia: 3,
        furtividade: 1,
        regeneracao: 2
      }
    },
    {
      nome: "Carnotaurus",
      mordida: 150,
      peso_kg: 1300,
      velocidade_kmh: 49.5,
      crescimento: "2h 50m",
      habilidade: "Investida",
      dieta: ["Carnívoro"],
      grupo_max: 3,
      ovos: 6,
      atributos_base: {
        dano: 5,
        velocidade: 4,
        resistencia: 2,
        furtividade: 1,
        regeneracao: 2
      }
    },
    {
      nome: "Dilophosaurus",
      mordida: 85,
      peso_kg: 700,
      velocidade_kmh: 47.5,
      crescimento: "1h 45m",
      habilidade: "Veneno Alucinógeno",
      dieta: ["Carnívoro"],
      grupo_max: 4,
      ovos: 6,
      atributos_base: {
        dano: 3,
        velocidade: 4,
        resistencia: 2,
        furtividade: 3,
        regeneracao: 2
      }
    },
    {
      nome: "Deinosuchus",
      mordida: 500,
      peso_kg: 8000,
      velocidade_kmh: 18,
      crescimento: "5h 50m",
      habilidade: "Pegada de Emboscada",
      dieta: ["Carnívoro", "Piscívoro"],
      grupo_max: 2,
      ovos: 6,
      atributos_base: {
        dano: 5,
        velocidade: 1,
        resistencia: 5,
        furtividade: 2,
        regeneracao: 2
      }
    },
    {
      nome: "Omniraptor",
      mordida: 65,
      peso_kg: 450,
      velocidade_kmh: 46.8,
      crescimento: "1h 42m",
      habilidade: "Sangramento",
      dieta: ["Carnívoro"],
      grupo_max: 8,
      ovos: 4,
      atributos_base: {
        dano: 3,
        velocidade: 5,
        resistencia: 2,
        furtividade: 3,
        regeneracao: 2
      }
    },
    {
      nome: "Pteranodon",
      mordida: 20,
      peso_kg: 45,
      velocidade_kmh: 28.5,
      crescimento: "1h 25m",
      habilidade: "Voo",
      dieta: ["Piscívoro", "Caça Pequena"],
      grupo_max: 12,
      ovos: 4,
      atributos_base: {
        dano: 1,
        velocidade: 4,
        resistencia: 1,
        furtividade: 4,
        regeneracao: 2
      }
    },
    // 🌿 HERBÍVOROS
    {
      nome: "Diabloceratops",
      mordida: 275,
      peso_kg: 3000,
      velocidade_kmh: 36,
      crescimento: "3h 30m",
      habilidade: "Investida com Chifres",
      dieta: ["Herbívoro"],
      grupo_max: 6,
      ovos: 6,
      atributos_base: {
        dano: 4,
        velocidade: 2,
        resistencia: 5,
        furtividade: 1,
        regeneracao: 3
      }
    },
    {
      nome: "Tenontosaurus",
      mordida: 35,
      peso_kg: 1600,
      velocidade_kmh: 40.5,
      crescimento: "2h 30m",
      habilidade: "Chute Poderoso / Ataque de Cauda",
      dieta: ["Herbívoro"],
      grupo_max: 8,
      ovos: 6,
      atributos_base: {
        dano: 3,
        velocidade: 3,
        resistencia: 4,
        furtividade: 2,
        regeneracao: 3
      }
    },
    {
      nome: "Maiasaura",
      mordida: 40,
      peso_kg: 3800,
      velocidade_kmh: 46.9,
      crescimento: "2h 30m",
      habilidade: "Alternar Postura",
      dieta: ["Herbívoro"],
      grupo_max: 10,
      ovos: 8,
      atributos_base: {
        dano: 2,
        velocidade: 3,
        resistencia: 3,
        furtividade: 2,
        regeneracao: 3
      }
    },
    {
      nome: "Stegosaurus",
      mordida: 50,
      peso_kg: 6000,
      velocidade_kmh: 26.2,
      crescimento: "8h+",
      habilidade: "Golpe Caudal",
      dieta: ["Herbívoro"],
      grupo_max: 5,
      ovos: 5,
      atributos_base: {
        dano: 4,
        velocidade: 1,
        resistencia: 5,
        furtividade: 1,
        regeneracao: 2
      }
    },
    {
      nome: "Pachycephalosaurus",
      mordida: 30,
      peso_kg: 500,
      velocidade_kmh: 41.8,
      crescimento: "1h 15m",
      habilidade: "Investida Craniana",
      dieta: ["Herbívoro"],
      grupo_max: 8,
      ovos: 8,
      atributos_base: {
        dano: 3,
        velocidade: 3,
        resistencia: 3,
        furtividade: 3,
        regeneracao: 2
      }
    },
    {
      nome: "Hypsilophodon",
      mordida: 2,
      peso_kg: 20,
      velocidade_kmh: 39.6,
      crescimento: "30m",
      habilidade: "Jato de Veneno",
      dieta: ["Herbívoro"],
      grupo_max: 10,
      ovos: 6,
      atributos_base: {
        dano: 1,
        velocidade: 3,
        resistencia: 1,
        furtividade: 4,
        regeneracao: 3
      }
    },
    {
      nome: "Dryosaurus",
      mordida: 20,
      peso_kg: 130,
      velocidade_kmh: 45,
      crescimento: "Desconhecido",
      habilidade: "Nenhuma registrada",
      dieta: ["Herbívoro"],
      grupo_max: 10,
      ovos: 8,
      atributos_base: {
        dano: 2,
        velocidade: 4,
        resistencia: 2,
        furtividade: 3,
        regeneracao: 2
      }
    },

    // 🍽️ ONÍVOROS
    {
      nome: "Beipiaosaurus",
      mordida: 20,
      peso_kg: 90,
      velocidade_kmh: 32,
      crescimento: "55m",
      habilidade: "Nenhuma",
      dieta: ["Onívoro"],
      grupo_max: 12,
      ovos: 8,
      atributos_base: {
        dano: 2,
        velocidade: 3,
        resistencia: 2,
        furtividade: 3,
        regeneracao: 3
      }
    },
    {
      nome: "Gallimimus",
      mordida: 25,
      peso_kg: 425,
      velocidade_kmh: 49.7,
      crescimento: "Desconhecido",
      habilidade: "Corrida extrema + Chute rápido",
      dieta: ["Onívoro"],
      grupo_max: 10,
      ovos: 6,
      atributos_base: {
        dano: 2,
        velocidade: 5,
        resistencia: 2,
        furtividade: 3,
        regeneracao: 2
      }
    }
  ]
};
