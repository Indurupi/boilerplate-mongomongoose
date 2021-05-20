require('dotenv').config();
let mongoose = require("mongoose");


const mangooseURI = process.env.MONGO_URI;
const mangooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const {Schema, model, connect} = mongoose;
connect(mangooseURI, mangooseOptions);


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favouritefoods: [String]
});

const Person = model("Person", personSchema);

const resultHandler = (error, response) => console.log({error}, {response});

var createAndSavePerson = (done) => {
  var person2 = new Person({name: "person1", age: 25, favouritefoods: ["chicken biryani", "eggs", "chocolates"]
  });

  person2.save(function (error, data) {
    done(error , data);
  })

};

// createAndSavePerson(resultHandler);
// ****************************************************************

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, data) {
    done(err, data);
  })
};
var persons = [{
    name: "raja",
    age: 59,
    favouritefoods: ["alcohol"]
  },{
    name: "usha",
    age: 51,
    favouritefoods: ["her own cooking"]
  },{
    name: "prass",
    age: 28,
    favouritefoods: ["sweets"]
  }];

// createManyPeople(persons, resultHandler);

// ****************************************************************

// const findByKeyVal = (key, val, handler) => {
//   Person.find({ [key]: val}, handler)
// }

// ****************************************************************
const findPeopleByName = (personName, done) => {
   Person.find({ name: personName }, done)
};

// findPeopleByName("raja", resultHandler);

// ****************************************************************

const findOneByFood = (food, done) => {
  Person.findOne({favouritefoods: food}, function(err, result) {
    console.log(err);
    console.log(result)
  })
};

// findOneByFood("sweets", resultHandler)

// ****************************************************************

const findPersonById = (personId, done) => {
  Person.findById(personId, done)
};

// findPersonById("60a4cf76646645042f20eb4f", resultHandler)
// ****************************************************************

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, function(err, data){
   if(err) return console.log(err);
  let document = data;
  document.favouritefoods.push(foodToAdd);
  document.markModified("favouritefoods");
  document.save(done)
  })
};

// findEditThenSave("60a4cf76646645042f20eb4f", resultHandler)

// ****************************************************************
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
   Person.findOneAndUpdate(
     { name: personName }, // query
     { age: ageToSet }, // field to update and its val
     { new: true },// to return modified new document else by default it returns old document
     done // once update is done, call back handler
     )
};

// findAndUpdate("prass", resultHandler);

// ****************************************************************

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, done)
};

// removeById("60a4cfb9bcc2850462e7534a", resultHandler)
// ****************************************************************
const removeManyPeople = (done) => {
  const nameToRemove = "Gary";
  Person.deleteMany({ name: nameToRemove}, done)
};

// removeManyPeople(resultHandler);
// ****************************************************************

const queryChain = (done) => {
  Person.find({name: "Mary"})
        .sort({age: -1})
        .limit(2)
        .select("age name favouritefoods")
        .exec(done)
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
