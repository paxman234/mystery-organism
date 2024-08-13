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
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const indexDnaBase = Math.floor(Math.random() * 14);
      let randomDnaBase = this.dna[indexDnaBase];
      let newDnaBase = returnRandBase();
      while(newDnaBase === randomDnaBase) {
        newDnaBase = returnRandBase();
      }
      const mutatedDna = this.dna.splice(indexDnaBase, 1, newDnaBase);
      mutatedDna;
    },
  
    compareDna (pAequor) {
      let percentage = 0;
      let match_count = 0;
      let difference_count = 0;
      for (let i = 0; i < 15; i++) {
        for(let j = 0; j < 15; j++) {
          if(this.dna[i] === pAequor.dna[j]) {
            match_count++;
          }
          else {
            difference_count++;
          }
        }
      }
      percentage=100/15 * match_count;
      return `specimen #${specimenNum} and specimen #2 have ${percentage}% DNA in common`;
    },
  
    willLikelySurvive() {
      let cOrGBases_count = 0;
      const survivalNumber = 9;
      for (const dnaBase of dna) {
        if(dnaBase === 'C' || dnaBase === 'G') {
          cOrGBases_count++;
        }
      }
      return cOrGBases_count >= survivalNumber ? true : false;
    }
  }

} 

let otherSpecimen = [];
let survivalSpecimens = [];
let specNum = 1;
// const currentStrand = mockUpStrand;
while(survivalSpecimens.length < 30) {
  const currentStrand = mockUpStrand;
  const currentSpecimen = pAequorFactory(specNum, currentStrand);
  const survivability = currentSpecimen.willLikelySurvive();
  if(survivability) {
    survivalSpecimens.push(currentSpecimen);
  }
  else {
    otherSpecimen.push(currentSpecimen);
  }
  specNum ++;

}
console.log(specNum);
console.log(survivalSpecimens.length);
console.log(otherSpecimen.lengthecNum);



