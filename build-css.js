const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");
const fs = require("fs");
const path = require("path");

async function buildCSS() {
  try {
    // Read the input CSS file
    const inputCSS = fs.readFileSync(
      path.join(__dirname, "public/css/input.css"),
      "utf8"
    );

    // Process with PostCSS
    const result = await postcss([tailwindcss, autoprefixer]).process(
      inputCSS,
      {
        from: path.join(__dirname, "public/css/input.css"),
        to: path.join(__dirname, "public/css/output.css"),
      }
    );

    // Write the output CSS file
    fs.writeFileSync(path.join(__dirname, "public/css/output.css"), result.css);

    console.log("✅ Tailwind CSS built successfully!");

    if (result.map) {
      fs.writeFileSync(
        path.join(__dirname, "public/css/output.css.map"),
        result.map.toString()
      );
    }
  } catch (error) {
    console.error("❌ Error building CSS:", error);
    process.exit(1);
  }
}

// Check if watch mode is enabled
const isWatchMode = process.argv.includes("--watch");

if (isWatchMode) {
  console.log("👀 Watching for changes...");

  // Watch for changes in input.css and config files
  const chokidar = require("chokidar");

  const watcher = chokidar.watch([
    "public/css/input.css",
    "tailwind.config.js",
    "views/**/*.ejs",
  ]);

  watcher.on("change", () => {
    console.log("📝 Files changed, rebuilding CSS...");
    buildCSS();
  });

  // Initial build
  buildCSS();
} else {
  // Single build
  buildCSS();
}
