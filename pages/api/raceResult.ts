import edgeChromium from "chrome-aws-lambda";
// import * as puppeteer from "puppeteer";
import puppeteer from "puppeteer-core";
import { URL_F1_CRAWL } from "../../constant";
import { CURRENT_YEAR, START_TIME } from "../../constant/time";

interface RaceResult {
  year: string;
  data: any[];
}
const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default async function handler(req, res) {
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;
  const raceResults: RaceResult[] = [];
  // tạo sẵn 1 mảng chứa data crawl được
  const raceData: any[] = [];
  const startYear = START_TIME;
  const endYear = CURRENT_YEAR;

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    args: edgeChromium.args,
  });

  try {
    // định nghĩa từng page để crawl
    // race page
    const pageRace = await browser.newPage();
    // drivers page
    const pageDrivers = await browser.newPage();
    // teams page
    const pageTeams = await browser.newPage();
    // dhl fastest lap award
    const pageDFLA = await browser.newPage();

    // ở đây mặc định crawl từ năm 2000 - 2023, các biến startYear và endYear định nghĩa sẵn trong constant -> dễ maintain
    for (let year = startYear; year <= endYear; year++) {
      // các url của trang crawl
      await pageRace.goto(`${URL_F1_CRAWL}/${year}/races.html`);
      await pageDrivers.goto(`${URL_F1_CRAWL}/${year}/drivers.html`);
      await pageTeams.goto(`${URL_F1_CRAWL}/${year}/team.html`);
      await pageDFLA.goto(`${URL_F1_CRAWL}/${year}/fastest-laps.html`);
      // chọn các class của thẻ chứa data
      await pageRace.waitForSelector(".resultsarchive-table");
      await pageDrivers.waitForSelector(".resultsarchive-table");
      await pageTeams.waitForSelector(".resultsarchive-table");
      await pageDFLA.waitForSelector(".resultsarchive-table");

      // các page và các class để crawl
      // race page
      const racesRow = await pageRace.$$eval(
        ".resultsarchive-table tbody tr",
        (rows) =>
          rows.map((row) => {
            const cells = row.querySelectorAll("td");
            const winnerCells = cells[3].querySelectorAll("span");
            const winnerName = Array.from(winnerCells)
              .map((span) => span.textContent.trim())
              .join(" ");
            return {
              grandprix: cells[1]?.textContent?.trim(),
              date: cells[2]?.textContent?.trim(),
              winner: winnerName,
              car: cells[4]?.textContent?.trim() || "",
              lap: cells[5]?.textContent?.trim(),
              time: cells[6]?.textContent?.trim(),
            };
          })
      );
      // drivers page
      const driversRow = await pageDrivers.$$eval(
        ".resultsarchive-table tbody tr",
        (rows) =>
          rows.map((row) => {
            const cells = row.querySelectorAll("td");
            const driverCells = cells[2].querySelectorAll("span");
            const drivers = Array.from(driverCells)
              .map((span) => span.textContent.trim())
              .join(" ");
            return {
              pos: cells[1]?.textContent?.trim(),
              driver: drivers,
              nationally: cells[3]?.textContent?.trim(),
              car: cells[4]?.textContent?.trim(),
              pts: cells[5]?.textContent?.trim(),
            };
          })
      );
      // teams page
      const teamsRow = await pageTeams.$$eval(
        ".resultsarchive-table tbody tr",
        (rows) =>
          rows.map((row) => {
            const cells = row.querySelectorAll("td");
            return {
              pos: cells[1]?.textContent?.trim(),
              team: cells[2]?.textContent?.trim(),
              pts: cells[3]?.textContent?.trim(),
            };
          })
      );
      // dfla page
      const dflaRow = await pageDFLA.$$eval(
        ".resultsarchive-table tbody tr",
        (rows) =>
          rows.map((row) => {
            const cells = row.querySelectorAll("td");
            const driverCells = cells[2].querySelectorAll("span");
            const drivers = Array.from(driverCells)
              .map((span) => span.textContent.trim())
              .join(" ");
            return {
              grandprix: cells[1]?.textContent?.trim(),
              driver: drivers,
              car: cells[3]?.textContent?.trim(),
              time: cells[4]?.textContent?.trim(),
            };
          })
      );

      raceData.push({
        year: year.toString(),
        races: racesRow,
        drivers: driversRow,
        teams: teamsRow,
        DHL: dflaRow,
      });
    }

    // console.log("data >", raceData);
    res.status(200).json(raceData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  } finally {
    await browser.close();
  }
}
