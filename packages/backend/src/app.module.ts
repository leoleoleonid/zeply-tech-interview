import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
        // TODO add config validation
        // validationSchema: Joi.object({ ... }),
    }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
