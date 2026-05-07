---
title: "Coding Guidelines"
description: "Useful points while writing code"
tags: ["coding", "guideline"]
weight: 1
enable_twitter_meta: true
image: https://www.improvutopia.com/wp-content/uploads/2016/02/empty.png.jpeg
enable_opengraph_meta: true
---


## Backend

### Maintainability

- Customer and User scopes should be checked at controller level and in a generic fashion
  - Reason: It becomes easier to maintain these checks at one place
- Configure HTTP Clients like request timeout, ssl etc
  - Reason: It helps reduce response time incase our services are busy
- Always close resources, prefferably in `finally` block
  - Reason: It frees the system resource and app performs optimally
- Inter-app communication should happen via `commons-services`
  - Reason: It removes code duplication when same set of APIs are being using across multiple apps
- All service methods should return `responseObject` with a `status` instead of just data
  - Reason:
    - Having our own status codes helps us give peopleHum specific status codes instead of generic `HTTP` status codes
    - Using peopleHum specific status codes we can pin point an error quickly by just looking at status code
- API path should not have `-` in it(bcoz of UI standard) and also camel case should be avoided ????
- API path should always have hierarchy i.e. `/customer/{customerId}/user/{userId}` etc
  - Reason: It gives more information at glance and we know exactly what resource was being accessed
- APIs should be versioned
  - Reason: Versioned APIs provide us a compatibility layer when we try to introduce breaking changes
- Avoid writing God class/functions (Too big class or function)
  - Reason:
    - One class should know too much
    - Abstraction, Responsibility should be divided into multiple sub objects
    - It becomes hard to debug or maintain big functions, write small functions 20 lines max
    - It breaks modularity, Bigger functions often perform multiple tasks

#### Data Handling

- Try to use standard `JPA` repository interface where ever possible
  - Reason:
    - Provides a standard approach across all our apps
    - `JPA` repository interface can provide us most of the data from database, we hardly need to connect using `JDBC` directly
    - Follow `JPA` > `JPQL` > `Native Query` > `JDBC` for better maintainability
- All `JPA` associations should be `LAZY` fetch unless required by the request context
  - Reason: Fetching only required data reduces load on Database
- In SQL query to get distinct ids, prefer `group by` > `distinct` > `Set`  ????
- Avoid using dynamic query i.e. creating query based on request
  - Reason: It can lead to SQL injection problems
- When using JDBC template, always use namedParams
  - Reason: It prevents SQL injection in JDBC queries
- Try to make Executors/Schedulers capable of running in multiple nodes simultaneouly
  - Reason: It helps us scaling them horizontally
- Don't use instance level variables to hold current request/execution data
  - Reason: Holding current request/execution data in instance level variables makes multithreading difficult and can lead to untraceable bugs or data corruption
- Take care of transaction boundary after thinking about it. ????
- Update to a set of table should happen in specific order at all the places. e.g. method A is updates in order Table1, Table2, and Table3 then all other method must update these table in the same order only
  - Reason: It can lead to deadlock if we don't follow the update order
- Avoid doing DB calls in loop
  - Reason: It leads to too many calls to Database and makes Database busy, instead choose a balanced approach between eager fetch and lazy fetch
- Create index for tables whenever required or try to use existing indexes
  - Reason: It speeds up the DB queries
- All types of constraints should have a prefix to indicate type like unq for UNIQUE, idx for INDEX, fk for FOREIN KEY,  etc
  - Reason: It increases the readability of query/table schema
- Create Database constraints whenever required
  - Reason: It delegates data validation to Database and helps to maintain data integrity
- Use `PageImpl` when dealing with Paged responses
  - Reason: `PageImpl` has much more options and is a spring standard
- Dates should be stored in epoch timestamp
  - Reason: It provides us flexibilty to show different formats and write better queries
- Controller should not have application logic but can have request validation logic
  - Reason: Adding application logic to controller makes it complex
- Validate incoming requests before processing
  - Reason:
    - The API can be hit via other tools like postman, jmeter etc and may not have all the required parameters
    - It reduces attack surface
- Don't add too many nested documents in MongoDB
  - Reason:
    - Its becomes hard to query nested documents
    - We loose pagination support in nested documents
- Don't cahce huge data in Redis
  - Reason:
    - Redis is a shared resource
    - Storing huge data in Redis can cause resource crunch on Redis

#### peopleHum specific

- Try using basic usermodel and if necessary get full usermodel
  - Reason: Basic `UserModel` fetches less data from Datasource
- Make use of roleids and accessrights coming in headers via apiaccess anotation - DO NOT make api calls to onboarding for this
  - Reason: RoleId and AccessRights are already fetched while validating incoming request, fetching it again introduces more load
- Always use customerId from url path while fetching the data instead of loggedInCustomerId/SignedInCustomerId
  - Reason: This is to support RESELLER concept in future
- Always use master customerid or master user id as system user. should come from onboarding and be cached - DO NOT call during app start

#### Integrations

- Always create Internal Model objects vs External Model objects when dealing with any kind of integration
  - Reason: It helps maintain forward and backward compatibility
- Add Validations in External Model objects
  - Reason: It helps us identify integration problems upfront instead of getting an exception later in the flow
- Use `@JsonInclude(JsonInclude.Include.NON_EMPTY)` for every External Model object to avoid sending empty attribute except for response object
  - Reason: It gives a standard response in all the scenarios and its easier for `UI`/`Mobile` and `3rd Party` to integrate standard response
