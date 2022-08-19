var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}



const appsList = document.getElementById("appsList");


/* Get apps from JSON */
class Apps {
  async Items() {
    try {
      let result = await fetch('/data/community_apps/community_apps.json')
      let data = await result.json()
      // return data

      /* destructuring data */
      let appsItems = data.apps
      appsItems = appsItems.map(item => {
        const { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image } = item.app

        return { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image }
      })
      return appsItems

    } catch (error) {
      console.log(error)
    }
  }
}

/* Display apps */
class DisplayApps {
  displayApps(apps) {
    //console.log(basket)
    let result = ""
    apps.forEach((item) => {
      result += `
        <li>
          <div class="app-card" id="${item.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${item.image}" alt="${item.name} image">
              <h3 class="app-card-name">${item.name}</h3>
              <p class="app-card-author">Created by <a class="app-card-author-link" href="${item.author_link}">${item.author}</a></p>
              <p class="app-card-desc">${item.desc}</p>
              <div class="app-card-buttons">
                  <button class="app-card-button" onclick="location.href='${item.official_link}'" type="button">See on Github</button>
                  <button class="app-card-button" onclick="location.href='${item.direct_download_link}'" type="button">Download</button>
              </div>
            </div>  
          </div>
        </li>
        `})
    appsList.innerHTML = result
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const apps = new Apps()
  const displayapps = new DisplayApps()

  apps.Items().then(apps => displayapps.displayApps(apps))
})





// const droptopinfo = document.getElementById("droptop-info");

// class Info {
//   async Items() {
//     try {
//       let infourl = await fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/droptop_info.json')
//       let datainfo = await infourl.json()

//       /* destructuring data */
//       let infoItems = datainfo.messages

//       console.log(infoItems)



//       infoItems = infoItems.map(item => {
//         const { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image } = item.app

//         return { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image }
//       })
//       return infoItems

//     } catch (error) {
//       console.log(error)
//     }
//   }
// }

// /* Display apps */
// class DisplayInfo {
//   displayInfo(info) {

//     let result = ""
//     info.forEach((item) => {
//       result += `
//         <div>${item.infoName}</div>
        
//         `})
//     infoList.innerHTML = result
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {

//   const info = new Apps()
//   const displayinfo = new DisplayInfo()



//   info.Items().then(info => displayinfo.displayInfo(info))
// })














const droptopinfo = document.getElementById("droptop-info");


/* Get infos from JSON */
class Infos {
  async Items() {
    try {
      let result = await fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/droptop_info.json')
      let data = await result.json()
      // return data

      // console.log(data)
      // console.log(data.messages[0].content[0].fields[0])

      /* destructuring data */
      let infoItems = data.messages[0].content[0]
      infoItems = infoItems.map(item => {
        const { name, content } = item.fields[0]

        return { name, content }
      })
      // console.log(infoItems)
      return infoItems

    } catch (error) {
      console.log(error)
    }
  }
}

/* Display infos */
class DisplayInfos {
  displayInfos(infos) {


    fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/droptop_info.json')
    .then((response) => response.json())

    // const test = data.messages

    // console.log(test)

    let result = ""
    infos.forEach((item) => {
      result += `
        <li>
          <div class="app-card" id="${item.id}">
            <div class="app-card-container">
              <img class="app-card-image" src="${item.image}" alt="${item.name} image">
              <h3 class="app-card-name">${item.name}</h3>
              <p class="app-card-author">Created by <a class="app-card-author-link" href="${item.author_link}">${item.author}</a></p>
              <p class="app-card-desc">${item.desc}</p>
              <div class="app-card-buttons">
                  <button class="app-card-button" onclick="location.href='${item.official_link}'" type="button">See on Github</button>
                  <button class="app-card-button" onclick="location.href='${item.direct_download_link}'" type="button">Download</button>
              </div>
            </div>  
          </div>
        </li>
        `})
    droptopinfo.innerHTML = result
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const info = new Infos()
  const displayapps = new DisplayInfos()

  info.Items().then(apps => displayapps.displayInfos(apps))
})


