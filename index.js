const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process');
function cloneRepo(repoUrl, targetDir) {
  console.log("clone", { repoUrl, targetDir })
  return new Promise((resolve, reject) => {
    const gitProcess = spawn('git', ['clone', '--depth', '1', repoUrl, targetDir]);

    gitProcess.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
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
      console.log(`stdout: ${data}`);
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
  let authors = {
    "cocktailpeanut": {
      url: "https://x.com/cocktailpeanut",
      avatar: "https://pbs.twimg.com/profile_images/1904994154658373632/CKBBVmtg_400x400.jpg",
    },
    "henryruhs": {
      url: "https://x.com/henryruhs",
      avatar: "https://pbs.twimg.com/profile_images/1453716009043599362/x2TT2bWy_400x400.jpg"
    },
    "6Morpheus6": {
      url: "https://github.com/6Morpheus6",
      avatar: "https://avatars.githubusercontent.com/u/127767180?v=4"
    },
    "CCCoderAI": {
      url: "https://x.com/CCCoderAI",
      avatar: "https://pbs.twimg.com/profile_images/1743670632561160192/a2CMh3SB_400x400.jpg"
    },
    "ai-anchorite": {
      url: "https://github.com/ai-anchorite",
      avatar: "https://avatars.githubusercontent.com/u/181688983?v=4"
    },
    "Death": {
      url: "https://github.com/Deathdadev",
      avatar: "https://avatars.githubusercontent.com/u/113825692?v=4"
    },
    "TommyFalkowski": {
      url: "https://x.com/TommyFalkowski",
      avatar: "https://pbs.twimg.com/profile_images/1796086907975131136/RMp-gyuN_400x400.jpg"
    },
    "eDeveloperOZ": {
      url: "https://x.com/OfirOzeri",
      avatar: "https://avatars.githubusercontent.com/u/29679732?v=4"
    },
    "SUP3RMASS1VE": {
      url: "https://x.com/SUP3RMASS1VE",
      avatar: "https://avatars.githubusercontent.com/u/182017711?v=4"
    }
  }
  let news = [
    "1907127435726041348",
    "1904570656873996369",
    "1891991421567238480",
    "1891447859267960976",
    "1885721335961129089",
  ]

  let featured = [
//    name: "huggingface/cocktailpeanut/sdxl-turbo",
//    pinokio: "https://huggingface.co/spaces/cocktailpeanut/sdxl-turbo/raw/main/pinokio.js",
//    url: "https://huggingface.co/spaces/cocktailpeanut/sdxl-turbo",
//    image: "https://huggingface.co/spaces/cocktailpeanut/sdxl-turbo/resolve/main/icon.png?download=true"
//  },
//    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/whisperspeech"],
//    ["cocktailpeanut", "https://github.com/pinokiofactory/sd35"],
    ["henryruhs", "https://github.com/facefusion/facefusion-pinokio"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/dia"],
    ["SUP3RMASS1VE", "https://github.com/pinokiofactory/Frame-Pack"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/wan"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/uno"],
    ["Death", "https://github.com/pinokiofactory/Orpheus-TTS-FastAPI"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/hunyuanvideo"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/Hunyuan3D-2-lowvram"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/cube"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/diffrhythm"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/comfy"],
    ["ai-anchorite", "https://github.com/pinokiofactory/MatAnyone"],
    ["eDeveloperOZ", "https://github.com/pinokiofactory/macOS-use"],
    ["6Morpheus6", "https://github.com/pinokiofactory/MagicQuill"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/zonos"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/deeperhermes"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/browser-use"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/yue"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/open-webui"],
    //["cocktailpeanut", "https://github.com/pinokiofactory/Hunyuan3D-2"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/bolt"],
    ["TommyFalkowski", "https://github.com/pinokiofactory/StyleTTS2_Studio"],
    ["Death", "https://github.com/pinokiofactory/MMAudio"],
    ["cocktailpeanut", "https://github.com/pinokiocomputer/psp"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/ai-video-composer"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/echomimic2"],
    ["ai-anchorite", "https://github.com/pinokiofactory/clarity-refiners-ui"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/pyramidflow"],
    ["ai-anchorite", "https://github.com/pinokiofactory/RMBG-2-Studio"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/instantir"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/hallucinator"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/fish"],
    ["CCCoderAI", "https://github.com/pinokiofactory/MFLUX-WEBUI"],
    ["ai-anchorite", "https://github.com/pinokiofactory/Allegro-txt2vid-install"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/omnigen"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/ditto"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/e2-f5-tts"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/diamond"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/facepoke"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/mlx-video-transcription"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/invoke"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/diffusers-image-fill"],
    ["6Morpheus6", "https://github.com/pinokiofactory/whisper-webui"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/cogstudio"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/moshi"],
    ["6Morpheus6", "https://github.com/pinokiofactory/applio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/fluxgym"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/cogvideo"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/stable-diffusion-webui-forge"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/liveportrait"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/flux-webui"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/comfyui"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/aura-sr-upscaler"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/audiocraft_plus"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/artist"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/rc-stableaudio"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/photomaker2"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/fooocus"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/autogpt"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/gepeto"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/florence2"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/hallo"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/mlx"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/flashdiffusion"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/stableaudio"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/pcm"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/sillytavern"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/aitown"],
//    ["cocktailpeanut", "https://github.com/pinokiofactory/augmentoolkit"],
    ["cocktailpeanut", "https://github.com/pinokiofactory/llamafactory"],
    //["cocktailpeanut", "https://github.com/pinokiofactory/openui"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/storydiffusion-comics"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/zest"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/openvoice2"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/lobe"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/idm-vton"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/open-webui"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/devika"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/cosxl"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/parler-tts"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/instantstyle"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/face-to-all"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/customnet"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/spright"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/brushnet"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/arc2face"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/supir"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/moondream2"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/triposr"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/zeta"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/differential-diffusion-ui"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/dust3r"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/chatbot-ollama"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/remove-video-bg"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/melotts"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/forge"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/gligen"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/stablecascade"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/bark"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/lgm"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/bria-rmbg"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/videocrafter2"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/moondream1"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/instantid"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/photomaker"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/magnet"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/vid2pose"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/moore-animateanyone-mini"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/moore-animateanyone"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/openvoice"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/faceid"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/invokeai"],
    //["cocktailpeanut", "https://github.com/cocktailpeanutlabs/streamdiffusion"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/dreamtalk"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/automatic1111"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/vid2openpose"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/StyleAligned.pinokio"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanut/vid2openpose.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/MagicAnimateMini"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/densepose.pinokio"],




    ["cocktailpeanut", "https://github.com/cocktailpeanut/kohya.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/AudioSep.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/xtts.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/rvc.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/animatediff.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/lavie.pinokio"],
    ["cocktailpeanut", "https://huggingface.co/spaces/cocktailpeanut/leditsplusplus"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/oobabooga.pinokio"],
    /*

    ["cocktailpeanut", "https://github.com/cocktailpeanut/MagicAnimate.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/realtime-lcm.pinokio"],
    //["cocktailpeanut", "https://github.com/cocktailpeanut/facefusion.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/diffusers-sdxl-turbo"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/sdxl-turbo"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanut/comfyui.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/svd.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanutlabs/deus"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/mirror"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/bakllava.pinokio"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanut/sd-webui.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/lp_music_caps.pinokio"],
    //["cocktailpeanut", "https://github.com/cocktailpeanut/whisper-webui.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/lcm.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/illusion.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/tokenflow.pinokio"],
    //["cocktailpeanut", "https://github.com/cocktailpeanut/ms-video2video.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/ms-image2video.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/VALL-E-X.pinokio"],
//    ["cocktailpeanut", "https://github.com/cocktailpeanut/fooocus.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/densediffusion.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/LTE.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/control-lora.comfyui.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/ldm3d.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/audio-webui.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/AudioLDM2.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/audiogradio.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/xinference.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/llamacpp.pinokio"],
    ["cocktailpeanut", "https://github.com/cocktailpeanut/tutorial.pinokio"],
    */
  ]
  // 1. Go through the featured array
  let items = []
  await fs.promises.mkdir(path.resolve(__dirname, "temp"), { recursive: true }).catch((e) => { })
  for(let entry of featured) {
    let [username, item, b] = entry
    console.log({ username, item, b })
    let pinokio_url
    let mod

    // git clone
    const href = new URL(item)
    const pathname = href.pathname.split("/").filter(x => x)
    const host = href.host
    const folderName = host.split(".").join("-") + "-" + pathname.join("-") 

//      const folderName = item.split("/").join("-")
    const dir = path.join(__dirname, "temp", folderName)
    console.log("clone", dir, "https://github.com/" + item)
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
    console.log("cloned")
    mod = require(path.resolve(dir, "pinokio.js"))
    console.log("mod", mod)

    const branch = await gitBranch(dir)
    console.log("branch", branch)


    let title = mod.title ? mod.title : pathname
//
//https://huggingface.co/spaces/zcxu-eric/magicanimate/blob/main/requirements.txt
//https://huggingface.co/spaces/zcxu-eric/magicanimate/raw/main/requirements.txt

    let image
    console.log("host ", href.host)
    if (/github/.test(href.host)) {
      image = `https://raw.githubusercontent.com/${pathname.join("/")}/${branch}/${mod.icon}`
    } else if (/huggingface/.test(href.host)) {
      image = `https://huggingface.co/${pathname.join("/")}/raw/${branch}/${mod.icon}`
    }
    
//    let image = "https://raw.githubusercontent.com/" + item + "/main/" + mod.icon
//    let url = "https://github.com/" + item
//    let download = "https://github.com/" + item

    url = item
    download = url
    console.log("mod", mod)
    console.log("image", image)

    
    let description = mod.description


    items.push({
      version: mod.version,
      bitcoin: mod.bitcoin,
      links: mod.links,
      branch: b,
      title,
      url,
      image,
      path: item,
      description,
      download,
      author_username: username,
      author_avatar: authors[username].avatar,
      author_url: authors[username].url
    })
  }
  console.log({ items })

  await fs.promises.rm(path.resolve(__dirname, "temp"), { recursive: true }).catch((e) => { })

  let featuredFile = path.resolve(__dirname, "docs", "featured.json")
  await fs.promises.writeFile(featuredFile, JSON.stringify(items, null, 2))

  let newsFile = path.resolve(__dirname, "docs", "news.json")
  await fs.promises.writeFile(newsFile, JSON.stringify(news, null, 2))

}
run()
