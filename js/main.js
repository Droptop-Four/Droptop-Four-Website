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



const products = document.getElementById("appsList");


/* get basket items from JSON */
class Apps {
  async Items() {
    try {
      let result = await fetch('/data/community_apps.json')
      let data = await result.json()
      // return data

      /* destructuring data */
      let appsItems = data.apps.productList
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
/* Display stuff from the basket */
class Display {
  displayApps(apps) {
    //console.log(basket)
    let result = ""
    apps.forEach((item) => {
      result += `
        <li>
          <div class="app-card">
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
  const display = new Display()

  apps.Items().then(apps => display.displayApps(apps))
})