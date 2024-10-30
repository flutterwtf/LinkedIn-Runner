export const COUNTRY_PROMPT = {
  systemMessage:
    'You are a highly capable location analyzer, tasked with identifying country Alpha-2 code by location.',
  humanMessage: `Given the following extracted location, determine the country where it is located and provide the Alpha-2 code of this country. The answer must be in JSON format with the field "country", which describes the country name in the allowed terms. If the country is not found in the text, please set "country" to undefined.
      Examples: "Input: 'United States of America', Output: {{"country": "US"}}", "Input: 'Dubai', Output: {{"country": "AE"}}", "Input: 'Paris', Output: {{"country": "FR"}}"
      Follow the response format:
      {{
        "country": "string"
      }} 
      Location: {location}`,
} as const;
