import { json, type RequestEvent } from "@sveltejs/kit";

export async function GET({ url }: RequestEvent): Promise<Response> {
  const sessionRequest = await fetch("api.hierkomteen.url/session", {
    // Body here
  });

  const sessionRequestData = await sessionRequest.json();

  const returnData = {};
  return json(returnData);
}

export async function POST({ url }: RequestEvent): Promise<Response> {
  const sessionRequest = await fetch("api.hierkomteen.url/session", {
    // Body here
  });

  const sessionRequestData = await sessionRequest.json();

  const returnData = {};
  return json(returnData);
}
