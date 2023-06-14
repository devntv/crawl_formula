# Vrillar interview

##### !(English bellow)

### main Tech Stack:

`react` `threeJS` `chartJS` `puppeteer` `mui`

![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl5i.png)
![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl4i.png)
![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl3i.png)
![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl2i.png)
![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl1i.png)
![kết quả](https://github.com/devntv/vrl_interview/blob/feature/update-readme-file/public/images/vrl6i.png)

## Features

- crawl data from [formula1][f1]
- filter search based on year, or related fields
- cache localstorage
- handle themes star
- charts with data,.....
- vv,...

## how to implement (cách triển khai)

-- sử dụng server nodejs của nextjs và thư viện puppeeeter để crawl data từ trang [formula1][f1], tại đường dẫn `api/raceResult` chúng ta sẽ kết hợp giữa thư viện puppeteer để crawl data, tạo 1 mảng mới hoàn toàn , khi crawl data, thư viện puppeteer đã hỗ trợ những phương thức có sẵn như: `lauch` `newPage()`, ở đây chúng ta sử dụng các phương thức như:
`lauch`: phương thức của puppeteer, định nghĩa các headless, args,...

```jsx
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  // args: ["--no-sandbox", "--disable-setuid-sandbox"],
  args: edgeChromium.args,
});
```

`newPage`: khởi tạo hay định nghĩa các page

```jsx
const pageRace = await browser.newPage();
// drivers page
const pageDrivers = await browser.newPage();
// teams page
const pageTeams = await browser.newPage();
// dhl fastest lap award
const pageDFLA = await browser.newPage();
```

`goto`: puppetter sẽ đi tới và tiến hành thực hiện việc crawl

```jsx
await pageRace.goto(`${URL_F1_CRAWL}/${year}/races.html`);
await pageDrivers.goto(`${URL_F1_CRAWL}/${year}/drivers.html`);
await pageTeams.goto(`${URL_F1_CRAWL}/${year}/team.html`);
```

mặc định sẽ crawl từ năm 2000 - 2023, muốn nhiều data thì có thể chỉnh sử biến startYear trong dự án.
toàn bộ code sẽ ở file `raceResult.ts`

-- sau khi có data được crawl, ở các components trong dự án cầndùng chỉ việc gọi đến api raceResult để lấy dữ liệu và xử lý, phần gọi api đang được đặt trong foler `clients`.

-- component chính lấy data như là `BodyData` sẽ handle data tại đây bao gồm gọi api, filter search theo data, từ đây có các dữ liệu cần thiết sẽ truyền xuống các component con khác như: `TableRaceResult` `ChartRace`,...

-- cache lại data tránh gọi api liên tục không cần thiết ở những lần tiếp theo.

-- data crawl được là rất lớn và phức tạp, nên dự án sẽ chia code dễ maintain nhất.

-- xử lý threeJS liên quan đến 3D hay themes liên quan,...

# structure

```
src
├── components
│ ├── BodyData
│ └── ChartRace
| └── Footer
| └── Header
| └── Loading
| └── Logo
| └── StarTheme
| └── TableRaceResult
├── clients
| └── CrawlClient
| └── index
├── constants
| └── index
| └── styleChart
| └── time
| └── urlCrawl
├── hooks
| └── index
| └── useTextChange
├── pages
| └── api
| | └── raceResult
| ├── test
| └── index
 └── public
└── styles
```

## Installation

yêu cầu đã cài sẵn `nodejs`
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/devntv/vrl_interview.git
```

tại thư mục chính, tiến hành tải `node_modules`

```sh
npm i
// or
yarn install
```

tiến hành chạy:

```sh
npm run dev
```

## Plugins

| Plugin          | version |
| --------------- | ------- |
| nodeJS          | v18.6   |
| React           | 18.2.0  |
| Next            | 12.3.0  |
| puppeteer       | ^20.5.0 |
| react-chartjs-2 | 5.2.0   |
| threeJS         | 0.153.0 |
| typescript      | 5.1.3   |
| mui             | 5.13.4  |

### english

## how to implement

-- Using the Next.js Node.js server and the Puppeteer library, we will crawl data from the [Formula1][f1] website at the api/raceResult endpoint. We will combine the Puppeteer library to crawl data and create a brand new array. When crawling data, the Puppeteer library provides built-in methods such as launch() and newPage(). Here, we will use these methods:
`lauch`: method of puppeteer, define headless, args,...

```jsx
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  // args: ["--no-sandbox", "--disable-setuid-sandbox"],
  args: edgeChromium.args,
});
```

`newPage`: initializes or defines pages within the Puppeteer browser instance

```jsx
const pageRace = await browser.newPage();
// drivers page
const pageDrivers = await browser.newPage();
// teams page
const pageTeams = await browser.newPage();
// dhl fastest lap award
const pageDFLA = await browser.newPage();
```

`goto`: goto: navigates to a specific URL and performs web crawling using Puppeteer.

```jsx
await pageRace.goto(`${URL_F1_CRAWL}/${year}/races.html`);
await pageDrivers.goto(`${URL_F1_CRAWL}/${year}/drivers.html`);
await pageTeams.goto(`${URL_F1_CRAWL}/${year}/team.html`);
```

By default, the code will crawl data for the years 2000 through 2023. However, if more data is desired, the startYear variable in the project can be adjusted. The entire code can be found in the `raceResult.ts` file.

-- Once the data has been crawled, components in the project only need to call the `raceResult` API to retrieve and process the data. The code for calling the API is located in the `clients` folder.

-- The main component that retrieves data, such as `BodyData`, handles the data including calling the API, filtering search results, and passing necessary data down to other child components such as `TableRaceResult` and `ChartRace`,...

-- Caching of data is implemented to avoid unnecessary repeated API calls.

-- Due to the large and complex nature of the crawled data, the project's code is divided into smaller, more manageable parts.

-- ThreeJS processing related to 3D visualizations or theme customization is also included in the project,...

## License

MIT

**devntv!**

[f1]: https://www.formula1.com/en/results.html/2023/races.html
