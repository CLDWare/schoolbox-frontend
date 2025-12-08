import { json } from "@sveltejs/kit";

export type SessionRoutePOSTRequest = {
  authorizationKey: string;
};

export const sessionRoute = {
  async GET(id: string): Promise<Response> {
    const sessionResponse = await fetch(
      `api.hierkomteen.url/session/id?${id}`,
      {

      },
    );

    const sessionResponseData = await sessionResponse.json();

    const returnData = {};
    return json(returnData);
  },
  async POST(...args: any[]): Promise<Response> {
    const sessionResponse = await fetch("api.hierkomteen.url/session", {
      // Body here
    });

    const sessionResponseData = await sessionResponse.json();

    const returnData = {};
    return json(returnData);
  },
};
