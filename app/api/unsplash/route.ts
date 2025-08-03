import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';
import { NextRequest } from 'next/server';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_API_KEY!, // Note: do not use NEXT_PUBLIC_ prefix
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '30';
  
  try {
    let result;
    if (query) {
      result = await unsplashApi.search.getPhotos({
        query,
        page: parseInt(page),
        perPage: parseInt(perPage)
      });
    } else {
      result = await unsplashApi.photos.getRandom({
        count: parseInt(perPage)
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}