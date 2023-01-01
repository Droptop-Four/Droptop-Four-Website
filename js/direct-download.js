var handle = 0;

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let variant = params.variant;

if (variant) {
    if (variant == 'base' || variant == 'update') {
        handle = setTimeout(Download, 3000);
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
        window.location.href = 'https://firebasestorage.googleapis.com/v0/b/tempdroptopfour.appspot.com/o/Droptop%20Basic%20Version.rmskin?alt=media&token=5bc1cc71-100b-43e1-97b7-e48fb40941cd';
    } else if (variant == 'update') {
        console.log('mirror update download');
        window.location.href = 'https://firebasestorage.googleapis.com/v0/b/tempdroptopfour.appspot.com/o/Droptop%20Update.rmskin?alt=media&token=e25637a4-eecc-4c67-9e3c-a79fe03b9d0a';
    } else {
        location.replace('../download');
    }
    setTimeout(Home, 15000);
}

function Home() {
    location.replace('../');
}
