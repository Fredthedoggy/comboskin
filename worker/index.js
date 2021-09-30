// import merger from './SkinMerger'
import data from './data.json'

// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })));
});

function error404() {
    return new Response(JSON.stringify({error: 404}), {
        headers: {'Content-Type': 'application/json'},
    });
}

async function handleRequest(request) {
    const { pathname } = new URL(request.url);
    const paths = pathname.split('/');

    if (pathname.startsWith(paths[0] && paths[0] === 'image')) {
        if (paths[1] && Object.values(data).filter(o => o.short === paths[1])[0]) {
            const skin = paths[1];
            return new Response(skin);
        }
    }

    return error404();
}
