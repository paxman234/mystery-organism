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
    //specimen properties
    _specimenNum: specimenNum,
    _dna: dna,
    get specimenNum() {
      if(typeof this._specimenNum === 'number') {
        return this._specimenNum;
      }
      else {
        return 'spec type error.';
      }
    },
    set specimenNum(specimenNum) {
      if(typeof specimenNum === 'number') {
        return this._specimenNum = specimenNum;
      }
      else {
        return 'Pass a unique number above 0';
      }
    },
    //dna properties
    get dna(){
      if(Array.isArray(this._dna)) {
        return this._dna;
      }
      else {
        return `dna for specimen #${this._specimenNum} not retrievable.`
      }
    },
    set dna(dna) {
      if(Array.isArray(dna)) {
        return this._dna = dna;
      }
      else {
        return 'Make sure DNA data is of correct type.';
      }
    },
    mutate() {
      const indexDnaBase = Math.floor(Math.random() * 14);
      let randomDnaBase = this._dna[indexDnaBase];
      let newDnaBase = returnRandBase();
      while(newDnaBase === randomDnaBase) {
        newDnaBase = returnRandBase();
      }
      this._dna.splice(indexDnaBase, 1, newDnaBase);
      return this._dna;
    },
  
    compareDna(pAequor) {
      let percentage = 0;
      let match_count = 0;
      let difference_count = 0;
      for (let i = 0; i < 15; i++) {
        if(this.dna[i] === pAequor.dna[i]) {
          match_count++;
        }
        else {
          difference_count++;
        }
      }
      percentage=100/15 * match_count;
      return `specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${Math.floor(percentage)}% DNA in common`;
    },
  
    willLikelySurvive() {
      let cOrGBases_count = 0;
      const survivalNumber = 9;
      for (const dnaBase of this.dna) {
        if(dnaBase === 'C' || dnaBase === 'G') {
          cOrGBases_count++;
        }
      }
      return cOrGBases_count >= survivalNumber ? true : false;
    }
  }

} 

//testing
let otherSpecimen = [];
let survivalSpecimens = [];
let currentStrand = [];
let specNum = 1;
// const currentStrand = mockUpStrand;
let mutatedSpecimen = [];
while(survivalSpecimens.length < 30) {
  currentStrand = mockUpStrand();
  // console.log(currentStrand.length);
  const currentSpecimen = pAequorFactory(specNum, currentStrand);
  // mutatedSpecimen = currentSpecimen.mutate();
  const survivability = currentSpecimen.willLikelySurvive();
  if(survivability) {
    survivalSpecimens.push(currentSpecimen);
  }
  else {
    otherSpecimen.push(currentSpecimen);
  }
  specNum ++;

}

const specimen15 = survivalSpecimens[0];
let specimen4 = {};
specimen4 = survivalSpecimens[3];
//mutate tests
// console.log(specimen4);
// specimen4.mutate();
// console.log(specimen4);
let biggestIntPercentage = 0;
let most_related = [];
const percentComp = specimen15.compareDna(specimen4);
for(i=1; i<survivalSpecimens.length; i++) {
  let percentageComp = specimen15.compareDna(survivalSpecimens[i]);
  if(percentageComp.includes('have 100% DNA in common')) {
    return percentageComp
  }
  // else if(percentageComp.includes('have 93% DNA in common')) {
  //   return percentageComp
  // }
  // else if(percentageComp.includes('have 86% DNA in common')) {
  //   return percentageComp
  // }
  // else if(percentageComp.includes('have 80% DNA in common')) {
  //     return percentageComp
  // }
  else {
    const modIndex = percentageComp.indexOf('%');
    if(modIndex === null || modIndex === 0) {
      console.log('error detected');
      break;
    }
    let percentString = percentageComp.slice(modIndex-2, modIndex);
    const intPercentage = parseInt(percentString);
    if(intPercentage >=  biggestIntPercentage) {
      if(intPercentage === biggestIntPercentage) {
        most_related.push([specimen15._specimenNum, survivalSpecimens[i]._specimenNum, intPercentage]);
      }
      else {
        biggestIntPercentage = intPercentage;
        most_related.unshift([specimen15._specimenNum, survivalSpecimens[i]._specimenNum, intPercentage]);
      }

    }
  }
}
console.log(most_related);
console.log(percentComp);
console.log(specNum);
console.log(survivalSpecimens.length);
console.log(otherSpecimen.length);



