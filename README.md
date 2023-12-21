<h1 align="center">Study</h1>
<p align="center">
   <img src='https://study-image-storage.s3.sa-east-1.amazonaws.com/logo-1702954994027.png' alt='image' style='self-center' />
</p>

> An app to gamify your study time and compete with friends.

# 📝 Description
> This platform was built to be an incentive for myself to study. Adding dopamine into the process.

# 👨🏽‍💻 Tech that I've used:
- [NextJS](https://nextjs.org/): The client side is fully build with nextjs using app router to ensure we have a great user experience using react's server components and a great SEO.
- [shadcn/ui](https://ui.shadcn.com/): An amazing ui kit to speed up the process of developing the MVP.
- [Firebase](https://console.firebase.google.com/): A great way to keep all the project data in a safe enviroment without great costs and ensure, together with the Next's app router, that we don't need immediately an back-end.
- [Clerk](https://clerk.com/): A platform to manage all the authentication process in the safest and easiest way.
- [Amazon S3](https://aws.amazon.com/s3/): Used the bucket to store all the images the user can upload inside the application.

# 🔧 Installation
> To install and run the project you will need to follow this steps:

1. Clone the repository
   ```bash
    git clone <repository>
    cd <repository>
   ```

2. Install the dependencies
   ```bash
    pnpm install
   ```
3. Replace the `.env.local` file accordingly with the `.env.example` file.

3. Run the project
   ```bash
    pnpm run dev
   ```

# Screens

### Home screen:
> Here will be listed all the challenges you participate, with a sidebar with your user's basic info and your progress on each challege,
> ![home page](/public/mock_home.png)

### Challenge screen:
> Here will be displayed all the events (studies) the specific challenge members had uploaded. Listed and sorted by date, with the time it happened.

> Also, we have a small leaderboard with the challenge's current leader, your points and the days remaining on that challenge
> ![challenge page](/public/mock_challenge.png)

### Event screen:
> Here will be displayed the details of an event. With the date it occured, the duration and some informations (image, title and description).

> On this page, you can also add comments and share your thoughts on the event!
> ![event page](/public/mock_event.png)

# 👩🏽‍🚀 Functionalities
> Over the button on the bottom-right corner, you can add a challenge, an event and join a challenge.

### Add Event:
> ![add event](/public/mock_add_event.png)

### Add Challenge:
> ![add challenge](/public/mock_add_challenge.png)

### Join Challenge:
> ![join challenge](/public/mock_join_challenge.png)

# 🗺️ Schemas
> We have 3 different entities on this project, `User`, `Challenge` and `Event`

## User:

| Fields      | Type       | Description
| :---------- | :--------- | :----------------
| id          | `string`   | An uuid string.
| username    | `string`   | A text string with the user's username.
| avatar      | `string`   | An URL to the user image (stored and managed by clerk).

### Example

```TypeScript
   const user = {
      id: '4d734fe4-b80a-4586-817a-977b3f311f3e',
      username: 'gabrielccarvalho',
      avatar: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJaU01UOVhmYlExWVpoWDdNVGNka09UVGczdCJ9'
   }
```

## Challenge:

| Fields            | Type            | Description
| :----------       | :---------      | :----------------
| id                | `string`        | An uuid string.
| title             | `string`        | A text string with the challenge's title.
| description       | `string`        | A text string with the challenge's description.
| thumbnail         | `string`        | An URL to the challenge image (stored in the Amazon S3 bucket).
| start_date        | `Date`          | The starting date of the challenge.
| end_date          | `Date`          | The deadline of the challenge.
| members           | `string[]`      | An array of users id that are on the challenge.
| events            | `Event[]`       | An array of events on this challenge.
| leaderBoard       | `LeaderBoard[]` | An array of users and total durations.
| duration          | `number`        | The duration of the challenge.
| daysIntoChallenge | `number`        | How many days into the challenge.
| progress          | `number`        | The progress of the challenge in percentage.


### Example

```TypeScript
   const challenge = {
      id: '4d734fe4-b80a-4586-817a-977b3f311f3e',
      title: 'Challenge #01',
      description: 'Quick description of the challenge',
      thumbnail: '',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-31-12'),
      members: ['user_2ZjsdKSdH423Ksas'],
      events: [
         { ... },
         { ... },
      ],
      leaderBoard: {
         user: ...User,
         duration: 0
      }
      duration: 365,
      daysIntoChallenge: 36,
      progress: 0.10,
   }
```

## Event:

| Fields      | Type       | Description
| :---------- | :--------- | :----------------
| id          | `string`   | An uuid string.
| title       | `string`   | A text string with the event's title.
| description | `string`   | A text string with the event's description.
| image       | `string`   | An URL to the event image (stored in the Amazon S3 bucket).
| date        | `Date`     | The date of posting the event.
| duration    | `number`   | The duration in minutes of the event.
| User        | `User`     | An User object.
| comments    | `Comment[]`| An array of comments on this event.


### Example

```TypeScript
   const event = {
      id: '4d734fe4-b80a-4586-817a-977b3f311f3e',
      title: 'A nice study',
      description: 'Quick study on server components',
      image: '',
      date: new Date(),
      duration: 60,
      User: {
         ...User
      },
      comments: [
         {
            id: '147abb22-5add-48f5-a8ee-3791d8bd7a3c'
            content: 'haha its a comment!',
            created_at: new Date(),
            user: {
               ...User
            }
         }
      ]
   }
```

# Contribution
If you wish to contribute to this project, please follow the steps below:

1. Fork the repository.

2. Create a new branch:
   ```bash
      git checkout -b my-feature
   ```

3. Make the necessary changes and commit your code.

4. Push to the branch:
   ```bash
      git push origin my-feature
   ```

5. Open a pull request on the original repository.

# Disclaimer ⚠️
> This project is still under development and it was created for study pourposes, so it will suffer constant changes and probably break changes very often.
Do not use it as a production-ready software!
