/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (!ids.length) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(species => species.name === animal)
    .residents.every(inidividuos => age < inidividuos.age);
}

function employeeByName(employeeName = {}) {
  if (!employeeName.length) return employeeName;
  return employees.find(
    employee =>
      employee.firstName === employeeName
      || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees.find(person => person.id === personalInfo.id);
}

const isManager = (id) => {
  let check = false;
  employees
    .map(ids => ids.managers)
    .forEach((numbers) => {
      if (numbers.some(man => man === id)) {
        check = true;
      }
    });
  return check;
};

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const listDefault = {};
  animals.map(animal => (listDefault[animal.name] = animal.residents.length));
  if (!species) return listDefault;
  return listDefault[species];
}

function entryCalculator(entrants) {
  const { Adult, Child, Senior } = prices;
  if (!entrants || entrants === {}) return 0;
  let total = 0;
  Object.entries(entrants)
    .map(arrayVisitor => arrayVisitor)
    .forEach((element) => {
      if (element[0] === 'Adult') total += element[1] * Adult;
      if (element[0] === 'Senior') total += element[1] * Senior;
      if (element[0] === 'Child') total += element[1] * Child;
    });

  return parseFloat(total);
}

const locations =  ['NE', 'NW', 'SE', 'SW' ];

function retriveAnimalsPerLocation(locations) {
  let obj = { };
  locations.forEach((location) => {
    const filteredAnimals = animals
      .filter((animal) => animal.location === location)
      .map((animal) => {
        const nameKey = location
        const nameValue = animal.name
        console.log(nameValue);
        
      })
  })
  return obj
}
console.log(retriveAnimalsPerLocation(locations));
  
function animalMap(options) {
}

function schedule(dayName) {
  const arrayObject = Object.entries(hours).reduce((listHours, dayOfWeek) => {
    const [day, close] = dayOfWeek;
    listHours[day] = `Open from ${close.open}am until ${close.close - 12}pm`;
    if (close.open === 0) listHours[day] = 'CLOSED';
    return listHours;
  }, {});
  return !dayName ? arrayObject : { [dayName]: arrayObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  return Object.values(animals.find(specie => specie.id === employees
    .filter(numberId => numberId.id === id)[0].responsibleFor[0]).residents
    .reduce((accumulater, currentAge) => (
      accumulater.age > currentAge.age ? accumulater : currentAge
    )));
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((ageRange) => {
    prices[ageRange] =
      Math.round((prices[ageRange] * 100) * ((percentage / 100) + 1)) / 100;
  });
  return prices;
}

function getEmployees(idOrName) {
  return employees.find(
    person =>
      person.id === idOrName ||
      person.firstName === idOrName ||
      person.lastName === idOrName);
}

function getAnimals(listAnimals) {
  const arrayReturn = [];
  listAnimals.forEach((animal) => {
    arrayReturn.push(animals.find(idAnimal => idAnimal.id === animal).name);
  });
  return arrayReturn;
}

function employeeCoverage(idOrName) {
  const returnObject = {};
  if (!idOrName) {
    employees.forEach((employeeName) => {
      returnObject[
        `${employeeName.firstName} ${employeeName.lastName}`
      ] = getAnimals(employeeName.responsibleFor);
    });
    return returnObject;
  }
  const { firstName, lastName, responsibleFor } = getEmployees(idOrName);
  returnObject[`${firstName} ${lastName}`] = getAnimals(
    responsibleFor);
  return returnObject;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
