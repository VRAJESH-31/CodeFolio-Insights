import UserModel from "../../models/user.model.js"
import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker';
import { connectToDB } from "../db.js";

const createDummyUser = async () => {
    try {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const rawPassword = faker.internet.password({ length: 12, memorable: false, pattern: /\w/ });

        return await UserModel.create({
            name : faker.internet.username({firstName, lastName}).toLowerCase(),
            email: faker.internet.email({ firstName, lastName, provider: 'example.com' }),
            password: await bcrypt.hash(rawPassword, await bcrypt.genSalt(10))
        });
    } catch (error){
        console.log("Error occurred while creating dummy user:", error);
        console.log(error.stack);
        return Promise.resolve(null);
    }
}

const createDummyUsers = async () => {

    // process.argv[0] = 'node'
    // process.argv[1] = 'backend/seed.js'
    // process.argv[2] = The first argument listed in npm script ($1 here)
    // process.argv[3] = The actual value for first argument passed to script
    
    const usersCount = parseInt(process.argv[3], 10);

    if (isNaN(usersCount) || usersCount<=0){
        console.log("Please provide a valid number of users to create.");
        process.exit(1);
    }

    const createUsersPromise = [];
    for (let i=0; i<usersCount; i++){
        createUsersPromise.push(createDummyUser());
    }

    try {
        console.log(`Starting to create ${usersCount} dummy users...`);
        const createdUsers = await Promise.all(createUsersPromise);
        console.log(`Successfully created ${createdUsers.length} dummy users.`);
    } catch (error){
        console.log("Error creating one or more dummy users:", error);
    }
}

connectToDB()
.then(async ()=>{
    await createDummyUsers();
})
.catch((error)=>{
    console.log("Error occurred!");
})