if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const polka = require("polka");
const { json } = require("body-parser");

const jsonSendMw = require("./middlewares/jsonSend");
require("./db");
const Team = require("./models/Team");
const Player = require("./models/Player");
const Match = require("./models/Match");
const Ball = require("./models/Ball");

const port = process.env.PORT || 5000;
const app = polka();

app.use(json(), jsonSendMw);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) =>
  res.end(
    `
  <h1>Available Apis</h1>
    <ul>
      <li><a href="/dreamteam">Dream Team</a></li>
      <li><a href="/boundaries">Boundaries</a></li>
      <li><a href="/leaderboard">Leaderboard</a></li>
    </ul>
  `
  )
);

app.get('/players', async (req, res) => {
  const { q } = req.query;
  const players = await Player.find({
    Player_Name: {
      $regex: q,
      $options: 'i'
    }
  }).select('Player_Id Player_Name');
  res.json({ message: "success", data: players });
})

app.get("/dreamteam", async (req, res) => {
  const p1 = Ball.aggregate([
    {
      $group: {
        _id: "$Striker_Id",
        totalRuns: { $sum: "$Batsman_Scored" }
      }
    },
    {
      $lookup: {
        from: "players",
        localField: "_id",
        foreignField: "Player_Id",
        as: "player"
      }
    }
  ])
    .sort("-totalRuns")
    .limit(5);

  const p2 = Ball.aggregate([
    {
      $match: {
        Player_dissimal_Id: { $ne: "" }
      }
    },
    {
      $group: {
        _id: "$Bowler_Id",
        wickets: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "players",
        localField: "_id",
        foreignField: "Player_Id",
        as: "player"
      }
    }
  ])
    .sort("-wickets")
    .limit(4);

  const team = {
    batsmen: await p1,
    ballers: await p2
  };

  res.json({ message: "success", data: team });
});

app.get("/boundaries", async (req, res) => {
  const p1 = Ball.find({
    Batsman_Scored: {
      $gte: 6
    }
  }).countDocuments();

  const p2 = Ball.find({
    Batsman_Scored: {
      $gte: 4,
      $lt: 6
    }
  }).countDocuments();

  const boundaries = {
    six: await p1,
    four: await p2
  };

  res.json({ message: "success", data: boundaries });
});

app.get("/leaderboard", async (req, res) => {
  const data = await Match.aggregate([
    {
      $match: {
        Match_Winner_Id: { $ne: "" },
        Season_Id: 8
      }
    },
    {
      $group: {
        _id: "$Match_Winner_Id",
        wonMatches: {
          $sum: 1
        }
      }
    },
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "Team_Id",
        as: "team"
      }
    }
  ])
    .sort("-wonMatches")
    .limit(10);

  res.json({ message: "success", data });
});

app.get("/playerperf", async (req, res) => {
  const playerId = parseInt(req.query.playerId);
  const data = await Ball.aggregate([
    {
      $match: {
        Striker_Id: playerId
      }
    },
    {
      $group: {
        _id: "$Match_Id",
        runs: { $sum: "$Batsman_Scored" }
      }
    },
    {
      $lookup: {
        from: "matches",
        localField: "_id",
        foreignField: "Match_Id",
        as: "match"
      }
    },
    {
      "$unwind": "$match"
    },
    {
      $project: {
        runs: 1,
        match_date: {
          $dateFromString: {
            dateString: '$match.Match_Date'
          }
        }
      }
    }
  ]).sort('match_date');

  res.json({ message: "success", data });
})

app.listen(port).then(() => console.log(`> Running on http://localhost:${port}`));
