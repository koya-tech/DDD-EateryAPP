## CRUD Expression Rule

| CRUD       | Function Name | Return |
| ---------- | ------------- | ------ |
| C (create) | Register      | void   |
| R (read)   | Get           | Value  |
| U (update) | Update        | void   |
| D (delete) | Delete        | void   |

## Directory Structure

<details><summary>Directory Structure (implementing now 25/01/12)</summary>

```sh
src
|-- ./__mocks__
|   |-- ./__mocks__/invalid.txt
|   |-- ./__mocks__/test-image-1.png
|   `-- ./__mocks__/test-image-2.png
|-- ./application
|   `-- ./application/eatery
|       |-- ./application/eatery/deleteEateryApplicationService
|       |   |-- ./application/eatery/deleteEateryApplicationService/DeleteEateryApplicationService.test.ts
|       |   `-- ./application/eatery/deleteEateryApplicationService/DeleteEateryApplicationService.ts
|       |-- ./application/eatery/eateryDto.ts
|       |-- ./application/eatery/getEateryApplicationService
|       |   |-- ./application/eatery/getEateryApplicationService/GetEateryApplicationService.test.ts
|       |   `-- ./application/eatery/getEateryApplicationService/GetEateryApplicationService.ts
|       |-- ./application/eatery/registerEateryApplicationService
|       |   |-- ./application/eatery/registerEateryApplicationService/RegisterEateryApplicationService.test.ts
|       |   `-- ./application/eatery/registerEateryApplicationService/RegisterEateryApplicationService.ts
|       |-- ./application/eatery/testEateryData.ts
|       `-- ./application/eatery/updateEateryApplicationService
|           |-- ./application/eatery/updateEateryApplicationService/UpdateEateryApplicationService.test.ts
|           `-- ./application/eatery/updateEateryApplicationService/UpdateEateryApplicationService.ts
|-- ./domain
|   |-- ./domain/entities
|   |   |-- ./domain/entities/Eatery.test.ts
|   |   `-- ./domain/entities/Eatery.ts
|   |-- ./domain/repository
|   |   `-- ./domain/repository/IEateryRepository.ts
|   |-- ./domain/service
|   |   |-- ./domain/service/EateryDomainService.test.ts
|   |   `-- ./domain/service/EateryDomainService.ts
|   `-- ./domain/valueObject
|       |-- ./domain/valueObject/AbstractValueObject.ts
|       `-- ./domain/valueObject/eatery
|           |-- ./domain/valueObject/eatery/EateryAddress.ts
|           |-- ./domain/valueObject/eatery/EateryAdress.test.ts
|           |-- ./domain/valueObject/eatery/EateryBusinessHours.test.ts
|           |-- ./domain/valueObject/eatery/EateryBusinessHours.ts
|           |-- ./domain/valueObject/eatery/EateryCategory.test.ts
|           |-- ./domain/valueObject/eatery/EateryCategory.ts
|           |-- ./domain/valueObject/eatery/EateryCountry.test.ts
|           |-- ./domain/valueObject/eatery/EateryCountry.ts
|           |-- ./domain/valueObject/eatery/EateryDescription.test.ts
|           |-- ./domain/valueObject/eatery/EateryDescription.ts
|           |-- ./domain/valueObject/eatery/EateryId.test.ts
|           |-- ./domain/valueObject/eatery/EateryId.ts
|           |-- ./domain/valueObject/eatery/EateryImages.test.ts
|           |-- ./domain/valueObject/eatery/EateryImages.ts
|           |-- ./domain/valueObject/eatery/EateryLocation.test.ts
|           |-- ./domain/valueObject/eatery/EateryLocation.ts
|           |-- ./domain/valueObject/eatery/EateryName.test.ts
|           |-- ./domain/valueObject/eatery/EateryName.ts
|           |-- ./domain/valueObject/eatery/EateryRating.test.ts
|           |-- ./domain/valueObject/eatery/EateryRating.ts
|           |-- ./domain/valueObject/eatery/EateryRegularHolidays.test.ts
|           `-- ./domain/valueObject/eatery/EateryRegularHolidays.ts
|-- ./external
|   `-- ./external/mongoose
|       `-- ./external/mongoose/model
|           `-- ./external/mongoose/model/EateryModel.ts
|-- ./infrastructure
|   |-- ./infrastructure/MongodbSetting.ts
|   |-- ./infrastructure/MongooseEateryRepository.test.ts
|   |-- ./infrastructure/MongooseEateryRepository.ts
|   `-- ./infrastructure/shared
|       `-- ./infrastructure/shared/InMemoryEateryRepository.ts
`-- ./presentation
    |-- ./presentation/apiTest
    |   `-- ./presentation/apiTest/userTest.http
    `-- ./presentation/express
        |-- ./presentation/express/index.ts
        `-- ./presentation/express/routes
            |-- ./presentation/express/routes/eatery
            |   |-- ./presentation/express/routes/eatery/eateryRouter.test.ts
            |   `-- ./presentation/express/routes/eatery/eateryRouter.ts
            `-- ./presentation/express/routes/index.ts

```

</details>
