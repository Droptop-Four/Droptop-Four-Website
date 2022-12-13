
var handle = 0;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.variant;

if (value) {
    if (value == 'base' || value == 'update') {
        handle = setTimeout(Download, 3000)
    } else {
        location.replace("../download")
    }
} else {
    location.replace("../download")
}

function Download() {
    if (value == 'base') {
        console.log('base download')
        //window.location.href = "https://github.com/Droptop-Four/Basic-Version/raw/main/Droptop%20Basic%20Version.rmskin"
      } else if (value == 'update download') {
        console.log('update')
        window.location.href = "https://github.com/Droptop-Four/Update/raw/main/Droptop%20Update.rmskin"
      } else if (value) {

      } else {
        
      }
    clearInterval(handle);
}

