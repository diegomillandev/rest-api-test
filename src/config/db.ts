import { Sequelize } from 'sequelize-typescript'
import { DATABASE_URL } from '../constants/env'
import colors from 'colors';

export const db = new Sequelize(DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
})

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue('Database connected'));
    } catch (error) {
        // console.log(error);
        console.log(colors.red('Database connection error'));
    }
}