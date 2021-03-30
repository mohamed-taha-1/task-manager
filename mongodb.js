//CRUD create read update delation 


const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient


const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager' //name for your  database 



//connect to database is not syncronus operation ,  it is asyncrnous  operation 

MongoClient.connect( connectionURL  ,{  useNewUrlParser:true ,useUnifiedTopology: true  },  ( error  , client  )=>{
 
    if(error){
       return    console.log('Unabel to connect to database!')
    }

    // console.log('Connected correctly to database ')

      const db = client.db(databaseName)  // refrence to your database 
      
      // name of collection you try to mainpulate 
    //  insert one  user 
      db.collection('users').insertOne({
        
        name:'moaaz',
         age:'32'
      
        },( error , results )=>{

            if(error){
                return console.log('Unabel to insert!')
            }



            console.log(results.ops) // ops : array of all documents inserted by insertOnce
      })  



    //    insert 2 users at the same time 

    db.collection('users').insertMany([
        {
            name:'mahmoud',
            age:28
        },
        {
            name:'ahmed',
            age:29
        }
    ], (error , result)=>{

        if(error){
            return console.log('Unabel to Insert correctly!')
        }

        console.log(result.ops)


    })


    // search  function  

    db.collection('users').findOne({name:'mohamed'},(error , result)=>{
        if(error){
            return console.log('unabel to find this user!')
        }

        console.log(result)
    })





//    update function

    const updatePromise=db.collection('users').updateOne(
        
    {
        name:'mohamed'
    }   , 
    {
 
      $set:{
                name:'ahmed'
            }
    })

    updatePromise.then((result)=>{

        console.log(result)

    }).catch((e)=>{
        console.log(e)
    })

  // delete function 


  db.collection('users').deleteMany({
      age:29
  }).then(result =>{

    console.log(result)
  }).catch(e=>{
      console.log(e)
  })




})