const express = require('express')
const connectDb= require('./config/connectDB');
const Person = require('./models/Person');
const app = express()

require('dotenv').config()
/*console.log(process.env.MONGO_URI)*/

connectDb()

app.use(express.json());

const port = 4000;

// Create a person into the collection
const addPerson = async () => {
  try {
    const newPerson = new Person({
      name: "John",
      age: 30,
      favoriteFoods: ["pizza","Mozzarella cheese"],
    });
console.log(newPerson)
//Save a Record of a Model
    await newPerson.save();
    console.log(newPerson)
  } catch (err) {
    console.log(err);
  }
};
addPerson()
// Create Many Records with model.create() 
const TablePeople = async () => {
  try {
    const manyPerson = await Person.create([
      {
        name: "Iline",
        age: 17,
        favoriteFoods: ["fried egg","Steak"],
      },
      {
        name: "brown",
        age: 42,
        favoriteFoods: ["spagetti","Chicken"],
      },
      {
        name: "ahmed",
        age: 31,
        favoriteFoods: ["sandiwch","Pizza"],
      },
      
    ]);
    console.log(manyPerson )
  } catch (err) {
    console.log(err);
  }
};
TablePeople()
//Use model.find() to Search Your Database
const findAllPerson = async()=>{
  try {
   const allPerson= await Person.find()
   console.log("findAllPerson",allPerson)
  } catch (err) {
    console.log(err);
  }
};
findAllPerson()
// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson =(food)=>{
    Person.findOne({favoriteFoods: food }, function (err, onePerson) {
        if(err){
            console.log(err)
        }
        console.log(onePerson)
            });
};

findOnePerson(["fried egg","Steak"])
// Use model.findById() to Search Your Database By _id
const SearchById = (idPerson)=>{
    
Person.findById({_id : idPerson}, (err, person) => {
    if(err){ 
    console.log(err) 
  }
    console.log(person)
});
};
SearchById("62ce82fb512c68f8fb95af7b")
// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave =(idPerson, foodUpdate)=>{
Person.findById({_id:idPerson}, (err, person)=>{
    if(err){
      console.log(err);
    } else
    person.favoriteFoods.push(foodUpdate)
    person.save()
    console.log(person);
})
}
//findEditThenSave('62ce974d40c49faeb4a55a14',"cake")
// Perform New Updates on a Document Using model.findOneAndUpdate()
const findUpdate = (PersonName, ageUpdate)=> {
    Person.findOneAndUpdate(
       {name: PersonName},
       { $set: { age: ageUpdate} }, 
       {new:true}, 
       (err, person)=>{
if(err){
  console.log(err)
}else
  console.log(person)
    })
};
findUpdate('john','55')
//Delete One Document Using model.findByIdAndRemove
const removeById = (idPerson)=>{
    Person.findByIdAndRemove({_id: idPerson}, (err, person)=>{
        if(err){ 
        console.log(err);
        } else {
        console.log(person);
        }
    })
}; 
removeById("62ce974d40c49faeb4a55a14")
console.log("person deleted successufuly")
//MongoDB and Mongoose - Delete Many Documents with model.remove()
const deleteManyPerson=(namePerson)=>{
Person.remove({name: namePerson}, (err, person)=>{  
    err? console.log(err): console.log(person);
});
} 
deleteManyPerson("brown")
console.log("person deleted successufuly")
//Chain Search Query Helpers to Narrow Search Results
var querySearch = (foodSearch )=>{
    Person.find({ favoriteFoods: foodSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, person)=> {
        err? console.log(err): console.log(person)
    });
    };
   querySearch('Mozzarella cheese')
    


    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    
