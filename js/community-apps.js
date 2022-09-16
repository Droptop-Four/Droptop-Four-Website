
// ---- COMMUNITY APPS ----

const appsList = document.getElementById("appsList");

class Apps {
  async Items() {
    try {
      console.log('start')
      let result = await fetch('https://raw.githubusercontent.com/Droptop-Four/GlobalData/main/data/community_apps/community_apps.json')
      console.log('end')
      let data = await result.json()
      console.log(data)

      let appsItems = data.apps
      appsItems = appsItems.map(item => {
        const { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image_url } = item.app

        return { id, name, author, author_link, desc, official_link, direct_download_link, secondary_link, image_url }
      })
      return appsItems

    } catch (error) {
      console.log(error)
      console.log('test')
    }
  }
}

class DisplayApps {
  displayApps(apps) {
    let result = ""
    apps.forEach((item) => {
      if (item.author_link == '#') {
        result += `
          <li>
            <div class="app-card" id="${item.id}">
              <div class="app-card-container">
                <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
                <h3 class="app-card-name">${item.name}</h3>
                <p class="app-card-author">Created by <a class="app-card-author-link">${item.author}</a></p>
                <p class="app-card-desc">${item.desc}</p>
                <div class="app-card-buttons">
                    <button class="app-card-button" onclick="location.href='${item.official_link}'" type="button">See on Github</button>
                    <button class="app-card-button" onclick="location.href='${item.direct_download_link}'" type="button">Download</button>
                </div>
              </div>  
            </div>
          </li>
          `
      } else {
        result += `
          <li>
            <div class="app-card" id="${item.id}">
              <div class="app-card-container">
                <img class="app-card-image" src="${item.image_url}" alt="${item.name} image">
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
          `
        }
      }
          )
    appsList.innerHTML = result
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const apps = new Apps()
  const displayapps = new DisplayApps()

  apps.Items().then(apps => displayapps.displayApps(apps))
})
