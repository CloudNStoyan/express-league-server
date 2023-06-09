import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import express, { Request, Response } from "express";
import axios from "axios";
import cors, { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin: config.allowedOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("PONG");
});

const riotInstance = axios.create({
  headers: {
    "X-Riot-Token": config.secrets.riotApiToken,
  },
});

app.get("/matches/:puuid", async (req: Request, res: Response) => {
  const riotUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.params.puuid}/ids?start=0&count=5`;

  const riotResponse = await riotInstance.get(riotUrl);

  const matches = await riotResponse.data;

  res.json(matches);
});

app.get("/match/:matchId", async (req: Request, res: Response) => {
  const riotUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/${req.params.matchId}`;

  const riotResponse = await riotInstance.get(riotUrl);

  const match = await riotResponse.data;

  res.json(match);
});

app.get("/summoner/:summonerName", async (req: Request, res: Response) => {
  const riotUrl = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}`;

  const riotResponse = await riotInstance.get(riotUrl);

  const summoner = await riotResponse.data;

  res.json(summoner);
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
