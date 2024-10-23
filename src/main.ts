import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
// import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalPipes(new CustomValidationPipe());
    app.use(cookieParser());

    await app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

