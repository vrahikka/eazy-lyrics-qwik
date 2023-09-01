import type { z } from '@builder.io/qwik-city';
import type { ErrorMessage, SearchHit, SongDetails, SongLyric } from '~/types';
import {
  searchResultSchema,
  songDetailsSchema,
  songLyricSchema,
} from '~/types';

export const search = async (
  searchString: string,
  apiKey: string,
): Promise<SearchHit[] | ErrorMessage> => {
  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
  };

  if (!searchString) {
    return { errorMessage: 'Empty search parameter' };
  }
  const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchString}&per_page=20`; // 20 seems to be the max
  const options = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('1');
    if (response.status !== 200) {
      console.log({ result });
      const error = { errorMessage: result.message } as ErrorMessage;
      console.error(error.errorMessage);
      return error;
    }

    try {
      // Validate data
      console.log('3');
      const data = searchResultSchema.parse(result);
      console.log('Data', data);
      const resultData = data.hits.map((hit) => hit.result);
      console.log('4');
      return resultData;
    } catch (error) {
      console.log('5');
      console.error((error as z.ZodError).message);
      return { errorMessage: 'Received data did not match schema' };
    }
  } catch (error) {
    console.log('6');
    console.error(error);
    return { errorMessage: 'Fetching failed' };
  }
};

export const songLyric = async (
  id: number,
  apiKey: string,
): Promise<SongLyric | ErrorMessage> => {
  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
  };

  if (!id) {
    return { errorMessage: 'Empty search parameter' };
  }
  const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${id}`;
  const options = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.status !== 200) {
      const error = { errorMessage: result.message } as ErrorMessage;
      console.error(error.errorMessage);
      return error;
    }

    try {
      // Validate data
      const data = songLyricSchema.parse(result);
      return data;
    } catch (error) {
      console.error((error as z.ZodError).message);
      return { errorMessage: 'Received data did not match schema' };
    }
  } catch (error) {
    console.error(error);
    return { errorMessage: 'Fetching failed' };
  }
};

export const songDetails = async (
  id: number,
  apiKey: string,
): Promise<SongDetails | ErrorMessage> => {
  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
  };

  if (!id) {
    return { errorMessage: 'Empty search parameter' };
  }
  const url = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${id}`;
  const options = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.status !== 200) {
      const error = { errorMessage: result.message } as ErrorMessage;

      console.error(error.errorMessage);
      return error;
    }
    try {
      // Validate data
      // console.log(result);
      const data = songDetailsSchema.parse(result);
      return data;
    } catch (error) {
      console.error((error as z.ZodError).message);
      return { errorMessage: 'Received data did not match schema' };
    }
  } catch (error) {
    console.error(error);
    return { errorMessage: 'Fetching failed' };
  }
};
