import { z } from '@builder.io/qwik-city';
import {
  ErrorMessage,
  SearchHit,
  SongDetails,
  SongLyric,
  searchResultSchema,
  songDetailsSchema,
  songLyricSchema,
} from '~/types';

const { API_KEY } = process.env;

const headers = {
  'X-RapidAPI-Key': API_KEY ?? '',
  'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
};

export const search = async (
  searchString: string,
): Promise<SearchHit[] | ErrorMessage> => {
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

    if (response.status !== 200) {
      const error = result as ErrorMessage;
      console.error(error.errorMessage);
      return error;
    }

    try {
      // Validate data
      const data = searchResultSchema.parse(result);
      const resultData = data.hits.map((hit) => hit.result);
      return resultData;
    } catch (error) {
      console.error((error as z.ZodError).message);
      return { errorMessage: 'Received data did not match schema' };
    }
  } catch (error) {
    console.error(error);
    return { errorMessage: 'Fetching failed' };
  }
};

export const songLyric = async (
  id: number,
): Promise<SongLyric | ErrorMessage> => {
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
      const error = result as ErrorMessage;
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
): Promise<SongDetails | ErrorMessage> => {
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
    const result: SongDetails | ErrorMessage = await response.json();

    if (response.status !== 200) {
      const error = result as ErrorMessage;
      console.error(error.errorMessage);
      return { ...error };
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
