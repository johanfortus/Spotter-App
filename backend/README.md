# Spotter: Backend

## Directory Structure

```zsh
.
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── config
    ├── controllers
    ├── data
    ├── middleware
    ├── models
    ├── routes
    ├── services
    ├── utils
    └── server.js
```

> **WARNING**: The 'data' directory is for local db files and is ignored by source control

## Database Architecture
```mermaid
erDiagram
    User ||--|{ DirectMessage : sends
    User ||--o{ TimeSlot : available
    User ||--o{ Gym : goesTo
    User ||--|| User : match
    User ||--o{ UserReport : submits
    User ||--o{ Community : memberOf
    Meetup ||--|| TimeSlot : meetupTime
    Meetup ||--|| Workout : spotting
    Workout ||--o{ WorkoutEquipment : requiredEquipment
    
    User {
        int userID PK
        text username
        text pwd
        text phoneNumber
        text firstName
        text lastName
        location usrLocation
        int fitnessLevel
        text trainerBadge
    }
    TimeSlot {
        int slotID PK
        datetime startTStamp
        datetime endTStamp
    }
    CommunityType {
        int typeID PK
        text typeName
        text typeDescription
    }
    DirectMessage {
        int msgID PK
        string tStamp
        string msg
        number senderID FK
        number receiverID FK
    }
    Match {
        int spotterID FK
        int spottedID FK
    }
    Workout {
        int workoutID PK
        text workoutName
        text workoutDescription
    }
    WorkoutEquipment {
        int equipmentID PK
        text equipmentName
        text equipmentDescription
    }
    RequiredEquipment {
        int workoutID FK
        int equipmentID FK
    }
    Meetup {
        int meetupID PK
        text meetupLocation
        int meetupTime FK
    }
    Availability {
        int userID FK
        int tSlotID FK
    }
    Community {
        int cID PK
        text cName
        int typeID FK
        text cLocation
        int numMembers
        bool isPublic
    }
    MemberOf {
        int userID FK
        int communityID FK
    }
    GoesTo {
        int userID FK
        int gymID FK
    }
    Gym {
        int gymID PK
        text gymName
        location gymLocation
        text gymAddress
        text gymURL
    }
    UserReport {
        int reportID PK
        int userID FK
        int reporterID FK
        text reportDetail
    }
    UserReportType {
        int reportTypeID PK
        text reportTypeName
        text reportTypeDescription
    }
    Blocked {
        int userID FK
        int blockedBy FK
    }
```

## Database Setup

Initialize the backend if you have not already

```
$ cd backend
$ npm install
```

Generate or download your JWT secret
```
$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
$ 9b8add1489bab5c885752a4326bb94c126c619f56945d0c60c1ff1f0341e9658
```

Create an environment variable file (.env) in the 'backend' directory
```
$ touch .env
```

Add variables to your .env file with a text editor
```text
# Nodejs
NODE_ENV=development

# Cryptography
JWT_SECRET=9b8add1489bab5c885752a4326bb94c126c619f56945d0c60c1ff1f0341e9658 # This is just an example secret

# Database Stuff
DB_MODE=local # Options: local
DATA_PATH=data
LOCAL_DB_PATH=data/local.db
LOCAL_DB_USERNAME=test
LOCAL_DB_PASSWORD=somethingSecure*
```

You should also create an environment variable specifically for testing called test.env in /backend
```
$ touch test.env
```

The variable names and values can be mostly the same, but you might want your local db path to be different for testing
```text
LOCAL_DB_PATH=data/test.local.db
```

Run the NPM command to initialize the local sqlite environment

```
$ npm run setup-local-db
```

To reset your local database environment run this NPM command

```
$ npm run clean-local-db
```