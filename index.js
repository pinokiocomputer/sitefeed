const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process');
const authors = require('./authors')
const news = require('./news')
const featured = require('./featured')
const ban = require('./ban')
function cloneRepo(repoUrl, targetDir) {
  return new Promise((resolve, reject) => {
    const gitProcess = spawn('git', ['clone', '--depth', '1', repoUrl, targetDir]);
    gitProcess.stdout.on('data', data => {
    });
    gitProcess.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });
    gitProcess.on('close', code => {
      if (code === 0) {
        resolve(`Repo cloned to ${targetDir}`);
      } else {
        reject(new Error(`Git clone failed with code ${code}`));
      }
    });
  });
}
function gitBranch(cwd) {
  return new Promise((resolve, reject) => {
    const gitProcess = spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd
    });
    let str = ""
    gitProcess.stdout.on('data', data => {
      str += data
    });
    gitProcess.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    });
    gitProcess.on('close', code => {
      if (code === 0) {
        resolve(str)
      } else {
        reject(new Error(`Git clone failed with code ${code}`));
      }
    });
  });
}
const run = async () => {
  // 1. Go through the featured array
  let items = []
  await fs.promises.mkdir(path.resolve(__dirname, "temp"), { recursive: true }).catch((e) => { })
  for(let entry of featured) {
    let [username, item, b] = entry
    let pinokio_url
    let mod
    // git clone
    const href = new URL(item)
    const pathname = href.pathname.split("/").filter(x => x)
    const host = href.host
    const folderName = host.split(".").join("-") + "-" + pathname.join("-") 
    const dir = path.join(__dirname, "temp", folderName)
    try {
      await fs.promises.rm(dir)
    } catch (e) {
    }
    try {
      console.log("cloneRepo", { item, dir })
      await cloneRepo(item, dir)
    } catch (e) {
      console.log("ERROR", e)
    }
    mod = require(path.resolve(dir, "pinokio.js"))
    const branch = await gitBranch(dir)
    let title = mod.title ? mod.title : pathname
    let image
    if (/github/.test(href.host)) {
      image = `https://raw.githubusercontent.com/${pathname.join("/")}/${branch}/${mod.icon}`
    } else if (/huggingface/.test(href.host)) {
      image = `https://huggingface.co/${pathname.join("/")}/raw/${branch}/${mod.icon}`
    }
    items.push({
      version: mod.version,
      bitcoin: mod.bitcoin,
      links: mod.links,
      branch: b,
      title,
      url: item,
      image,
      path: item,
      description: mod.description,
      download: item,
      author_username: username,
      author_avatar: authors[username].avatar,
      author_url: authors[username].url
    })
  }

  // Write JSON
  await fs.promises.rm(path.resolve(__dirname, "temp"), { recursive: true }).catch((e) => { })
  let featuredFile = path.resolve(__dirname, "docs", "featured.json")
  await fs.promises.writeFile(featuredFile, JSON.stringify(items, null, 2))
  let newsFile = path.resolve(__dirname, "docs", "news.json")
  await fs.promises.writeFile(newsFile, JSON.stringify(news, null, 2))
  let banFile = path.resolve(__dirname, "docs", "ban.json")
  await fs.promises.writeFile(banFile, JSON.stringify(ban, null, 2))
}
run()