- Throw an exception whenever you encounter an error
  - Reason:
    - It helps in keeping your code clean, reduces checks in other modules using your module
    - Traverse the exception incase you are catching an exception
- Database Abstraction: One service should not connect to other service's database
  - Reason:
    - It helps us in maintaing Abstraction and Segregate responsibility
    - Database is owned by a service and other service accessing this breaks Abstraction and It will become hard to modify any Schema or Database in future
- When adding new 3rd party library dependency, check the license agreement and get it reviewed by your team lead before using it
  - Reason: Few of the opensource libraries don't allow commercial use, for e.g. libraries with `GPL-v3` license
- Always consider size of 3rd party libraries while integrating, exclude any transitive dependency which is not required
  - Reason: 3rd party libraries will increase our artifact size and it can lead to slow deployments and disk space problems
- Add Entitlement and Access check on External APIs
  - Reason: It provides us with central access control on `AppGateway` or `auth-proxy`

### Readability

#### Logs

- Log statements should be meaningful and readable
  - Reason: It is helpful for others debugging your apps when you are unavailable
- Log statements should have customer id and user id where ever possible
  - Reason: It provides tracability for requests
- Request body / Java Model Objects should be printed only in debug/trace Logs
  - Reason: It helps declutter your log files
- Sensitive information like Password or User's PII (Person Identity Infromation) should not be logged
  - Reason: Log files are synced to GrayLog and this Sensitive information could get exposed to anyone having access to GrayLog
- New apps should have loglevel as `INFO` and should be updated to `ERROR` after 2 weeks of stability time period
  - Reason: Intially it would help to stablize the app and `INFO` logs would not be required after stablizing the logs and we don't want to log unnessary information when its not required
- Add Loggers for Commons SDK
  - Reason: The logging library we use provides us with granular controls and we can enable logging for select packages. Generaly we don't enable logging on all the packages to save space and we have to explicity add commons SDK for logging.

#### Naming convention

- Spring
  - `@Qualifier`/`@Bean`: Always try to use fully qualified package/bean name like `com.bikram990.restcontroller.testcontroller` instead of `TestController`
    - Reason: It provides us more tracability in case we face any issue with `Bean`
  - `@Autowired`: Always try to use a `@Qualifier` along with `@Autowired` annotation
    - Reason:
      - It provides us more tracability in case we face any issue with `Bean`
      - It speeds up Spring's Dependency resolution and decreases app start up time
- Swagger
  - Create a Swagger Configuration for your app
    - Reason:
      - It becomes easier to share APIs with Customers
      - It becomes easier to import it as separate collection in Postman
  - `@ParameterObject`: Mark pageable objects in your REST apis with `@ParameterObject` annotation
    - Reason: It helps swagger generate proper names for pageable query parameters
- Lombok
  - Annotate Model Objects with `@Data` annotation instead of declaring Setters and Getters
    - Reason: Less code to maintain
  - Try to add Granular Setters and Getters when dealing with non Model objects
    - Reason: It can provide us more abstraction and encapsulation
  - Annotate all `@Service`, `@Controller`, `@RestController` etc with `@Slf4j` to add logger and log all the incoming requests
    - Reason: We need to write less code and it becomes the standard everywhere
- Variable/Method/Class names should be self explanatory, for e.g.:
  - Don't use `i`/`j`/`k` etc for loops, give variables proper names, indicating content of the variable
    - Reason: It is easier to understand the code. You can guess a lot of things by just looking at name
  - Don't use `List` at end of variable names when creating an array or list of objects, instead try to use plural vs singular
    - Reason: It it easier to read the code
  - Don't use `Model` word when declaring a Model object, instead create them in a `model` package
    - Reason: There is no need to tell a Model that it is a Model, Java is OOP language and the code should look like as if objects are integrating instead of Models
  - Don't use generic function names when functions are performing a specific task, like function to fetch user for a given team should be named like `fetchUsersInTeamForCustomer` instead of `fetchUsers`
    - Reason: It makes easier to read the code, you don't need to see the implementation of the Method to see what it does

### Database

- All schema changes should be executed via flyway
  - Reason: It gives us flexibilty to bring up a new env with less effort
- All seed data should be added via flyway
  - Reason: It gives us flexibilty to bring up a new env with less effort
- Fix the schema table in case of any failure and Don't push to QA/Prod without testing flyway scripts on Dev
  - Reason: Flyway will fail if there is a change in old scripts

## Frontend

### Localization

- All localization strings should prefixed with `PH_` followed by short name of ur module e.g. `ONBOARD` or `O2O`
  - Reason:
    - It helps us in tracing the use of a text
    - In future we can support custom texts instead of peopleHum provided text

## Mobile

### iOS

### Android

## QA

## GIT

### Commit

- Commit should have meaningful message
- Commit should have the ticket number for easy tracking
- Commits should have proper name and office email id
  - To set name you can use `git config --global user.name "<Your Name>"` command
  - To set email you can use `git config --global user.email "<Office Email>"` command

### Merge Request

- Merge Request should have ticket number in summary
- Merge Request should have a meaningful description describing the changes in the Merge Request

### Code Review

- Mark the review comments as resolved after resolving them
- Both for the reviewer and the reviewee, please have the courtesy to complete a conversation
  - If something has been discussed offline, put in a note with a quick summary and then resolve the discussion
  - Do appreciate that the other person may not be on the same wavelength as you are or may have a different thought process
  - Please respect each other and do the due diligence on explaining your point of view.
