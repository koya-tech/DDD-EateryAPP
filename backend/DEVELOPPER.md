## CRUD Expression Rule
| CRUD | Function Name | Return |
| ---- | ---- | ---- | 
| C (create) | Register | void |
| R (read)   | Get | Value |
| U (update) | Update | void |
| D (delete) | Delete | void |

## Directory Structure

<details><summary>Directory Structure (implementing now 24/10/03)</summary>

```sh
src
|-- application
|   |-- eatery
|   |   |-- deleteEateryApplicationService
|   |   |   |-- DeleteEateryApplicationService.test.ts
|   |   |   `-- DeleteEateryApplicationService.ts
|   |   |-- eateryDto.ts
|   |   |-- registerEateryApplicationService
|   |   |   |-- RegisterEateryApplicationService.test.ts
|   |   |   `-- RegisterEateryApplicationService.ts
|   |   |-- testEateryData.ts
|   |   `-- updateEateryApplicationService
|   |       |-- UpdateEateryApplicationService.test.ts
|   |       `-- UpdateEateryApplicationService.ts
|   |-- eateryReview
|   |   |-- deleteEateryReviewApplicationService
|   |   |   |-- DeleteEateryReviewApplicationService.test.ts
|   |   |   `-- DeleteEateryReviewApplicationService.ts
|   |   |-- eateryReviewDto.ts
|   |   |-- registerEateryReviewApplicationService
|   |   |   |-- RegisterEateryReviewApplicationService.test.ts
|   |   |   `-- RegisterEateryReviewApplicationService.ts
|   |   |-- testEateryReviewData.ts
|   |   `-- updateEateryReviewApplicationService
|   |       |-- UpdateEateryReviewApplicationService.test.ts
|   |       `-- UpdateEateryReviewApplicationService.ts
|   `-- user
|       |-- deleteUserApplicationService
|       |   |-- DeleteUserApplicationService.test.ts
|       |   `-- DeleteUserApplicationService.ts
|       |-- getUserApplicationService
|       |   `-- GetUserApplicationService.ts
|       |-- registerUserApplicationService
|       |   |-- RegisterUserApplicationService.test.ts
|       |   `-- RegisterUserApplicationService.ts
|       |-- testUserData.ts
|       |-- updateUserApplicationService
|       |   |-- UpdateUserApplicationService.test.ts
|       |   `-- UpdateUserApplicationService.ts
|       `-- userDto.ts
|-- domain
|   |-- entities
|   |   |-- Eatery.test.ts
|   |   |-- Eatery.ts
|   |   |-- EateryReview.test.ts
|   |   |-- EateryReview.ts
|   |   |-- User.test.ts
|   |   `-- User.ts
|   |-- repository
|   |   |-- IEateryRepository.ts
|   |   |-- IEateryReviewRepository.ts
|   |   `-- IUserRepository.ts
|   |-- service
|   |   |-- EateryDomainService.test.ts
|   |   |-- EateryDomainService.ts
|   |   |-- EateryReviewDomainService.test.ts
|   |   |-- EateryReviewDomainService.ts
|   |   |-- UserDomainService.test.ts
|   |   `-- UserDomainService.ts
|   `-- valueObject
|       |-- AbstractValueObject.ts
|       |-- eatery
|       |   |-- EateryAddress.ts
|       |   |-- EateryAdress.test.ts
|       |   |-- EateryBusinessHours.test.ts
|       |   |-- EateryBusinessHours.ts
|       |   |-- EateryCategory.test.ts
|       |   |-- EateryCategory.ts
|       |   |-- EateryCountry.test.ts
|       |   |-- EateryCountry.ts
|       |   |-- EateryDescription.test.ts
|       |   |-- EateryDescription.ts
|       |   |-- EateryId.test.ts
|       |   |-- EateryId.ts
|       |   |-- EateryImages.test.ts
|       |   |-- EateryImages.ts
|       |   |-- EateryLocation.test.ts
|       |   |-- EateryLocation.ts
|       |   |-- EateryName.test.ts
|       |   |-- EateryName.ts
|       |   |-- EateryRating.test.ts
|       |   |-- EateryRating.ts
|       |   |-- EateryRegularHolidays.test.ts
|       |   `-- EateryRegularHolidays.ts
|       |-- eateryReview
|       |   |-- EateryReviewComment.test.ts
|       |   |-- EateryReviewComment.ts
|       |   |-- EateryReviewId.test.ts
|       |   |-- EateryReviewId.ts
|       |   |-- EateryReviewRating.test.ts
|       |   `-- EateryReviewRating.ts
|       `-- user
|           |-- UserId.test.ts
|           |-- UserId.ts
|           |-- UserImage.test.ts
|           |-- UserImage.ts
|           |-- UserName.test.ts
|           |-- UserName.ts
|           |-- UserPassword.test.ts
|           `-- UserPassword.ts
|-- external
|   `-- mongoose
|       `-- model
|           |-- EateryModel.ts
|           |-- EateryReviewModel.ts
|           `-- UserModel.ts
|-- index.ts
|-- infrastructure
|   |-- MongooseEateryRepository.test.ts
|   |-- MongooseEateryRepository.ts
|   |-- MongooseEateryReviewRepository.test.ts
|   |-- MongooseEateryReviewRepository.ts
|   |-- MongooseUserRepository.test.ts
|   |-- MongooseUserRepository.ts
|   `-- shared
|       |-- InMemoryEateryRepository.ts
|       |-- InMemoryEateryReviewRepository.ts
|       `-- InMemoryUserRepository.ts
`-- presentation
    `-- express

