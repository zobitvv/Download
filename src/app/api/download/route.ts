const APK_SOURCE = 'https://raw.githubusercontent.com/zobitvv/p2/main/ZobiTech.apk';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const cacheBuster = `v=${Date.now()}`;
  const response = await fetch(`${APK_SOURCE}?${cacheBuster}`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.android.package-archive',
      'User-Agent': 'ZobiTech-Downloader/1.0',
    },
  });

  if (!response.ok || !response.body) {
    return new Response('Unable to fetch the latest ZobiTech APK.', {
      status: 502,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Content-Disposition': 'attachment; filename="ZobiTech.apk"',
    'Content-Type': 'application/vnd.android.package-archive',
    Pragma: 'no-cache',
  });

  const contentLength = response.headers.get('content-length');
  if (contentLength) headers.set('Content-Length', contentLength);

  return new Response(response.body, { status: 200, headers });
}
