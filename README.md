# Roomies

Find Roommates Tinder Style!
## Inspiration

Being foreign student to UTD,  'housing and roommates' was the biggest worry me and my parents had. It is not easy to find students with similar interests to settle down and find room with you. Although there were some WhatsApp groups and spreadsheets, it not really a  **Smart and Efficient Way** to find roommates. Here is our solution to the problem for current and future students, '**Roomies**'!

## What it does

After you register using email, Roomies will ask you following questions about yourself:
- Gender 👦👧
- Age group 🔞
- Country 🗺
- University 🏫
- Starting semester 📅
- Course 💻
- Food preferences 🍜🍟
- Smoking habits 🚬
- Drinking habits 🍷
- Cooking experience 👩‍🍳

All options are framed such that information can reflect actual personality of a user.  Then we ask the user the what they expect in their roommate, again using series of question similar to above topics. Along with the usual option, we also provide option of 'Don't Care' which means roommate can has any option for that particular question.

Then we used a matching method (Explained in detail in the below section), to get score for each pair of users using the collected information and rank them to suggest users the best options possible.

### The Roommate Matching Method

Say there are 3 users, let's consider only food as a question with 3 choices for simplicity - Veg, Non-Veg and Don't Care. The first value for each user denote what they is and second value denote what they expect from roommate.

- **User 1**: Non-Veg, Don't Care 
- **User 2**: Veg, Veg 
- **User 3**: Non-Veg, Non-Veg

Now let's see the scores:
- **User 1 and User 2 **- 50%. User 1's preference of 'Don't Care' is satisfied but User 2's 'Veg' not.
- **User 2 and User 3 **- 0%. Neither users' preferences are satisfied.
- **User 3 and User 1 ** - 100%. Both users' preferences are satisfied.

We calculate this scores for each parameter, and take the average of them to decide the final score.

## How we built it

We used following tools and technologies to build the 'Roomies':
-  **JavaScript** - The easiest programming language ⁉
-  **CockroachDB** -  Scalable cloud database to store all the application data
-  **Node** - JavaScript runtime
-  **Express** - Backend node framework for developing APIs
-  **React** - Frontend framework for UI developement
-  **Redux** - State management tool
-  **JsonWebToken** - JSON-based web tokens for user authentication
-  **bcryptjs** - Hashing passwords before saving in database
-  **GitHub** - Version management
-  **VS Code** - Entire project development
-  **Heroku** - Project hosting and automatic deploys

## Challenges we ran into

- CockroachDB was not easy to integrate with Express, Node and React stack!
- Lack of motivation due to virtual setting!

## Accomplishments that we're proud of

 - Of course, able to complete a project, that too in a virtual setting! Means a lot!
- Was able to implement about 95% things, I thought at start!

## What we learned

- For my past few projects, I was working on MERN stack, so got to try CockroachDB. At start, it looked very different to integrate but after some trial and error, it was ready to go!

## What's next for Roomies

- Add some questions to understand the user to understand his sleep and study patterns, introvert/ extrovert, etc.
- A lot of scope to improve UI and designs!
- Improve the user matching algorithm using machine learning after recording user responses.