```

</details>

<br />

<details><summary>Directory Structure (at the planning * possible to change)</summary>

/src
  /domain
    /entities
      User.ts            // ユーザーエンティティ（名前、メールアドレス、パスワードなどの属性を持つ）
      Eatery.ts      // 飲食店エンティティ（名前、住所、カテゴリなどの属性を持つ）
      EateryReview.ts          // レビューエンティティ（レビュー内容、評価、投稿者などの属性を持つ）
    /valueObjects
      Email.ts           // メール値オブジェクト（メールアドレスのバリデーションなど）
      Rating.ts          // 評価値オブジェクト（評価スコアの範囲など）
    /repositories
      IUserRepository.ts  // ユーザーリポジトリインターフェース
      IEateryRepository.ts  // 飲食店リポジトリインターフェース
      IReviewRepository.ts  // レビューリポジトリインターフェース
    /services
      UserService.ts      // ユーザードメインサービス
      EateryService.ts // 飲食店ドメインサービス
    /events
      EateryAddedEvent.ts // 飲食店追加イベント
      ReviewAddedEvent.ts     // レビュー追加イベント

アプリケーション層
  /application
    /services
      UserApplicationService.ts   // ユーザーアプリケーションサービス
      EateryApplicationService.ts // 飲食店アプリケーションサービス
      ReviewApplicationService.ts    // レビューアプリケーションサービス
    /dto
      UserDTO.ts                  // ユーザーデータ転送オブジェクト
      EateryDTO.ts            // 飲食店データ転送オブジェクト
      ReviewDTO.ts                // レビューデータ転送オブジェクト
    /commands
      AddEateryCommand.ts     // 飲食店追加コマンド
      AddReviewCommand.ts         // レビュー追加コマンド
    /queries
      GetEateryQuery.ts       // 飲食店取得クエリ
      GetUserQuery.ts             // ユーザー取得クエリ
    /handlers
      AddEateryHandler.ts     // 飲食店追加ハンドラ
      AddReviewHandler.ts         // レビュー追加ハンドラ

インフラストラクチャ層
  /infrastructure
    /repositories
      UserRepository.ts           // ユーザーリポジトリの具体的な実装
      EateryRepository.ts     // 飲食店リポジトリの具体的な実装
      ReviewRepository.ts         // レビューリポジトリの具体的な実装
    /persistence
      DatabaseConnection.ts       // データベース接続設定
    /api
      ExternalEateryService.ts // 外部飲食店サービス
    /config
      AppConfig.ts                // アプリケーション設定
    /services
      NotificationService.ts      // 通知サービス（例：レビュー追加通知）

インターフェース層（プレゼンテーション層）
  /interface
    /controllers
      UserController.ts           // ユーザーコントローラー
      EateryController.ts     // 飲食店コントローラー
      ReviewController.ts         // レビューコントローラー
    /views
      EateryView.ts           // 飲食店ビュー
      ReviewView.ts               // レビュービュー
    /dto
      UserRequestDTO.ts           // ユーザーリクエストDTO
      UserResponseDTO.ts          // ユーザーレスポンスDTO
      EateryRequestDTO.ts     // 飲食店リクエストDTO
      EateryResponseDTO.ts    // 飲食店レスポンスDTO
      ReviewRequestDTO.ts         // レビューリクエストDTO
      ReviewResponseDTO.ts        // レビューレスポンスDTO

共通層
  /shared
    /utils
      DateUtils.ts                // 日付ユーティリティ
      ValidationUtils.ts          // バリデーションユーティリティ
    /exceptions
      NotFoundException.ts        // 例外クラス（エンティティが見つからない場合）
      ValidationException.ts      // 例外クラス（バリデーションエラーの場合）
    /constants
      AppConstants.ts             // アプリケーション定数

</details>
