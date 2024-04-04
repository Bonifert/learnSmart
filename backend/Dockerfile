FROM maven:3.9.6-eclipse-temurin-17 as build-phase

COPY src /home/app/src
COPY pom.xml /home/app

RUN mvn -f home/app/pom.xml clean package

FROM eclipse-temurin:17-jre-jammy

COPY --from=build-phase /home/app/target/*.jar /usr/local/lib/app.jar

ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]