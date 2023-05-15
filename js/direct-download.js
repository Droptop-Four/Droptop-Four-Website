var handle = 0;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let variant = params.variant;

if (variant) {
    if (variant == 'base' || variant == 'update') {
        handle = setTimeout(Download, 1000);
    } else {
        location.replace('../download');
    }
} else {
    location.replace('../download');
}

function Download() {
    if (variant == 'base') {
        console.log('base download');
        window.location.href = 'https://github.com/Droptop-Four/Basic-Version/raw/main/Droptop%20Basic%20Version.rmskin';
    } else if (variant == 'update') {
        console.log('update');
        window.location.href = 'https://github.com/Droptop-Four/Update/raw/main/Droptop%20Update.rmskin';
    } else {
        location.replace('../download');
    }
    clearInterval(handle);
    setTimeout(Home, 15000);
}

function ManualDownload() {
    if (variant == 'base') {
        console.log('mirror base download');
        window.location.href = 'https://firebasestorage.googleapis.com/v0/b/droptopfour-bec1e.appspot.com/o/Droptop%20Basic%20Version.rmskin?alt=media';
    } else if (variant == 'update') {
        console.log('mirror update download');
        window.location.href = 'https://firebasestorage.googleapis.com/v0/b/droptopfour-bec1e.appspot.com/o/Droptop%20Update.rmskin?alt=media';
    } else {
        location.replace('../download');
    }
    setTimeout(Home, 15000);
}

function Home() {
    location.replace('../');
}
