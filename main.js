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
    specimenNum,
    dna,
    //specimen methods.
    mutate() {
      const indexDnaBase = Math.floor(Math.random() * 14);
      let randomDnaBase = this.dna[indexDnaBase];
      let newDnaBase = returnRandBase();
      while(newDnaBase === randomDnaBase) {
        newDnaBase = returnRandBase();
      }
      this.dna.splice(indexDnaBase, 1, newDnaBase);
      return this.dna;
    },
  
    compareDna(pAequor) {
      let percentage = 0;
      let match_count = 0;
      for (let i = 0; i < 15; i++) {
        if(this.dna[i] === pAequor.dna[i]) {
          match_count++;
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
    },

    complementStrand() {

    }
  }

} 

//testing
//generate 30 specimens that will survive.
let otherSpecimen = [];
let survivalSpecimens = [];
let currentStrand = [];
let specNum = 1;
// let mutatedSpecimen = [];
while(survivalSpecimens.length < 30) {
  const currentSpecimen = pAequorFactory(specNum, mockUpStrand());
  const survivability = currentSpecimen.willLikelySurvive();
  if(survivability) {
    survivalSpecimens.push(currentSpecimen);
  }
  else {
    otherSpecimen.push(currentSpecimen);
  }
  specNum ++;
}

//compare tests
  // let specimen4 = survivalSpecimens[3];
  // const percentComp = specimenX.compareDna(specimen4);

// mutate tests
  // console.log(specimen4);
  // specimen4.mutate();
  // console.log(specimen4);
//most related function
const mostRelated = (index1=0) => {
  //obj
  let specimenX = survivalSpecimens[index1];
  //var
  let biggestIntPercentage = 0;
  let most_related = [];
  //Find largest match
  for(let i=index1; i<survivalSpecimens.length; i++) {
    for(let j=0; j<survivalSpecimens.length; j++) {
      if(j===i || j<i){
        continue;
      }
      specimenX = survivalSpecimens[i];
      let percentageComp = specimenX.compareDna(survivalSpecimens[j]);
      if(percentageComp.includes('have 100% DNA in common')) {
        most_related.unshift([specimenX.specimenNum, survivalSpecimens[j].specimenNum,100]);
      }
      else {
        const modIndex = percentageComp.indexOf('%');
        if(modIndex === null || modIndex === 0) {
          console.log('error detected');
          break;
        }
        let percentString = percentageComp.slice(modIndex-2, modIndex);
        const intPercentage = parseInt(percentString);
        if(intPercentage >= biggestIntPercentage) 
        {
          const arrayX =[specimenX.specimenNum, survivalSpecimens[j].specimenNum, intPercentage];
          (intPercentage === biggestIntPercentage) ? most_related.push(arrayX) : 
          (biggestIntPercentage = intPercentage, most_related.unshift(arrayX)); 
        }
      }
    }
  }

  return most_related;
}

//alt mostRelated
// let biggestIntPercentage = 0;
// let most_related = [];
// for(const pAequor of survivalSpecimens) {
  // for(const speciman of survivalSpecimens) {
  //   if(speciman.specimenNum === pAequor.specimenNum || speciman.specimenNum < pAequor.specimenNum) {
  //     continue;
  //   }
  //   let percentageComp = pAequor.compareDna(speciman);
  //   if(percentageComp.includes('have 100% DNA in common')) {
  //     most_related.unshift([pAequor.specimenNum, speciman.specimenNum,100]);
  //   }
  //   else {
  //     const modIndex = percentageComp.indexOf('%');
  //     if(modIndex === null || modIndex === 0) {
  //       console.log('error detected');
  //       break;
  //     }
  //     let percentString = percentageComp.slice(modIndex-2, modIndex);
  //     const intPercentage = parseInt(percentString);
  //     if(intPercentage >= biggestIntPercentage) 
  //     {
  //       const arrayX =[pAequor.specimenNum, speciman.specimenNum, intPercentage];
  //       (intPercentage === biggestIntPercentage) ? most_related.push(arrayX) : 
  //       (biggestIntPercentage = intPercentage, most_related.unshift(arrayX)); 
  //     }
  //   }
  // }
// }
//console calls
console.log(most_related);
// console.log(mostRelated());
//console.log(percentComp);
console.log(specNum);
console.log(survivalSpecimens.length);
console.log(otherSpecimen.length);
