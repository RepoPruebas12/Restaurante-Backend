import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('RESTAURANTE API')
    .setDescription(`
      `)
    .setVersion('1.0')
    .addBearerAuth({
      description: "Introduzca el token de la siguiente manera: 'Bearer {token generado}'",
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      type: 'http',
      in: 'header'
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// La Profile API de GBG Software Solution es un servicio diseñado para la gestión de perfiles digitales de usuarios. Su objetivo principal es centralizar y exponer información de identidad y datos de usuario de forma segura y estructurada, permitiendo a aplicaciones externas integrarse fácilmente.
// Está construida bajo el estándar OpenAPI 3.0, lo que asegura compatibilidad con múltiples herramientas de desarrollo y facilita la generación de clientes y documentación interactiva.
// - Principales características:
//   > Gestión de perfiles: creación, actualización, consulta y eliminación de información de usuario.
//   > Estandarización: utiliza especificaciones modernas (OAS 3.0) que garantizan interoperabilidad y escalabilidad.
//   > Integración sencilla: diseñada para integrarse con sistemas de autenticación, aplicaciones web y móviles.
//   > Enfoque en seguridad y consistencia: permite manejar datos personales con buenas prácticas de API.
// - Aplicación en un CV virtual:
//   > La API sirve como base para construir y mantener un perfil profesional en línea, actuando como backend para un CV digital. Permite que distintos sistemas consuman la información de forma estructurada, actualizable y accesible desde cualquier dispositivo.