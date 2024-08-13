// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  

  function mutate() {
    let randomDnaBase = dna[Math.floor(Math.random() * 14)];
    const indexDnaBase = dna.indexOf(randomDnaBase);
    let newDnaBase = returnRandBase();
    while(newDnaBase === randomDnaBase) {
      newDnaBase = returnRandBase();
    }
    const mutatedDna = dna.splice(indexDnaBase, 1, newDnaBase);
    return mutatedDna;
  };
} 






