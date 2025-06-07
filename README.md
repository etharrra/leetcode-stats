# LeetCode Stats Viewer 🚀

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Live-brightgreen)](https://leetcode-stats-th.netlify.app)

A beautiful, responsive web application that showcases your LeetCode statistics in a clean, card-based interface - perfect for your portfolio or GitHub README. Similar to GitHub Stats Viewer, this project allows you to display your coding journey and problem-solving skills through your LeetCode achievements.

## 🎯 Purpose

This project is designed to help developers:
- Showcase their coding skills and problem-solving abilities
- Display their LeetCode progress and rankings in a visually appealing way
- Add a professional touch to their portfolio or GitHub profile
- Track their coding interview preparation progress
- Share their achievements with potential employers or the developer community

## ✨ Features

- **Beautiful Stats Card**: Clean, modern UI with dark theme that looks great in any portfolio
- **Fully Responsive**: Looks perfect on both desktop and mobile devices
- **Export Options**: Download your stats as high-quality PNG or SVG for easy sharing
- **Real-time Data**: Fetches the latest stats directly from LeetCode's API
- **Easy Integration**: Simple to add to your portfolio, GitHub README, or personal website
- **Customizable**: Easily modify the design to match your portfolio's theme

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- LeetCode account (to view your stats)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/etharrra/leetcode-stats.git
   cd leetcode-stats
   ```

2. Install dependencies:
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. Start the development server:
   ```bash
   # Using npm
   npm start
   
   # Or using yarn
   yarn start
   ```

   The app will be available at `http://localhost:3000`

## 🖼️ Adding to Your Portfolio

1. **Export your stats card** as PNG or SVG from the app
2. Add the image to your portfolio website or GitHub README
3. For GitHub README, you can use:
   ```markdown
   ## My LeetCode Progress
   ![LeetCode Stats](path-to-your-exported-image.svg)
   ```

## 🛠️ Customization

You can easily customize the stats card by modifying the `App.js` file. The app uses Material-UI for styling, making it simple to adjust colors, layout, and content to match your personal brand.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with your improvements.

## 🎯 Usage

1. Enter a LeetCode username in the input field
2. Click "Show Result" to fetch and display the user's stats
3. Use the export buttons to download the stats card as PNG or SVG

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm start` or `yarn start` - Runs the app in development mode
- `npm test` or `yarn test` - Launches the test runner
- `npm run build` or `yarn build` - Builds the app for production

## 🧩 Technologies Used

- React
- Material-UI (MUI)
- html-to-image (for exporting)
- Axios (for API requests)

## 📁 Project Structure

```
leetcode-stats/
├── public/           # Static files
├── src/
│   ├── App.js         # Main application component
│   ├── index.js       # Application entry point
│   └── styles/        # Global styles
├── .gitignore
├── package.json
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [go-leetcode-api](https://github.com/etharrra/go-leetcode-api) - Custom Go wrapper for LeetCode API used in this project
- [LeetCode](https://leetcode.com/) for the API
- [Material-UI](https://mui.com/) for the UI components
- [React](https://reactjs.org/) for the frontend framework
- [html-to-image](https://github.com/bubkoo/html-to-image) for the export functionality
