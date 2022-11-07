import {MongoClient} from 'mongodb';

export default class Mongo {
    username: string = "username";
    password: string = "password";
    connection: Promise<MongoClient> = null

    getConnection(): Promise<MongoClient>{
        if(!this.connection)
            this.connection = MongoClient.connect(`mongodb://${this.username}:${this.password}@mongo:27017`);

        return this.connection;
    }
}
